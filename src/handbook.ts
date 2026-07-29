/**
 * DSA Pattern Handbook Logic
 * Handles interactive searching, expanding details, and navigating to challenge.
 */

import { HANDBOOK_PATTERNS, SUMMARY_COMPARISON_TABLE, PatternHandbookDetail } from './handbookData';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export class HandbookManager {
  private activePatternId: number = 1; // Default to pattern 1 (Arrays & Hashing)
  private searchQuery: string = '';
  private onNavigateToQuiz: (patternId?: number) => void;
  private onNavigateToMatrix: () => void;
  private onNavigateToHandbook: () => void;
  private onPlaySound?: () => void;

  constructor(
    onNavigateToQuiz: (patternId?: number) => void,
    onNavigateToMatrix: () => void,
    onNavigateToHandbook: () => void,
    onPlaySound?: () => void
  ) {
    this.onNavigateToQuiz = onNavigateToQuiz;
    this.onNavigateToMatrix = onNavigateToMatrix;
    this.onNavigateToHandbook = onNavigateToHandbook;
    this.onPlaySound = onPlaySound;
  }

  public init() {
    this.bindEvents();
    this.renderCards();
    this.renderExpandedDetail();
    this.renderMatrixVisualCharts();
    this.renderComparisonTable();
    this.renderMatrixCheatsheet();
  }

  private bindEvents() {
    // Search input handlers
    const searchInput = document.getElementById('handbook-search') as HTMLInputElement;
    const searchMobile = document.getElementById('handbook-search-mobile') as HTMLInputElement;

    const handleSearch = (e: Event) => {
      this.searchQuery = (e.target as HTMLInputElement).value.toLowerCase().trim();
      this.renderCards();
    };

    if (searchInput) searchInput.oninput = handleSearch;
    if (searchMobile) searchMobile.oninput = handleSearch;

    // Handbook section CTAs
    const toMatrixBtn = document.getElementById('handbook-to-matrix-btn');
    if (toMatrixBtn) {
      toMatrixBtn.onclick = () => this.onNavigateToMatrix();
    }

    const toQuizBtn = document.getElementById('handbook-to-quiz-btn');
    if (toQuizBtn) {
      toQuizBtn.onclick = () => this.onNavigateToQuiz();
    }

    // Matrix section CTA
    const matrixToQuizBtn = document.getElementById('matrix-to-quiz-btn');
    if (matrixToQuizBtn) {
      matrixToQuizBtn.onclick = () => this.onNavigateToQuiz();
    }
  }

  public renderCards() {
    const grid = document.getElementById('handbook-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = HANDBOOK_PATTERNS.filter(p => {
      if (!this.searchQuery) return true;
      const matchName = p.name.toLowerCase().includes(this.searchQuery);
      const matchDesc = p.shortDescription.toLowerCase().includes(this.searchQuery);
      const matchKeywords = p.keywords.some(k => k.word.toLowerCase().includes(this.searchQuery) || k.explanation.toLowerCase().includes(this.searchQuery));
      return matchName || matchDesc || matchKeywords;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full p-8 rounded-2xl bg-surface-container border border-outline-variant text-center text-on-surface-variant">
          <span class="material-symbols-outlined text-outline" style="font-size: 36px;">search_off</span>
          <p class="text-sm font-bold text-white mt-2">No patterns matched your search "${this.searchQuery}"</p>
          <p class="text-xs text-outline mt-1">Try searching for terms like 'HashMap', 'Sorted', 'Window', 'Range', or 'DFS'.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(pattern => {
      const isSelected = pattern.id === this.activePatternId;
      const card = document.createElement('div');
      
      const badgeBg = pattern.difficulty === 'Beginner' 
        ? 'bg-secondary/10 border-secondary/30 text-secondary' 
        : 'bg-primary/10 border-primary/30 text-primary';

      card.className = `p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-5 cursor-pointer ${
        isSelected 
          ? 'bg-surface-container-highest border-primary shadow-glow-primary scale-[1.01]' 
          : 'bg-surface-container/80 hover:bg-surface-container-high border-outline-variant/60 hover:border-primary/50 hover:-translate-y-0.5'
      }`;

      card.onclick = () => {
        this.onPlaySound?.();
        this.activePatternId = pattern.id;
        this.renderCards();
        this.renderExpandedDetail();
        
        // Scroll smoothly to detail section
        const detailElem = document.getElementById('handbook-expanded-detail');
        if (detailElem) {
          detailElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      card.innerHTML = `
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2">
            <span class="px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${badgeBg}">
              ${pattern.difficulty}
            </span>
            <span class="text-[11px] text-on-surface-variant flex items-center gap-1 font-medium">
              <span class="material-symbols-outlined" style="font-size: 14px;">schedule</span>
              ${pattern.readTime}
            </span>
          </div>

          <h3 class="text-white text-lg font-black tracking-tight flex items-center justify-between">
            ${pattern.name}
            ${isSelected ? '<span class="material-symbols-outlined text-primary" style="font-size: 20px;">check_circle</span>' : ''}
          </h3>

          <p class="text-on-surface-variant text-xs leading-relaxed">
            ${pattern.shortDescription}
          </p>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs font-bold ${isSelected ? 'text-primary' : 'text-on-surface-variant hover:text-white'}">
          <span>${isSelected ? 'Currently Viewing' : 'Learn Pattern Details'}</span>
          <span class="material-symbols-outlined" style="font-size: 18px;">${isSelected ? 'expand_more' : 'arrow_forward'}</span>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  public renderExpandedDetail() {
    const container = document.getElementById('handbook-expanded-detail');
    if (!container) return;

    const p = HANDBOOK_PATTERNS.find(item => item.id === this.activePatternId) || HANDBOOK_PATTERNS[0];

    const badgeBg = p.difficulty === 'Beginner' 
      ? 'bg-secondary/10 border-secondary/40 text-secondary' 
      : 'bg-primary/10 border-primary/40 text-primary';

    container.innerHTML = `
      <div class="bg-surface-container rounded-3xl border border-outline-variant p-8 lg:p-12 flex flex-col gap-12 shadow-2xl modal-enter">
        
        <!-- TOP HEADER & TITLE -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-outline-variant/50">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 rounded-full border text-xs font-black uppercase tracking-widest ${badgeBg}">
                ${p.difficulty}
              </span>
              <span class="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined" style="font-size: 16px;">schedule</span>
                ${p.readTime}
              </span>
            </div>
            <h2 class="text-2xl lg:text-3xl font-black text-white tracking-tight">${p.name} - Deep Dive</h2>
          </div>

          <div class="px-4 py-2 rounded-xl bg-surface-container-high border border-outline-variant text-xs text-on-surface-variant flex items-center gap-2 self-start md:self-auto font-mono">
            <span class="size-2 rounded-full bg-secondary"></span>
            <span>CS Study Reference • Verified Code</span>
          </div>
        </div>

        <!-- 1. WHAT IS THIS PATTERN & 2. WHY IS IT USED -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/50 flex flex-col gap-3">
            <h3 class="text-white text-base font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-primary" style="font-size: 22px;">help_outline</span>
              1. What is this Pattern?
            </h3>
            <p class="text-on-surface-variant text-sm leading-relaxed">${escapeHtml(p.whatIsIt)}</p>
          </div>

          <div class="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/50 flex flex-col gap-3">
            <h3 class="text-white text-base font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">bolt</span>
              2. Why is it Used?
            </h3>
            <p class="text-on-surface-variant text-sm leading-relaxed">${escapeHtml(p.whyUsed)}</p>
          </div>
        </div>

        <!-- 3. WHEN SHOULD YOU USE IT -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 22px;">event_available</span>
            3. When Should You Use It?
          </h3>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${p.whenToUse.map(item => `
              <li class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-start gap-3">
                <span class="material-symbols-outlined text-secondary flex-shrink-0 mt-0.5" style="font-size: 18px;">check_circle</span>
                <span class="text-xs text-on-surface font-medium leading-relaxed">${escapeHtml(item)}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- 4. RECOGNITION KEYWORDS & 5. RECOGNITION TIPS -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Keywords -->
          <div class="flex flex-col gap-4">
            <h3 class="text-white text-lg font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">key</span>
              4. Recognition Keywords
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${p.keywords.map(kw => `
                <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col gap-1.5">
                  <span class="px-2.5 py-0.5 rounded-md bg-secondary/10 border border-secondary/30 text-secondary text-xs font-black self-start">
                    ${escapeHtml(kw.word)}
                  </span>
                  <p class="text-[11px] text-on-surface-variant leading-relaxed">${escapeHtml(kw.explanation)}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Recognition Tips -->
          <div class="flex flex-col gap-4">
            <h3 class="text-white text-lg font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-primary" style="font-size: 22px;">tips_and_updates</span>
              5. Recognition Tips
            </h3>
            <div class="flex flex-col gap-3">
              ${p.recognitionTips.map(tip => `
                <div class="p-4 rounded-xl bg-surface-container-low border-l-4 border-primary text-xs text-on-surface leading-relaxed italic">
                  "${escapeHtml(tip)}"
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 6. BRUTE FORCE VS OPTIMIZED APPROACH -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 22px;">compare</span>
            6. Brute Force vs Optimized Approach
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-5 rounded-2xl bg-error-container/10 border border-error/30 flex flex-col gap-2">
              <p class="text-xs font-black uppercase text-error tracking-wider">Brute Force Approach</p>
              <p class="text-xs text-on-surface-variant leading-relaxed">${escapeHtml(p.bruteForceVsOptimized.bruteForce)}</p>
            </div>
            <div class="p-5 rounded-2xl bg-secondary/10 border border-secondary/30 flex flex-col gap-2">
              <p class="text-xs font-black uppercase text-secondary tracking-wider">Optimized Pattern Approach</p>
              <p class="text-xs text-on-surface-variant leading-relaxed">${escapeHtml(p.bruteForceVsOptimized.optimized)}</p>
            </div>
          </div>
        </div>

        <!-- 7. STEP-BY-STEP ALGORITHM -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">format_list_numbered</span>
            7. Step-by-Step Algorithm
          </h3>
          <div class="flex flex-col gap-3">
            ${p.stepByStepAlgorithm.map((step, idx) => `
              <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-start gap-4">
                <span class="size-6 rounded-full bg-primary/20 border border-primary text-primary text-xs font-black flex items-center justify-center flex-shrink-0">
                  ${idx + 1}
                </span>
                <span class="text-xs text-on-surface font-mono font-medium leading-relaxed mt-0.5">${escapeHtml(step)}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 8. JAVA SYNTAX & APIS -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 22px;">terminal</span>
            8. Essential Java Syntax & APIs
          </h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            ${p.javaSyntax.map((syn, idx) => `
              <div class="flex flex-col gap-2 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant">
                <div class="flex justify-between items-center">
                  <h4 class="text-white text-xs font-bold">${escapeHtml(syn.title)}</h4>
                  <button data-copy-id="syntax-${idx}" class="copy-btn text-[11px] text-primary font-bold hover:underline flex items-center gap-1">
                    <span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span> Copy
                  </button>
                </div>
                <p class="text-[11px] text-on-surface-variant mb-2">${escapeHtml(syn.description)}</p>
                <pre id="syntax-${idx}" class="font-mono text-xs text-blue-200 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar">${escapeHtml(syn.code)}</pre>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 9. COMPLETE JAVA IMPLEMENTATION -->
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h3 class="text-white text-lg font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">code</span>
              9. Complete Java Implementation
            </h3>
            <button id="copy-full-java-btn" class="text-xs text-primary font-bold hover:underline flex items-center gap-1">
              <span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span> Copy Full Code
            </button>
          </div>
          <div class="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant font-mono text-xs text-secondary overflow-x-auto custom-scrollbar">
            <pre id="full-java-code" class="whitespace-pre leading-relaxed">${escapeHtml(p.completeJavaCode)}</pre>
          </div>
        </div>

        <!-- 10. TIME AND SPACE COMPLEXITY -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 22px;">table_chart</span>
            10. Time and Space Complexity Comparison
          </h3>
          <div class="overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-low">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-outline-variant bg-surface-container-highest/60 text-on-surface-variant font-bold">
                  <th class="p-4">Approach</th>
                  <th class="p-4">Time Complexity</th>
                  <th class="p-4">Space Complexity</th>
                  <th class="p-4">Notes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/30 text-white font-mono">
                <tr>
                  <td class="p-4 text-error font-sans font-bold">Brute Force</td>
                  <td class="p-4 text-error">${escapeHtml(p.complexityComparison.bruteTime)}</td>
                  <td class="p-4">${escapeHtml(p.complexityComparison.bruteSpace)}</td>
                  <td class="p-4 text-on-surface-variant font-sans text-[11px]">Unoptimized nested evaluations</td>
                </tr>
                <tr>
                  <td class="p-4 text-secondary font-sans font-bold">${escapeHtml(p.name)} (Optimized)</td>
                  <td class="p-4 text-secondary">${escapeHtml(p.complexityComparison.optTime)}</td>
                  <td class="p-4 text-secondary">${escapeHtml(p.complexityComparison.optSpace)}</td>
                  <td class="p-4 text-on-surface-variant font-sans text-[11px]">${escapeHtml(p.complexityComparison.notes)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 11. VISUAL EXPLANATION -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">schema</span>
            11. Visual Explanation (${escapeHtml(p.visualExplanation.diagramType)})
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${p.visualExplanation.steps.map((st, idx) => `
              <div class="p-5 rounded-xl bg-surface-container-low border border-outline-variant/50 flex flex-col gap-2">
                <span class="text-[10px] font-black uppercase text-primary tracking-widest">Phase 0${idx + 1}</span>
                <h4 class="text-white text-xs font-bold">${escapeHtml(st.label)}</h4>
                <p class="text-[11px] text-on-surface-variant leading-relaxed">${escapeHtml(st.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 12. REAL-WORLD APPLICATIONS -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 22px;">domain</span>
            12. Real-World Industry Applications
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${p.realWorldApps.map(app => `
              <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col gap-1.5">
                <h4 class="text-white text-xs font-bold text-secondary flex items-center gap-1.5">
                  <span class="material-symbols-outlined" style="font-size: 16px;">memory</span>
                  ${escapeHtml(app.domain)}
                </h4>
                <p class="text-[11px] text-on-surface-variant leading-relaxed">${escapeHtml(app.description)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 13. COMMON INTERVIEW PROBLEMS -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">quiz</span>
            13. Common Interview Problems
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${p.commonProblems.map(prob => {
              const diffClass = prob.difficulty === 'Easy' 
                ? 'bg-secondary/10 border-secondary/30 text-secondary'
                : prob.difficulty === 'Medium'
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'bg-error/10 border-error/30 text-error';

              return `
                <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-3">
                  <div class="flex flex-col gap-1">
                    <span class="text-xs font-bold text-white">${escapeHtml(prob.title)}</span>
                    <span class="text-[10px] text-outline">${escapeHtml(prob.linkTitle)}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full border text-[10px] font-black uppercase ${diffClass}">
                    ${escapeHtml(prob.difficulty)}
                  </span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 14. COMMON MISTAKES & 15. INTERVIEW TIPS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col gap-4">
            <h3 class="text-white text-lg font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-error" style="font-size: 22px;">warning</span>
              14. Common Mistakes
            </h3>
            <div class="flex flex-col gap-3">
              ${p.commonMistakes.map(m => `
                <div class="p-4 rounded-xl bg-error-container/10 border border-error/30 flex items-start gap-3">
                  <span class="material-symbols-outlined text-error flex-shrink-0" style="font-size: 18px;">error</span>
                  <span class="text-xs text-on-surface-variant leading-relaxed">${escapeHtml(m)}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <h3 class="text-white text-lg font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-primary" style="font-size: 22px;">record_voice_over</span>
              15. Interview Tips
            </h3>
            <div class="flex flex-col gap-3">
              ${p.interviewTips.map(tip => `
                <div class="p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-3">
                  <span class="material-symbols-outlined text-primary flex-shrink-0" style="font-size: 18px;">record_voice_over</span>
                  <span class="text-xs text-on-surface-variant leading-relaxed">${escapeHtml(tip)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 16. KEY TAKEAWAYS -->
        <div class="p-6 rounded-2xl bg-surface-container-high border border-outline-variant flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">verified</span>
            16. Key Takeaways Summary
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
              <p class="text-[10px] font-black text-primary uppercase mb-1">When to Use</p>
              <p class="text-on-surface-variant leading-relaxed">${escapeHtml(p.keyTakeaways.whenToUse)}</p>
            </div>
            <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
              <p class="text-[10px] font-black text-secondary uppercase mb-1">Why It Works</p>
              <p class="text-on-surface-variant leading-relaxed">${escapeHtml(p.keyTakeaways.whyItWorks)}</p>
            </div>
            <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
              <p class="text-[10px] font-black text-white uppercase mb-1">Complexity</p>
              <p class="text-on-surface-variant font-mono leading-relaxed">${escapeHtml(p.keyTakeaways.complexity)}</p>
            </div>
            <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
              <p class="text-[10px] font-black text-primary uppercase mb-1">Recognition Trick</p>
              <p class="text-on-surface-variant leading-relaxed">${escapeHtml(p.keyTakeaways.recognitionTrick)}</p>
            </div>
          </div>
        </div>

        <!-- BOTTOM END CTA FOR PATTERN -->
        <div class="pt-8 border-t border-outline-variant/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-xs text-on-surface-variant font-mono">
            <span class="material-symbols-outlined text-secondary" style="font-size: 18px;">auto_stories</span>
            <span>Study Module Complete • Switch patterns above or move to Pattern Matrix</span>
          </div>
          <button id="next-pattern-matrix-btn" class="px-6 py-3 bg-secondary text-on-secondary font-black text-xs rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-glow-secondary">
            <span>Proceed to Step 2: Pattern Matrix</span>
            <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
          </button>
        </div>

      </div>
    `;

    // Bind copy buttons inside expanded detail
    const copyFullJavaBtn = document.getElementById('copy-full-java-btn');
    if (copyFullJavaBtn) {
      copyFullJavaBtn.onclick = () => {
        navigator.clipboard.writeText(p.completeJavaCode);
        copyFullJavaBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">check</span> Copied!`;
        setTimeout(() => {
          copyFullJavaBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span> Copy Full Code`;
        }, 2000);
      };
    }

    const copyBtns = container.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
      (btn as HTMLElement).onclick = () => {
        const copyId = btn.getAttribute('data-copy-id');
        if (copyId) {
          const target = document.getElementById(copyId);
          if (target) {
            navigator.clipboard.writeText(target.innerText);
            btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">check</span> Copied!`;
            setTimeout(() => {
              btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span> Copy`;
            }, 2000);
          }
        }
      };
    });

    const nextPatternMatrixBtn = document.getElementById('next-pattern-matrix-btn');
    if (nextPatternMatrixBtn) {
      nextPatternMatrixBtn.onclick = () => {
        this.onNavigateToMatrix();
      };
    }
  }

  public renderMatrixVisualCharts() {
    const container = document.getElementById('matrix-visual-chart-section');
    if (!container) return;

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Chart 1: Asymptotic Time Complexity Bar Meters -->
        <div class="p-6 rounded-2xl bg-surface-container border border-outline-variant flex flex-col gap-5 shadow-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary" style="font-size: 20px;">speed</span>
              <h4 class="text-white text-sm font-extrabold">Time Complexity Rating</h4>
            </div>
            <span class="text-[10px] text-on-surface-variant font-mono">Higher = Faster</span>
          </div>

          <div class="flex flex-col gap-3.5">
            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Prefix Sum (Query)</span>
                <span class="text-secondary font-mono">O(1)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-secondary rounded-full" style="width: 100%;"></div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Arrays & Hashing</span>
                <span class="text-primary font-mono">O(N)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 85%;"></div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Two Pointers</span>
                <span class="text-primary font-mono">O(N)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 85%;"></div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Sliding Window</span>
                <span class="text-primary font-mono">O(N)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 85%;"></div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Backtracking</span>
                <span class="text-error font-mono">O(2^N / N!)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-error rounded-full" style="width: 25%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart 2: Auxiliary Space Overhead -->
        <div class="p-6 rounded-2xl bg-surface-container border border-outline-variant flex flex-col gap-5 shadow-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary" style="font-size: 20px;">memory</span>
              <h4 class="text-white text-sm font-extrabold">Auxiliary Space Economy</h4>
            </div>
            <span class="text-[10px] text-on-surface-variant font-mono">Higher = In-Place</span>
          </div>

          <div class="flex flex-col gap-3.5">
            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Two Pointers</span>
                <span class="text-secondary font-mono">O(1) Memory</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-secondary rounded-full" style="width: 100%;"></div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Sliding Window</span>
                <span class="text-secondary font-mono">O(1) - O(K)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-secondary rounded-full" style="width: 90%;"></div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Backtracking</span>
                <span class="text-amber-400 font-mono">O(N) Recursion</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-amber-400 rounded-full" style="width: 60%;"></div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Arrays & Hashing</span>
                <span class="text-amber-400 font-mono">O(N) HashMap</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-amber-400 rounded-full" style="width: 50%;"></div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white">Prefix Sum Array</span>
                <span class="text-amber-400 font-mono">O(N) Array</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div class="h-full bg-amber-400 rounded-full" style="width: 50%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart 3: Interview Ask Frequency -->
        <div class="p-6 rounded-2xl bg-surface-container border border-outline-variant flex flex-col gap-5 shadow-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-400" style="font-size: 20px;">stars</span>
              <h4 class="text-white text-sm font-extrabold">Interview Test Frequency</h4>
            </div>
            <span class="text-[10px] text-on-surface-variant font-mono">Tier 1 Frequency</span>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30">
              <span class="text-xs font-bold text-white">Arrays & Hashing</span>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-black uppercase">98% Very High</span>
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30">
              <span class="text-xs font-bold text-white">Two Pointers</span>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-black uppercase">92% Very High</span>
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30">
              <span class="text-xs font-bold text-white">Sliding Window</span>
              <span class="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase">88% High</span>
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30">
              <span class="text-xs font-bold text-white">Backtracking</span>
              <span class="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase">82% High</span>
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30">
              <span class="text-xs font-bold text-white">Prefix Sum</span>
              <span class="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-black uppercase">78% Moderate</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  public renderComparisonTable() {
    const container = document.getElementById('matrix-table-container');
    if (!container) return;

    container.innerHTML = `
      <div class="overflow-x-auto rounded-2xl border border-outline-variant bg-surface-container shadow-xl">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-outline-variant bg-surface-container-highest/80 text-on-surface-variant font-extrabold uppercase tracking-wider">
              <th class="p-4">Pattern</th>
              <th class="p-4">Best Used For</th>
              <th class="p-4">Recognition Keywords</th>
              <th class="p-4">Time Complexity</th>
              <th class="p-4">Space Complexity</th>
              <th class="p-4">Difficulty</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/30 text-on-surface">
            ${SUMMARY_COMPARISON_TABLE.map(row => `
              <tr class="hover:bg-surface-container-high/60 transition-colors">
                <td class="p-4 font-black text-white flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary" style="font-size: 16px;">label</span>
                  ${row.pattern}
                </td>
                <td class="p-4 text-on-surface-variant max-w-xs leading-relaxed">${row.bestUsedFor}</td>
                <td class="p-4 text-secondary font-mono font-bold">${row.keywords}</td>
                <td class="p-4 text-primary font-mono font-bold">${row.timeComp}</td>
                <td class="p-4 font-mono">${row.spaceComp}</td>
                <td class="p-4">
                  <span class="px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase ${
                    row.difficulty === 'Beginner' ? 'bg-secondary/10 border-secondary/30 text-secondary' : 'bg-primary/10 border-primary/30 text-primary'
                  }">
                    ${row.difficulty}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  public renderMatrixCheatsheet() {
    const container = document.getElementById('matrix-cheatsheet-section');
    if (!container) return;

    container.innerHTML = `
      <div class="flex flex-col gap-2">
        <h3 class="text-white text-xl font-extrabold flex items-center gap-2">
          <span class="material-symbols-outlined text-primary" style="font-size: 22px;">account_tree</span>
          Interview Pattern Decision Rules
        </h3>
        <p class="text-xs text-on-surface-variant">Instant mental triggers to recognize the correct pattern when given problem statements.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div class="p-5 rounded-2xl bg-surface-container border border-outline-variant flex flex-col gap-3 shadow-md">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-xs font-black">IF</span>
            <span class="text-xs font-extrabold text-white">Array is Sorted</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Need to find pair sums, remove duplicates, or compare opposite ends?</p>
          <div class="p-3 rounded-xl bg-surface-container-high border-l-4 border-primary flex items-center justify-between mt-auto">
            <span class="text-xs font-black text-primary">Use Two Pointers</span>
            <span class="text-[10px] text-on-surface-variant font-mono">O(N) time, O(1) space</span>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container border border-outline-variant flex flex-col gap-3 shadow-md">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-secondary/20 text-secondary text-xs font-black">IF</span>
            <span class="text-xs font-extrabold text-white">Contiguous Subarray / Substring</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Finding longest/shortest valid window with k distinct elements?</p>
          <div class="p-3 rounded-xl bg-surface-container-high border-l-4 border-secondary flex items-center justify-between mt-auto">
            <span class="text-xs font-black text-secondary">Use Sliding Window</span>
            <span class="text-[10px] text-on-surface-variant font-mono">O(N) time, O(1) space</span>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container border border-outline-variant flex flex-col gap-3 shadow-md">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-400 text-xs font-black">IF</span>
            <span class="text-xs font-extrabold text-white">Generate All Combinations / Subsets</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Finding permutations, combinations, or N-Queens placement paths?</p>
          <div class="p-3 rounded-xl bg-surface-container-high border-l-4 border-amber-400 flex items-center justify-between mt-auto">
            <span class="text-xs font-black text-amber-400">Use Backtracking</span>
            <span class="text-[10px] text-on-surface-variant font-mono">O(2^N) / O(N!) search</span>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container border border-outline-variant flex flex-col gap-3 shadow-md">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-xs font-black">IF</span>
            <span class="text-xs font-extrabold text-white">O(1) Frequency or Complement</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Checking element presence or calculating target - current complement?</p>
          <div class="p-3 rounded-xl bg-surface-container-high border-l-4 border-primary flex items-center justify-between mt-auto">
            <span class="text-xs font-black text-primary">Use HashMap / HashSet</span>
            <span class="text-[10px] text-on-surface-variant font-mono">O(N) time, O(N) space</span>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container border border-outline-variant flex flex-col gap-3 shadow-md">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-secondary/20 text-secondary text-xs font-black">IF</span>
            <span class="text-xs font-extrabold text-white">Multiple Cumulative Range Sums</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Answering subsegment sum queries or total subarray sums equal to k?</p>
          <div class="p-3 rounded-xl bg-surface-container-high border-l-4 border-secondary flex items-center justify-between mt-auto">
            <span class="text-xs font-black text-secondary">Use Prefix Sum Array</span>
            <span class="text-[10px] text-on-surface-variant font-mono">O(1) per query sum</span>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-surface-container border border-outline-variant flex flex-col gap-3 shadow-md">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-400 text-xs font-black">TIP</span>
            <span class="text-xs font-extrabold text-white">Interview Golden Strategy</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">Always state brute force O(N²) / O(N³) first, then explain how these patterns optimize time/space!</p>
          <div class="p-3 rounded-xl bg-surface-container-high border-l-4 border-amber-400 flex items-center justify-between mt-auto">
            <span class="text-xs font-black text-amber-400">Explain Complexity Trade-off</span>
            <span class="text-[10px] text-on-surface-variant font-mono">Senior Engineer Vibe</span>
          </div>
        </div>
      </div>
    `;
  }
}

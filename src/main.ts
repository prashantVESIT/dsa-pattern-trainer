/**
 * DSA Pattern Trainer - Vanilla TypeScript Logic
 */
import { HandbookManager } from './handbook';

interface TopicData {
  id: number;
  topic: string;
  problem: string;
  explanation: string;
  complexity: { time: string; space: string };
  mistake: string;
  hint: string;
  code: string;
  mcq: {
    question: string;
    options: string[];
    correct: number;
  };
}

interface TopicAnswer {
  predictCorrect: boolean;
  mcqCorrect: boolean;
  selectedPredict: string;
  selectedMCQIndex: number;
}

const DSA_DATA: TopicData[] = [
  {
    id: 1,
    topic: "Arrays & Hashing",
    problem: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    explanation: "The optimal approach uses a HashMap<Integer, Integer> to store numbers we've already visited and their array indices.",
    complexity: { time: "O(n)", space: "O(n)" },
    mistake: "Trying to use nested loops O(n²) or omitting explicit generic types in Java.",
    hint: "When iterating through the array, compute complement = target - nums[i] and check if it exists in a Map<Integer, Integer>.",
    code: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        if (nums == null || nums.length < 2) {
            return new int[0];
        }

        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }

            map.put(nums[i], i);
        }

        return new int[0];
    }
}`,
    mcq: {
      question: "Why is a HashMap better than sorting for the Two Sum problem in this case?",
      options: [
        "Sorting takes O(n log n)",
        "HashMaps work in O(1) average lookup",
        "Sorting loses index information",
        "All of the above"
      ],
      correct: 3
    }
  },
  {
    id: 2,
    topic: "Two Pointers",
    problem: "Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
    explanation: "Maintain left pointer at start (0) and right pointer at end (n - 1). Move them inward while skipping non-alphanumeric characters.",
    complexity: { time: "O(n)", space: "O(1)" },
    mistake: "Allocating a new string or using recursion, which increases space complexity to O(n).",
    hint: "Compare characters from both ends moving inward using Character.isLetterOrDigit() and Character.toLowerCase().",
    code: `public class Solution {
    public boolean isPalindrome(String s) {
        if (s == null) {
            return false;
        }

        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }

            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}`,
    mcq: {
      question: "In what scenario is the Two Pointer approach typically optimized?",
      options: [
        "When extra space is prohibited",
        "When the array is sorted",
        "When searching for pairs",
        "All of the above"
      ],
      correct: 3
    }
  },
  {
    id: 3,
    topic: "Sliding Window",
    problem: "Given a string s, find the length of the longest substring without repeating characters.",
    explanation: "Maintain a sliding window defined by [left, right]. Use a Set<Character> to track unique characters in the window and shrink left whenever a duplicate is found.",
    complexity: { time: "O(n)", space: "O(min(n, m))" },
    mistake: "Shrinking the window using an if statement instead of a while loop when removing duplicate characters.",
    hint: "Use a Set<Character> set = new HashSet<>(); to store unique characters in window [left, right] and shrink from left when duplicate is detected.",
    code: `import java.util.HashSet;
import java.util.Set;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        Set<Character> set = new HashSet<>();

        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left++));
            }

            set.add(s.charAt(right));

            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}`,
    mcq: {
      question: "What is the primary benefit of the Sliding Window technique?",
      options: [
        "Reduces space complexity",
        "Eliminates redundant calculations by reusing window state",
        "Sorts the data first",
        "Works for non-contiguous elements"
      ],
      correct: 1
    }
  },
  {
    id: 4,
    topic: "Prefix Sum",
    problem: "Given an array of integers nums and an integer k, return the total number of contiguous subarrays whose sum equals to k.",
    explanation: "Store running cumulative prefix sums in a Map<Integer, Integer> map. For each current sum, check if (currentSum - k) exists in the map.",
    complexity: { time: "O(n)", space: "O(n)" },
    mistake: "Forgetting to seed map.put(0, 1) or calculating range sums from scratch with nested loops.",
    hint: "If currentSum - k has been seen previously in the prefix map, add its frequency to your answer.",
    code: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int subarraySum(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        Map<Integer, Integer> prefixMap = new HashMap<>();
        prefixMap.put(0, 1);

        int currentSum = 0;
        int resultCount = 0;

        for (int num : nums) {
            currentSum += num;

            if (prefixMap.containsKey(currentSum - k)) {
                resultCount += prefixMap.get(currentSum - k);
            }

            prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1);
        }

        return resultCount;
    }
}`,
    mcq: {
      question: "What is the time complexity to find a range sum after building a Prefix Sum array or map?",
      options: [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(j - i)"
      ],
      correct: 2
    }
  },
  {
    id: 5,
    topic: "Backtracking",
    problem: "Generate all possible permutations of a given array of distinct integers.",
    explanation: "Use a recursive helper backtrack(nums, current, result) to explore all decision paths. Add elements to current, recurse, and undo choice (backtrack) by removing last element.",
    complexity: { time: "O(n!)", space: "O(n)" },
    mistake: "Adding current directly to result without making a deep copy (new ArrayList<>(current)), resulting in empty lists when backtracking finishes.",
    hint: "Problem asks to 'Generate all', 'Find all', or 'Try all combinations' using 3 steps: Choose, Recurse, Unchoose.",
    code: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        if (nums == null || nums.length == 0) {
            return result;
        }

        List<Integer> current = new ArrayList<>();
        backtrack(nums, current, result);
        return result;
    }

    private void backtrack(int[] nums, List<Integer> current, List<List<Integer>> result) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int num : nums) {
            if (current.contains(num)) {
                continue;
            }

            current.add(num);

            backtrack(nums, current, result);

            current.remove(current.size() - 1);
        }
    }
}`,
    mcq: {
      question: "Why do we create a 'new ArrayList<>(current)' before adding it to results?",
      options: [
        "Java passes objects by reference; without a deep copy, subsequent removals corrupt all result entries",
        "To clear the list",
        "To sort the output",
        "For memory optimization"
      ],
      correct: 0
    }
  }
];

const ALL_STRATEGY_OPTIONS = [
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Prefix Sum",
  "Backtracking",
  "Dynamic Programming",
  "Greedy Algorithms",
  "Binary Search"
];

// In-Memory Application State (No localStorage used!)
let state = {
  isLoggedIn: false,
  currentChallengeIndex: 0,
  xp: 0, // Starts at 0 XP
  totalScore: 0, // Real calculated score out of 10
  answers: [] as TopicAnswer[], // Stores answer for each topic
  predictAnswered: false,
  mcqAnswered: false,
  userName: "Prashant Singh",
  userEmail: "prashantnsingh1@gmail.com",
  isMasked: false,
  pin: "",
  settings: {
    sounds: true,
    contrast: false,
    theme: 'monokai' as 'monokai' | 'github' | 'dracula'
  }
};

// Sound Synthesizer via Web Audio API
class SoundManager {
  private ctx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.initCtx();
      };
      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
      window.addEventListener('pointerdown', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
    }
  }

  public initCtx() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // AudioContext creation guard
    }
  }

  public playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.12, force = false) {
    if (!state.settings.sounds && !force) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Ignore audio context errors if browser restricts autoplay
    }
  }

  public playClick() {
    this.playTone(587.33, 0.08, 'sine', 0.12); // D5
  }

  public playNav() {
    this.playTone(440, 0.08, 'sine', 0.1); // A4
  }

  public playCorrect() {
    // High-frequency bright chime for correct answers
    this.playTone(523.25, 0.09, 'sine', 0.15); // C5
    setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.15), 75); // E5
    setTimeout(() => this.playTone(783.99, 0.14, 'sine', 0.15), 150); // G5
    setTimeout(() => this.playTone(1046.50, 0.22, 'sine', 0.15), 225); // C6
  }

  public playIncorrect() {
    // Low-frequency dull tone for incorrect answers
    this.playTone(180, 0.14, 'sawtooth', 0.14); // Low F3
    setTimeout(() => this.playTone(135, 0.24, 'sawtooth', 0.14), 100); // Low C#3
  }

  public playSuccess() {
    this.playCorrect();
  }

  public playError() {
    this.playIncorrect();
  }

  public playToggleOn() {
    // High-frequency chime when enabling sounds
    this.playTone(523.25, 0.08, 'sine', 0.18, true);
    setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.18, true), 70);
    setTimeout(() => this.playTone(880.00, 0.15, 'sine', 0.18, true), 140);
  }

  public playToggleOff() {
    // Low descending tone when disabling sounds
    this.playTone(440.00, 0.08, 'sine', 0.15, true);
    setTimeout(() => this.playTone(330.00, 0.12, 'sine', 0.15, true), 70);
  }
}

const audio = new SoundManager();

let handbookManager: HandbookManager;

// --- Initialization ---
function init() {
  handbookManager = new HandbookManager(
    (patternIndex?: number) => {
      audio.playNav();
      if (patternIndex !== undefined && patternIndex >= 0 && patternIndex < DSA_DATA.length) {
        state.currentChallengeIndex = patternIndex;
      }
      showMainAppView();
    },
    () => {
      audio.playNav();
      showMatrixView();
    },
    () => {
      audio.playNav();
      showHandbookView();
    },
    () => {
      audio.playNav();
    }
  );

  handbookManager.init();
  loadSettings();
  bindGlobalEvents();
  updateXPDisplay();
  updateSettingsUI();
  updateUserHeaderUI();

  if (state.isLoggedIn) {
    showHandbookView();
  } else {
    showLoginView();
  }
}

function bindGlobalEvents() {
  // Login handlers & Privacy controls
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const guestBtn = document.getElementById('guest-login-btn');
  const toggleMaskBtn = document.getElementById('toggle-mask-btn');
  const clearLocalBtn = document.getElementById('clear-local-btn');

  const nameInput = document.getElementById('login-name-input') as HTMLInputElement;
  const emailInput = document.getElementById('login-email-input') as HTMLInputElement;
  const pinInput = document.getElementById('login-pin-input') as HTMLInputElement;
  const maskIcon = document.getElementById('mask-icon');
  const maskLabel = document.getElementById('mask-label');

  if (toggleMaskBtn) {
    toggleMaskBtn.onclick = () => {
      audio.playClick();
      state.isMasked = !state.isMasked;
      if (nameInput) nameInput.type = state.isMasked ? 'password' : 'text';
      if (emailInput) emailInput.type = state.isMasked ? 'password' : 'email';
      if (maskIcon) maskIcon.innerText = state.isMasked ? 'visibility' : 'visibility_off';
      if (maskLabel) maskLabel.innerText = state.isMasked ? 'Unmask Private Inputs' : 'Mask Private Inputs';
    };
  }

  if (clearLocalBtn) {
    clearLocalBtn.onclick = () => {
      audio.playError();
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (pinInput) pinInput.value = '';
      state.userName = '';
      state.userEmail = '';
      state.pin = '';
      alert('Local session privacy data cleared.');
    };
  }

  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      audio.playSuccess();

      state.userName = nameInput?.value?.trim() || "Candidate";
      state.userEmail = emailInput?.value?.trim() || "candidate@dsa-trainer.dev";
      state.pin = pinInput?.value?.trim() || "";
      state.isLoggedIn = true;

      updateUserHeaderUI();
      showHandbookView();
    };
  }

  if (guestBtn) {
    guestBtn.onclick = () => {
      audio.playSuccess();
      state.userName = "Guest Candidate";
      state.userEmail = "guest@dsa-trainer.dev";
      state.isLoggedIn = true;

      updateUserHeaderUI();
      showHandbookView();
    };
  }

  // Bind Section Navigation Tabs across all headers
  document.querySelectorAll('.nav-btn-handbook').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      audio.playNav();
      showHandbookView();
    };
  });

  document.querySelectorAll('.nav-btn-matrix').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      audio.playNav();
      showMatrixView();
    };
  });

  document.querySelectorAll('.nav-btn-quiz').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      audio.playNav();
      showMainAppView();
    };
  });

  // Global action triggers (settings, profile, logout)
  document.querySelectorAll('.global-settings-trigger').forEach(btn => {
    (btn as HTMLElement).onclick = () => openModal('settings');
  });

  document.querySelectorAll('.global-profile-trigger').forEach(btn => {
    (btn as HTMLElement).onclick = () => openModal('profile');
  });

  document.querySelectorAll('.global-logout-trigger').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      audio.playClick();
      state.isLoggedIn = false;
      showLoginView();
    };
  });

  // Modal toggle handlers
  const modalOverlay = document.getElementById('modal-overlay');
  const closeModalBtns = document.querySelectorAll('.close-modal-btn');

  closeModalBtns.forEach(btn => {
    (btn as HTMLElement).onclick = closeModal;
  });

  if (modalOverlay) {
    modalOverlay.onclick = (e) => {
      if (e.target === modalOverlay) closeModal();
    };
  }

  // Settings Toggles
  const toggleSoundBtn = document.getElementById('toggle-sounds');
  const toggleContrastBtn = document.getElementById('toggle-contrast');

  if (toggleSoundBtn) {
    toggleSoundBtn.onclick = () => {
      audio.initCtx();
      const willEnable = !state.settings.sounds;
      state.settings.sounds = willEnable;
      saveSettings();
      updateSettingsUI();
      if (willEnable) {
        audio.playToggleOn();
      } else {
        audio.playToggleOff();
      }
    };
  }

  if (toggleContrastBtn) {
    toggleContrastBtn.onclick = () => {
      state.settings.contrast = !state.settings.contrast;
      if (state.settings.sounds) audio.playClick();
      saveSettings();
      updateSettingsUI();
    };
  }

  // Theme selector buttons
  const themeBtns = document.querySelectorAll('#theme-selector button');
  themeBtns.forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      const theme = btn.getAttribute('data-theme') as 'monokai' | 'github' | 'dracula';
      if (theme) {
        state.settings.theme = theme;
        if (state.settings.sounds) audio.playClick();
        saveSettings();
        updateSettingsUI();
      }
    };
  });

  // Mobile Left Window Drawer Handlers
  const mobileToggleRoadmapBtn = document.getElementById('mobile-toggle-roadmap-btn');
  const closeMobileRoadmapBtn = document.getElementById('close-mobile-roadmap-btn');
  const mobileRoadmapDrawer = document.getElementById('mobile-roadmap-drawer');

  if (mobileToggleRoadmapBtn) {
    mobileToggleRoadmapBtn.onclick = () => {
      audio.playClick();
      if (mobileRoadmapDrawer) mobileRoadmapDrawer.classList.remove('hidden');
    };
  }

  if (closeMobileRoadmapBtn) {
    closeMobileRoadmapBtn.onclick = () => {
      closeMobileRoadmapDrawer();
    };
  }

  if (mobileRoadmapDrawer) {
    mobileRoadmapDrawer.onclick = (e) => {
      if (e.target === mobileRoadmapDrawer) {
        closeMobileRoadmapDrawer();
      }
    };
  }
}

function closeMobileRoadmapDrawer() {
  audio.playClick();
  const drawer = document.getElementById('mobile-roadmap-drawer');
  if (drawer) drawer.classList.add('hidden');
}

function showLoginView() {
  closeModal();
  const loginView = document.getElementById('login-view');
  const handbookView = document.getElementById('handbook-view');
  const matrixView = document.getElementById('matrix-view');
  const mainAppView = document.getElementById('main-app-view');

  if (loginView) loginView.classList.remove('hidden');
  if (handbookView) handbookView.classList.add('hidden');
  if (matrixView) matrixView.classList.add('hidden');
  if (mainAppView) mainAppView.classList.add('hidden');
}

function showHandbookView() {
  closeModal();
  const loginView = document.getElementById('login-view');
  const handbookView = document.getElementById('handbook-view');
  const matrixView = document.getElementById('matrix-view');
  const mainAppView = document.getElementById('main-app-view');

  if (loginView) loginView.classList.add('hidden');
  if (handbookView) handbookView.classList.remove('hidden');
  if (matrixView) matrixView.classList.add('hidden');
  if (mainAppView) mainAppView.classList.add('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMatrixView() {
  closeModal();
  const loginView = document.getElementById('login-view');
  const handbookView = document.getElementById('handbook-view');
  const matrixView = document.getElementById('matrix-view');
  const mainAppView = document.getElementById('main-app-view');

  if (loginView) loginView.classList.add('hidden');
  if (handbookView) handbookView.classList.add('hidden');
  if (matrixView) matrixView.classList.remove('hidden');
  if (mainAppView) mainAppView.classList.add('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMainAppView() {
  closeModal();
  const loginView = document.getElementById('login-view');
  const handbookView = document.getElementById('handbook-view');
  const matrixView = document.getElementById('matrix-view');
  const mainAppView = document.getElementById('main-app-view');

  if (loginView) loginView.classList.add('hidden');
  if (handbookView) handbookView.classList.add('hidden');
  if (matrixView) matrixView.classList.add('hidden');
  if (mainAppView) mainAppView.classList.remove('hidden');

  renderRoadmap();
  renderChallenge();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateUserHeaderUI() {
  const headerName = document.getElementById('header-user-name');
  const headerEmail = document.getElementById('header-user-email');
  const certNameInput = document.getElementById('cert-name-input') as HTMLInputElement;
  const certNameDisplay = document.getElementById('cert-name-display');

  if (headerName) headerName.innerText = state.userName;
  if (headerEmail) headerEmail.innerText = state.userEmail;
  if (certNameInput) certNameInput.value = state.userName;
  if (certNameDisplay) certNameDisplay.innerText = state.userName;
}

function openModal(type: 'settings' | 'profile' | 'email') {
  audio.playClick();
  const overlay = document.getElementById('modal-overlay');
  const settingsModal = document.getElementById('settings-modal');
  const profileModal = document.getElementById('profile-modal');
  const emailModal = document.getElementById('email-modal');

  if (!overlay) return;

  overlay.classList.remove('hidden');

  if (settingsModal) settingsModal.classList.toggle('hidden', type !== 'settings');
  if (profileModal) profileModal.classList.toggle('hidden', type !== 'profile');
  if (emailModal) emailModal.classList.toggle('hidden', type !== 'email');

  if (type === 'profile') {
    updateProfileData();
  }
}

function closeModal() {
  audio.playClick();
  const overlay = document.getElementById('modal-overlay');
  const settingsModal = document.getElementById('settings-modal');
  const profileModal = document.getElementById('profile-modal');
  const emailModal = document.getElementById('email-modal');

  if (overlay) overlay.classList.add('hidden');
  if (settingsModal) settingsModal.classList.add('hidden');
  if (profileModal) profileModal.classList.add('hidden');
  if (emailModal) emailModal.classList.add('hidden');
}

function saveSettings() {
  try {
    localStorage.setItem('dsa_trainer_settings', JSON.stringify(state.settings));
  } catch {
    // Ignore localStorage restrictions if restricted
  }
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('dsa_trainer_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed.sounds === 'boolean') state.settings.sounds = parsed.sounds;
      if (typeof parsed.contrast === 'boolean') state.settings.contrast = parsed.contrast;
      if (['monokai', 'github', 'dracula'].includes(parsed.theme)) state.settings.theme = parsed.theme;
    }
  } catch {
    // Ignore localStorage restrictions if restricted
  }
}

function updateSettingsUI() {
  // Always synchronize document element class for high contrast mode
  document.documentElement.classList.toggle('high-contrast', !!state.settings.contrast);

  const soundBtn = document.getElementById('toggle-sounds');
  const soundThumb = document.getElementById('toggle-sounds-thumb');
  if (soundBtn && soundThumb) {
    if (state.settings.sounds) {
      soundBtn.className = "w-12 h-6 rounded-full bg-primary relative transition-colors duration-300";
      soundThumb.className = "absolute top-1 left-1 size-4 bg-white rounded-full transition-all duration-300 translate-x-6";
    } else {
      soundBtn.className = "w-12 h-6 rounded-full bg-outline-variant relative transition-colors duration-300";
      soundThumb.className = "absolute top-1 left-1 size-4 bg-white rounded-full transition-all duration-300 translate-x-0";
    }
  }

  const contrastBtn = document.getElementById('toggle-contrast');
  const contrastThumb = document.getElementById('toggle-contrast-thumb');
  if (contrastBtn && contrastThumb) {
    if (state.settings.contrast) {
      contrastBtn.className = "w-12 h-6 rounded-full bg-primary relative transition-colors duration-300";
      contrastThumb.className = "absolute top-1 left-1 size-4 bg-white rounded-full transition-all duration-300 translate-x-6";
    } else {
      contrastBtn.className = "w-12 h-6 rounded-full bg-outline-variant relative transition-colors duration-300";
      contrastThumb.className = "absolute top-1 left-1 size-4 bg-white rounded-full transition-all duration-300 translate-x-0";
    }
  }

  // Update syntax theme attribute on document element
  document.documentElement.setAttribute('data-syntax-theme', state.settings.theme);

  // Update theme button selection styling
  const themeBtns = document.querySelectorAll('#theme-selector button');
  themeBtns.forEach(btn => {
    const t = btn.getAttribute('data-theme');
    if (t === state.settings.theme) {
      btn.className = "px-3 py-2 rounded-lg bg-primary/20 border-2 border-primary text-primary text-xs font-bold transition-all shadow-glow-primary";
    } else {
      btn.className = "px-3 py-2 rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant text-xs font-medium transition-all hover:bg-surface-container-high";
    }
  });

  // Apply syntax theme styling class to code block
  const codeBlock = document.getElementById('code-snippet');
  if (codeBlock) {
    codeBlock.className = `whitespace-pre leading-relaxed font-mono text-sm ${
      state.settings.theme === 'dracula' ? 'text-pink-200' :
      state.settings.theme === 'github' ? 'text-blue-200' : 'text-yellow-200'
    }`;
  }
}

function updateProfileData() {
  const nameElem = document.getElementById('profile-name');
  const xpElem = document.getElementById('profile-xp');
  const scoreElem = document.getElementById('profile-score');
  const emailElem = document.getElementById('profile-email');
  if (nameElem) nameElem.innerText = state.userName;
  if (xpElem) xpElem.innerText = `${state.xp} XP`;
  if (scoreElem) scoreElem.innerText = `${calculateCurrentScore()}/10`;
  if (emailElem) emailElem.innerText = state.userEmail;
}

function calculateCurrentScore(): number {
  return state.answers.reduce((sum, a) => {
    return sum + (a.predictCorrect ? 1 : 0) + (a.mcqCorrect ? 1 : 0);
  }, 0);
}

// --- Roadmap Navigation Bar ---
function renderRoadmap() {
  const container = document.getElementById('roadmap-container');
  const mobileContainer = document.getElementById('mobile-roadmap-container');

  const buildTopicElement = (item: TopicData, index: number, isMobile = false) => {
    const isCompleted = index < state.currentChallengeIndex;
    const isCurrent = index === state.currentChallengeIndex;
    const div = document.createElement('div');

    const canJump = index <= state.currentChallengeIndex || state.currentChallengeIndex >= DSA_DATA.length;
    
    div.className = `flex items-center gap-3.5 px-4 py-3 rounded-2xl border transition-all duration-300 ${
      canJump ? 'cursor-pointer hover:border-primary hover:scale-[1.01]' : 'cursor-not-allowed opacity-60'
    } ${
      isCurrent ? 'bg-surface-container-highest border-primary shadow-glow-primary active-pulse' :
      isCompleted ? 'bg-surface-container/50 border-secondary/30' : 'border-transparent opacity-70'
    }`;

    const icon = isCompleted ? 'check_circle' : (isCurrent ? 'track_changes' : 'lock');
    const colorClass = isCompleted ? 'text-secondary bg-secondary/20' : (isCurrent ? 'text-primary bg-primary/20' : 'text-outline bg-surface-container');

    div.innerHTML = `
      <div class="flex-shrink-0">
        <div class="size-8 rounded-full ${colorClass} flex items-center justify-center">
          <span class="material-symbols-outlined" style="font-size: 18px; ${isCompleted ? "font-variation-settings: 'FILL' 1;" : ''}">${icon}</span>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-white text-xs font-black tracking-tight truncate">Challenge ${index + 1}</p>
        <p class="${isCurrent ? 'text-primary font-bold' : 'text-on-surface-variant'} text-[10px] uppercase tracking-widest">${isCompleted ? 'Completed' : (isCurrent ? 'Predicting...' : 'Locked')}</p>
      </div>
    `;

    if (canJump) {
      div.onclick = () => {
        audio.playNav();
        state.currentChallengeIndex = index;
        renderRoadmap();
        renderChallenge();
        if (isMobile) {
          closeMobileRoadmapDrawer();
        }
      };
    }

    return div;
  };

  if (container) {
    container.innerHTML = '';
    DSA_DATA.forEach((item, index) => {
      container.appendChild(buildTopicElement(item, index, false));
    });
  }

  if (mobileContainer) {
    mobileContainer.innerHTML = '';
    DSA_DATA.forEach((item, index) => {
      mobileContainer.appendChild(buildTopicElement(item, index, true));
    });
  }

  const currentStep = Math.min(state.currentChallengeIndex + 1, 5);
  const progressPct = `${(Math.min(state.currentChallengeIndex, 5) / 5) * 100}%`;

  document.querySelectorAll('.progress-text-val').forEach(el => {
    (el as HTMLElement).innerText = `${currentStep}/5`;
  });

  const progressBar = document.getElementById('progress-bar');
  if (progressBar) progressBar.style.width = progressPct;

  document.querySelectorAll('.mobile-progress-bar-fill').forEach(el => {
    (el as HTMLElement).style.width = progressPct;
  });
}

// --- Challenge Rendering ---
function renderChallenge() {
  const challengeCard = document.getElementById('challenge-card');
  const resultsCard = document.getElementById('results-card');

  if (state.currentChallengeIndex >= DSA_DATA.length) {
    // Show results only when all 5 topics completed!
    if (challengeCard) challengeCard.classList.add('hidden');
    if (resultsCard) {
      resultsCard.classList.remove('hidden');
      renderResultsView();
    }
    return;
  }

  if (challengeCard) challengeCard.classList.remove('hidden');
  if (resultsCard) resultsCard.classList.add('hidden');

  const challenge = DSA_DATA[state.currentChallengeIndex];
  state.predictAnswered = false;
  state.mcqAnswered = false;

  const challengeTitle = document.getElementById('challenge-title');
  const problemText = document.getElementById('problem-text');
  const revealedTopic = document.getElementById('revealed-topic');

  if (challengeTitle) challengeTitle.innerText = `Challenge ${challenge.id} of 5`;
  if (problemText) problemText.innerText = challenge.problem;
  if (revealedTopic) {
    revealedTopic.classList.add('hidden', 'opacity-0');
    revealedTopic.innerText = challenge.topic;
  }

  // Render Pattern Prediction Strategy Buttons
  const patternButtonsContainer = document.getElementById('pattern-buttons');
  if (patternButtonsContainer) {
    patternButtonsContainer.innerHTML = '';

    // Pick 6 strategy options including the correct topic
    const otherOptions = ALL_STRATEGY_OPTIONS.filter(o => o !== challenge.topic);
    const shuffledOthers = [...otherOptions].sort(() => 0.5 - Math.random()).slice(0, 5);
    const options = [challenge.topic, ...shuffledOthers].sort(() => 0.5 - Math.random());

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = "flex items-center justify-between p-5 rounded-2xl border border-outline-variant bg-surface-container-low hover:bg-surface-container-highest transition-all group hover:border-primary glow-button text-left";
      btn.innerHTML = `
        <span class="text-on-surface font-bold group-hover:text-white transition-colors">${opt}</span>
        <span class="material-symbols-outlined text-outline group-hover:text-primary transition-all group-hover:translate-x-1" style="font-size: 20px;">chevron_right</span>
      `;
      btn.onclick = () => handlePrediction(opt, btn);
      patternButtonsContainer.appendChild(btn);
    });
  }

  // Reset visibility of approach, feedback, and next button
  const predictionSection = document.getElementById('prediction-section');
  const predictionFeedback = document.getElementById('prediction-feedback');
  const approachSection = document.getElementById('approach-section');
  const nextBtn = document.getElementById('next-btn');

  if (predictionSection) predictionSection.classList.remove('hidden');
  if (predictionFeedback) predictionFeedback.classList.add('hidden', 'opacity-0');
  if (approachSection) approachSection.classList.add('hidden');
  if (nextBtn) nextBtn.classList.add('hidden');
}

function handlePrediction(choice: string, selectedBtn: HTMLButtonElement) {
  if (state.predictAnswered) return;
  state.predictAnswered = true;

  const challenge = DSA_DATA[state.currentChallengeIndex];
  const isCorrect = choice === challenge.topic;

  // Sound feedback
  if (isCorrect) audio.playSuccess();
  else audio.playError();

  // Highlight all buttons
  const buttons = document.querySelectorAll('#pattern-buttons button');
  buttons.forEach(b => {
    (b as HTMLButtonElement).disabled = true;
    b.classList.remove('glow-button', 'hover:border-primary');
    const label = b.querySelector('span')?.textContent;
    if (label === challenge.topic) {
      b.className = "flex items-center justify-between p-5 rounded-2xl border-2 border-secondary bg-secondary/10 text-left font-bold text-white shadow-glow-secondary";
    } else if (label === choice && !isCorrect) {
      b.className = "flex items-center justify-between p-5 rounded-2xl border-2 border-error bg-error-container/10 text-left font-bold text-error opacity-80";
    } else {
      b.classList.add('opacity-40');
    }
  });

  // Reveal topic badge
  const rev = document.getElementById('revealed-topic');
  if (rev) {
    rev.classList.remove('hidden');
    setTimeout(() => rev.classList.remove('opacity-0'), 50);
  }

  // Show Feedback Alert
  const feedback = document.getElementById('prediction-feedback');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackStatus = document.getElementById('feedback-status');
  const feedbackMsg = document.getElementById('feedback-msg');

  if (feedback && feedbackIcon && feedbackStatus && feedbackMsg) {
    feedback.classList.remove('hidden');
    setTimeout(() => feedback.classList.remove('opacity-0'), 10);

    if (isCorrect) {
      feedback.className = "p-5 rounded-2xl flex items-center gap-5 transition-reveal bg-secondary/10 border border-secondary text-secondary mt-6 shadow-glow-secondary";
      feedbackIcon.innerText = "verified";
      feedbackStatus.innerText = "Strategy Confirmed (+50 XP)";
      feedbackMsg.innerText = `Accurate identification! This problem is best tackled using the ${challenge.topic} pattern.`;
      addXP(50);
    } else {
      feedback.className = "p-5 rounded-2xl flex items-center gap-5 transition-reveal bg-error-container/10 border border-error text-error mt-6";
      feedbackIcon.innerText = "error_outline";
      feedbackStatus.innerText = "Pattern Misaligned";
      feedbackMsg.innerText = `You selected '${choice}'. The optimal pattern for this problem is ${challenge.topic}.`;
    }
  }

  // Initialize or update topic answer record
  if (!state.answers[state.currentChallengeIndex]) {
    state.answers[state.currentChallengeIndex] = {
      predictCorrect: isCorrect,
      mcqCorrect: false,
      selectedPredict: choice,
      selectedMCQIndex: -1
    };
  } else {
    state.answers[state.currentChallengeIndex].predictCorrect = isCorrect;
    state.answers[state.currentChallengeIndex].selectedPredict = choice;
  }

  // Reveal approach section and MCQ
  revealApproach(challenge);
}

function revealApproach(challenge: TopicData) {
  const section = document.getElementById('approach-section');
  if (!section) return;

  section.classList.remove('hidden');

  const exp = document.getElementById('approach-explanation');
  const timeComp = document.getElementById('time-complexity');
  const spaceComp = document.getElementById('space-complexity');
  const mistake = document.getElementById('interview-mistake');
  const hint = document.getElementById('recognition-hint');
  const code = document.getElementById('code-snippet');
  const copyBtn = document.getElementById('copy-code-btn');

  if (exp) exp.innerText = challenge.explanation;
  if (timeComp) timeComp.innerText = challenge.complexity.time;
  if (spaceComp) spaceComp.innerText = challenge.complexity.space;
  if (mistake) mistake.innerText = challenge.mistake;
  if (hint) hint.innerText = challenge.hint;
  if (code) code.innerText = challenge.code;

  if (copyBtn) {
    copyBtn.onclick = () => {
      audio.playClick();
      navigator.clipboard.writeText(challenge.code).then(() => {
        copyBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">check</span> Copied!`;
        setTimeout(() => {
          copyBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span> Copy Code`;
        }, 2000);
      });
    };
  }

  // Render Knowledge Check MCQ
  const mcqQuestion = document.getElementById('mcq-question');
  const mcqOptionsContainer = document.getElementById('mcq-options');

  if (mcqQuestion) mcqQuestion.innerText = challenge.mcq.question;
  if (mcqOptionsContainer) {
    mcqOptionsContainer.innerHTML = '';
    challenge.mcq.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = "flex items-center gap-5 p-5 rounded-2xl border border-outline-variant bg-surface-container hover:border-secondary transition-all text-left group w-full";
      btn.innerHTML = `
        <div class="size-8 rounded-full border-2 border-outline group-hover:border-secondary flex items-center justify-center text-sm font-black transition-all flex-shrink-0">
          ${String.fromCharCode(65 + idx)}
        </div>
        <span class="text-on-surface-variant font-bold group-hover:text-white transition-colors">${opt}</span>
      `;
      btn.onclick = () => handleMCQ(idx, challenge.mcq.correct, btn);
      mcqOptionsContainer.appendChild(btn);
    });
  }
}

function handleMCQ(selectedIndex: number, correctIndex: number, clickedBtn: HTMLButtonElement) {
  if (state.mcqAnswered) return;
  state.mcqAnswered = true;

  const isCorrect = selectedIndex === correctIndex;

  if (isCorrect) audio.playSuccess();
  else audio.playError();

  // Update answer record
  if (state.answers[state.currentChallengeIndex]) {
    state.answers[state.currentChallengeIndex].mcqCorrect = isCorrect;
    state.answers[state.currentChallengeIndex].selectedMCQIndex = selectedIndex;
  }

  // Update MCQ options styling
  const options = document.querySelectorAll('#mcq-options button');
  options.forEach((opt, idx) => {
    (opt as HTMLButtonElement).disabled = true;
    if (idx === correctIndex) {
      opt.className = "flex items-center gap-5 p-5 rounded-2xl border-2 border-secondary bg-secondary/10 text-left scale-[1.01] shadow-glow-secondary text-white font-bold w-full";
    } else if (idx === selectedIndex && !isCorrect) {
      opt.className = "flex items-center gap-5 p-5 rounded-2xl border-2 border-error bg-error-container/10 text-left opacity-80 text-error font-bold w-full";
    } else {
      opt.classList.add('opacity-40');
    }
  });

  if (isCorrect) addXP(50);

  // Reveal Next Challenge / Complete Button
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    if (state.currentChallengeIndex === DSA_DATA.length - 1) {
      nextBtn.innerText = "Complete Course & View Results";
    } else {
      nextBtn.innerText = "Complete Challenge & Next";
    }
    nextBtn.onclick = () => {
      audio.playNav();
      state.currentChallengeIndex++;
      renderRoadmap();
      renderChallenge();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }
}

function addXP(amount: number) {
  state.xp += amount;
  updateXPDisplay();
}

function updateXPDisplay() {
  const xpValElems = document.querySelectorAll('.xp-counter-val');
  xpValElems.forEach(el => {
    (el as HTMLElement).innerText = `${state.xp}`;
  });

  const xpCounter = document.getElementById('xp-counter');
  const xpWrapper = document.getElementById('xp-display-wrapper');
  if (xpCounter) xpCounter.innerText = `${state.xp}`;
  if (xpWrapper) {
    xpWrapper.classList.add('scale-105', 'border-primary');
    setTimeout(() => {
      xpWrapper.classList.remove('scale-105', 'border-primary');
    }, 600);
  }
}

// --- Results View Rendering (Hidden until all 5 topics completed!) ---
function renderResultsView() {
  const totalScore = calculateCurrentScore(); // Score out of 10
  const totalXP = state.xp;
  const accuracyPct = Math.round((totalScore / 10) * 100);

  // Populate overall score numbers
  const totalScoreElem = document.getElementById('results-total-score');
  const totalXPElem = document.getElementById('results-total-xp');
  const accuracyElem = document.getElementById('results-accuracy');

  if (totalScoreElem) totalScoreElem.innerText = `${totalScore} / 10`;
  if (totalXPElem) totalXPElem.innerText = `${totalXP} XP`;
  if (accuracyElem) accuracyElem.innerText = `${accuracyPct}%`;

  // Update Coder Congratulations Card
  const congratsTitle = document.getElementById('results-congrats-title');
  const congratsMsg = document.getElementById('results-congrats-msg');
  const gradeBadge = document.getElementById('results-grade-badge');

  if (congratsTitle) congratsTitle.innerText = `Congratulations, ${state.userName}!`;
  if (gradeBadge) {
    gradeBadge.innerText = totalScore >= 9 ? "Gold Mastery Tier" : (totalScore >= 6 ? "Silver Competency Tier" : "Developing Coder Tier");
  }
  if (congratsMsg) {
    if (totalScore >= 9) {
      congratsMsg.innerText = "🎉 Exceptional algorithmic mastery! You demonstrated outstanding pattern recognition and complexity evaluation across all 5 core domains.";
    } else if (totalScore >= 6) {
      congratsMsg.innerText = "👏 Solid job, Coder! You have built a strong problem-solving foundation in data structures and algorithm patterns.";
    } else {
      congratsMsg.innerText = "💪 Great start, Coder! You've taken important strides toward mastering blind pattern prediction. Review the recommendations below to level up.";
    }
  }

  // Bind Open Email Draft Modal Button
  const openEmailModalBtn = document.getElementById('open-email-modal-btn');
  if (openEmailModalBtn) {
    openEmailModalBtn.onclick = () => {
      openEmailModal(totalScore, totalXP);
    };
  }

  // Render Scope for Improvement recommendations
  renderScopeForImprovement(totalScore);

  // Render Real Calculated Bar Chart from Actual Answers
  renderBarChart();

  // Find lowest scoring topic for Focus Area Recommendation
  renderFocusArea();

  // Render Certificate
  renderCertificate(totalScore, totalXP);

  // Bind Restart Button
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.onclick = () => {
      audio.playNav();
      resetSession();
    };
  }
}

function renderScopeForImprovement(totalScore: number) {
  const container = document.getElementById('scope-recommendations-list');
  if (!container) return;
  container.innerHTML = '';

  const topicScores = DSA_DATA.map((data, idx) => {
    const ans = state.answers[idx] || { predictCorrect: false, mcqCorrect: false };
    const score = (ans.predictCorrect ? 1 : 0) + (ans.mcqCorrect ? 1 : 0);
    return { data, ans, score };
  });

  const weakTopics = topicScores.filter(t => t.score < 2);

  if (weakTopics.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-5 rounded-2xl bg-secondary/10 border border-secondary/30 text-secondary flex flex-col gap-2">
        <div class="flex items-center gap-2 font-bold text-sm text-white">
          <span class="material-symbols-outlined text-secondary">verified</span>
          100% Mastery Achieved! Next Advanced Focus:
        </div>
        <p class="text-xs text-on-surface-variant leading-relaxed">
          Outstanding work! You answered every prediction and MCQ correctly. To push your algorithms knowledge further:
        </p>
        <ul class="text-xs text-on-surface space-y-1 list-disc list-inside pt-1 font-medium">
          <li>Practice Monotonic Stack & Queue applications for range max query optimization.</li>
          <li>Study state space reduction techniques in Dynamic Programming memoization tables.</li>
          <li>Implement Graph BFS/DFS for cycle detection and shortest path in weighted graphs.</li>
        </ul>
      </div>
    `;
    return;
  }

  weakTopics.forEach(({ data, ans, score }) => {
    let specificTip = "";
    if (!ans.predictCorrect && !ans.mcqCorrect) {
      specificTip = `Re-examine the core mechanism of ${data.topic}. Key trigger to look for: "${data.hint}". Common pitfall: ${data.mistake}`;
    } else if (!ans.predictCorrect) {
      specificTip = `Your theoretical knowledge on ${data.topic} is solid, but refine your initial pattern recognition when given problem statements. Clue: "${data.hint}"`;
    } else {
      specificTip = `Great job recognizing the ${data.topic} pattern! Review complexity and implementation nuances: ${data.explanation}`;
    }

    const card = document.createElement('div');
    card.className = "p-4 rounded-xl bg-surface-container-highest/60 border border-outline-variant flex flex-col gap-2";
    card.innerHTML = `
      <div class="flex justify-between items-center text-xs font-bold">
        <span class="text-white flex items-center gap-1.5">
          <span class="material-symbols-outlined text-primary" style="font-size: 16px;">lightbulb</span>
          ${data.topic}
        </span>
        <span class="text-[10px] px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary font-mono">
          Score: ${score}/2
        </span>
      </div>
      <p class="text-xs text-on-surface-variant leading-relaxed">
        ${specificTip}
      </p>
      <p class="text-[11px] italic text-outline mt-1 font-mono">
        Complexity: ${data.complexity.time} time | ${data.complexity.space} space
      </p>
    `;
    container.appendChild(card);
  });
}

function openEmailModal(totalScore: number, totalXP: number) {
  openModal('email');

  const recipientInput = document.getElementById('email-recipient-input') as HTMLInputElement;
  const subjectInput = document.getElementById('email-subject-input') as HTMLInputElement;
  const bodyTextarea = document.getElementById('email-body-textarea') as HTMLTextAreaElement;
  const sendMailtoBtn = document.getElementById('send-mailto-btn');
  const copyBtn = document.getElementById('copy-email-draft-btn');
  const copyBtnText = document.getElementById('copy-email-btn-text');

  const accuracyPct = Math.round((totalScore / 10) * 100);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const tier = totalScore >= 9 ? "Gold Mastery Tier" : (totalScore >= 6 ? "Silver Competency Tier" : "Developing Coder Tier");

  const topicLines = DSA_DATA.map((data, idx) => {
    const ans = state.answers[idx] || { predictCorrect: false, mcqCorrect: false };
    const score = (ans.predictCorrect ? 1 : 0) + (ans.mcqCorrect ? 1 : 0);
    return `• ${data.topic}: ${score}/2 (Predict: ${ans.predictCorrect ? '✓' : '✗'} | MCQ: ${ans.mcqCorrect ? '✓' : '✗'})`;
  }).join('\n');

  const recommendations = DSA_DATA.map((data, idx) => {
    const ans = state.answers[idx] || { predictCorrect: false, mcqCorrect: false };
    const score = (ans.predictCorrect ? 1 : 0) + (ans.mcqCorrect ? 1 : 0);
    if (score < 2) {
      return `• ${data.topic}: Clue to remember - "${data.hint}". Pitfall to avoid - ${data.mistake}`;
    }
    return null;
  }).filter(Boolean);

  const scopeMsg = recommendations.length > 0
    ? recommendations.join('\n')
    : "• Perfect Score Achieved! Recommended next step: Practice Monotonic Queue and Dynamic Programming optimizations.";

  if (recipientInput) recipientInput.value = state.userEmail;
  if (subjectInput) subjectInput.value = `[DSA Pattern Trainer Report] Candidate ${state.userName} - ${totalScore}/10 (${accuracyPct}%)`;

  const defaultBody = `Dear ${state.userName},

Congratulations on completing the 5-topic DSA Pattern Trainer evaluation curriculum!

=== PERFORMANCE SUMMARY ===
Candidate Full Name: ${state.userName}
Email Address: ${state.userEmail}
Evaluation Date: ${dateStr}
Final Real Score: ${totalScore} / 10 (${accuracyPct}%)
Total Earned XP: ${totalXP} XP
Performance Tier: ${tier}

=== TOPIC-BY-TOPIC BREAKDOWN ===
${topicLines}

=== SCOPE FOR IMPROVEMENT & RECOMMENDATIONS ===
${scopeMsg}

=== CERTIFICATE CREDENTIAL ===
Certificate Serial: CERT-DSA-2026-${Math.abs(state.userName.split('').reduce((a,c)=>a+c.charCodeAt(0),0)*137).toString(16).toUpperCase().padStart(4,'0')}
Verification Status: Verified Client-Side Certificate

Keep coding and refining your algorithmic pattern recognition!

Best regards,
DSA Pattern Trainer Automated Evaluation
`;

  if (bodyTextarea) bodyTextarea.value = defaultBody;

  if (sendMailtoBtn) {
    sendMailtoBtn.onclick = () => {
      audio.playClick();
      const rec = recipientInput?.value?.trim() || state.userEmail;
      const sub = subjectInput?.value?.trim() || "DSA Pattern Trainer Report";
      const body = bodyTextarea?.value || defaultBody;
      const mailtoUrl = `mailto:${encodeURIComponent(rec)}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, '_blank');
    };
  }

  if (copyBtn) {
    copyBtn.onclick = async () => {
      audio.playSuccess();
      const textToCopy = bodyTextarea?.value || defaultBody;
      try {
        await navigator.clipboard.writeText(textToCopy);
        if (copyBtnText) copyBtnText.innerText = "Copied to Clipboard!";
        setTimeout(() => {
          if (copyBtnText) copyBtnText.innerText = "Copy Draft Text";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy email draft", err);
      }
    };
  }
}

function renderBarChart() {
  const chartContainer = document.getElementById('results-bar-chart');
  if (!chartContainer) return;
  chartContainer.innerHTML = '';

  DSA_DATA.forEach((data, idx) => {
    const ans = state.answers[idx] || { predictCorrect: false, mcqCorrect: false };
    const topicScore = (ans.predictCorrect ? 1 : 0) + (ans.mcqCorrect ? 1 : 0); // Out of 2
    const pct = (topicScore / 2) * 100; // 0%, 50%, or 100%

    const colorClass = topicScore === 2 ? 'bg-secondary text-secondary' : (topicScore === 1 ? 'bg-primary text-primary' : 'bg-error text-error');
    const badgeBg = topicScore === 2 ? 'bg-secondary/10 border-secondary/30' : (topicScore === 1 ? 'bg-primary/10 border-primary/30' : 'bg-error/10 border-error/30');

    const row = document.createElement('div');
    row.className = "flex flex-col gap-2 p-4 rounded-xl bg-surface-container border border-outline-variant/40";
    row.innerHTML = `
      <div class="flex justify-between items-center text-sm font-bold">
        <span class="text-white flex items-center gap-2">
          <span class="size-2 rounded-full ${colorClass.split(' ')[0]}"></span>
          ${data.topic}
        </span>
        <div class="flex items-center gap-3">
          <span class="text-xs px-2.5 py-1 rounded-full border ${badgeBg} ${colorClass.split(' ')[1]}">
            Predict: ${ans.predictCorrect ? '✓' : '✗'} | MCQ: ${ans.mcqCorrect ? '✓' : '✗'}
          </span>
          <span class="text-white font-code-md">${topicScore} / 2</span>
        </div>
      </div>
      <div class="h-3 w-full bg-surface-container-lowest rounded-full overflow-hidden p-[1px]">
        <div class="h-full ${colorClass.split(' ')[0]} rounded-full transition-all duration-1000" style="width: ${pct}%;"></div>
      </div>
    `;
    chartContainer.appendChild(row);
  });
}

function renderFocusArea() {
  const focusAreaContainer = document.getElementById('results-focus-area');
  if (!focusAreaContainer) return;

  // Calculate scores per topic
  const topicScores = DSA_DATA.map((data, idx) => {
    const ans = state.answers[idx] || { predictCorrect: false, mcqCorrect: false };
    const score = (ans.predictCorrect ? 1 : 0) + (ans.mcqCorrect ? 1 : 0);
    return { topic: data.topic, score, hint: data.hint, explanation: data.explanation };
  });

  // Find lowest score
  const minScore = Math.min(...topicScores.map(t => t.score));
  const lowestTopics = topicScores.filter(t => t.score === minScore);
  const focusTopic = lowestTopics[0];

  if (minScore === 2) {
    focusAreaContainer.className = "p-6 rounded-2xl bg-secondary/10 border border-secondary/40 text-secondary";
    focusAreaContainer.innerHTML = `
      <div class="flex items-start gap-4">
        <span class="material-symbols-outlined text-secondary" style="font-size: 32px;">verified</span>
        <div>
          <h4 class="text-lg font-bold text-white mb-1">Mastery Achieved!</h4>
          <p class="text-sm opacity-90 leading-relaxed text-on-surface">
            Congratulations! You achieved a perfect score across all 5 DSA topics. You demonstrated complete proficiency in pattern recognition, complexity evaluation, and algorithm mechanics.
          </p>
        </div>
      </div>
    `;
  } else {
    focusAreaContainer.className = "p-6 rounded-2xl bg-primary/10 border border-primary/40 text-primary-fixed";
    focusAreaContainer.innerHTML = `
      <div class="flex items-start gap-4">
        <span class="material-symbols-outlined text-primary" style="font-size: 32px;">center_focus_strong</span>
        <div>
          <h4 class="text-xs font-black uppercase tracking-widest text-primary mb-1">Recommended Focus Area</h4>
          <h3 class="text-xl font-bold text-white mb-2">${focusTopic.topic} (Score: ${focusTopic.score}/2)</h3>
          <p class="text-sm opacity-90 leading-relaxed text-on-surface-variant mb-3">
            Focus on strengthening your identification skills for <strong>${focusTopic.topic}</strong>. Key clue to watch for: <em>"${focusTopic.hint}"</em>
          </p>
          <p class="text-xs italic text-outline">${focusTopic.explanation}</p>
        </div>
      </div>
    `;
  }
}

function renderCertificate(totalScore: number, totalXP: number) {
  const certNameInput = document.getElementById('cert-name-input') as HTMLInputElement;
  const certNameDisplay = document.getElementById('cert-name-display');
  const certDateDisplay = document.getElementById('cert-date-display');
  const certScoreDisplay = document.getElementById('cert-score-display');
  const certXPDisplay = document.getElementById('cert-xp-display');
  const certSerialDisplay = document.getElementById('cert-serial-display');
  const downloadPdfCertBtn = document.getElementById('download-pdf-cert-btn');
  const printCertBtn = document.getElementById('print-cert-btn');

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (certNameInput) {
    certNameInput.value = state.userName;
    certNameInput.oninput = (e) => {
      state.userName = (e.target as HTMLInputElement).value || "Candidate";
      if (certNameDisplay) certNameDisplay.innerText = state.userName;
    };
  }

  if (certNameDisplay) certNameDisplay.innerText = state.userName;
  if (certDateDisplay) certDateDisplay.innerText = todayFormatted;
  if (certScoreDisplay) certScoreDisplay.innerText = `${totalScore} / 10`;
  if (certXPDisplay) certXPDisplay.innerText = `${totalXP} XP`;
  if (certSerialDisplay) certSerialDisplay.innerText = `CERT-DSA-2026-${Math.abs(state.userName.split('').reduce((a,c)=>a+c.charCodeAt(0),0)*137).toString(16).toUpperCase().padStart(4,'0')}`;

  if (downloadPdfCertBtn) {
    downloadPdfCertBtn.onclick = () => {
      exportCertificateToPDF(totalScore, totalXP);
    };
  }

  if (printCertBtn) {
    printCertBtn.onclick = () => {
      printCertificatePopup(totalScore, totalXP);
    };
  }
}

async function exportCertificateToPDF(totalScore: number, totalXP: number) {
  audio.playSuccess();
  const downloadBtnText = document.getElementById('download-pdf-text');
  if (downloadBtnText) downloadBtnText.innerText = "Generating PDF...";

  const candidateName = state.userName || "Candidate";
  const certElem = document.getElementById('printable-certificate');

  if (!certElem) {
    printCertificatePopup(totalScore, totalXP);
    if (downloadBtnText) downloadBtnText.innerText = "Download PDF Certificate";
    return;
  }

  // Ensure latest certificate values are rendered
  const certNameDisplay = document.getElementById('cert-name-display');
  const certDateDisplay = document.getElementById('cert-date-display');
  const certScoreDisplay = document.getElementById('cert-score-display');
  const certXPDisplay = document.getElementById('cert-xp-display');
  const certSerialDisplay = document.getElementById('cert-serial-display');

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const serialNo = `CERT-DSA-2026-${Math.abs(candidateName.split('').reduce((a,c)=>a+c.charCodeAt(0),0)*137).toString(16).toUpperCase().padStart(4,'0')}`;

  if (certNameDisplay) certNameDisplay.innerText = candidateName;
  if (certDateDisplay) certDateDisplay.innerText = dateStr;
  if (certScoreDisplay) certScoreDisplay.innerText = `${totalScore} / 10`;
  if (certXPDisplay) certXPDisplay.innerText = `${totalXP} XP`;
  if (certSerialDisplay) certSerialDisplay.innerText = serialNo;

  // Temporarily apply print & export class to capture styles
  certElem.classList.add('pdf-export-mode');

  const html2pdf = (window as any).html2pdf;

  if (html2pdf) {
    const opt = {
      margin: [8, 8, 8, 8],
      filename: `DSA_Certificate_${candidateName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    try {
      await html2pdf().set(opt).from(certElem).save();
      if (downloadBtnText) downloadBtnText.innerText = "PDF Downloaded!";
    } catch (err) {
      console.error("html2pdf failed, falling back to print window", err);
      printCertificatePopup(totalScore, totalXP);
      if (downloadBtnText) downloadBtnText.innerText = "Download PDF Certificate";
    } finally {
      certElem.classList.remove('pdf-export-mode');
      setTimeout(() => {
        if (downloadBtnText) downloadBtnText.innerText = "Download PDF Certificate";
      }, 3000);
    }
  } else {
    certElem.classList.remove('pdf-export-mode');
    printCertificatePopup(totalScore, totalXP);
    if (downloadBtnText) downloadBtnText.innerText = "Download PDF Certificate";
  }
}

function printCertificatePopup(totalScore: number, totalXP: number) {
  audio.playClick();
  const candidateName = state.userName || "Candidate";
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const serialNo = `CERT-DSA-2026-${Math.abs(candidateName.split('').reduce((a,c)=>a+c.charCodeAt(0),0)*137).toString(16).toUpperCase().padStart(4,'0')}`;

  const printWin = window.open('', '_blank', 'width=950,height=650');
  if (printWin) {
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>DSA Certificate - ${candidateName}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #ffffff; color: #0f172a; margin: 0; padding: 2rem; display: flex; justify-content: center; }
          .cert-box { border: 6px double #d97706; padding: 3rem; border-radius: 1.5rem; text-align: center; max-width: 800px; width: 100%; background: #ffffff; }
          .title { font-size: 24px; font-weight: 900; color: #0f172a; margin: 1rem 0; letter-spacing: -0.5px; }
          .name { font-size: 32px; font-weight: 900; color: #b45309; border-bottom: 3px solid #f59e0b; display: inline-block; padding: 0.5rem 2rem; margin: 1rem 0; }
          .sub { color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; }
          .desc { color: #334155; font-size: 14px; max-width: 550px; margin: 1rem auto; line-height: 1.6; }
          .stats { display: flex; justify-content: space-around; border-top: 1px solid #e2e8f0; padding-top: 1.5rem; margin-top: 2rem; }
          .label { font-size: 10px; text-transform: uppercase; font-weight: 900; color: #64748b; }
          .val { font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 4px; }
        </style>
      </head>
      <body>
        <div class="cert-box">
          <div class="sub" style="color: #d97706; font-weight: 900;">DSA PATTERN TRAINER • VERIFIED CERTIFICATE</div>
          <div class="title">CERTIFICATE OF ALGORITHMIC PROFICIENCY</div>
          <div class="sub">This certifies that</div>
          <div class="name">${candidateName}</div>
          <div class="desc">has successfully completed the 5-topic blind pattern prediction curriculum, mastering problem identification, complexity trade-offs, and verification checks.</div>
          <div class="stats">
            <div><div class="label">Serial Number</div><div class="val" style="color:#d97706; font-family:monospace;">${serialNo}</div></div>
            <div><div class="label">Issue Date</div><div class="val">${dateStr}</div></div>
            <div><div class="label">Score Achieved</div><div class="val" style="color:#0d9488;">${totalScore} / 10</div></div>
            <div><div class="label">XP Credential</div><div class="val" style="color:#d97706;">${totalXP} XP</div></div>
          </div>
        </div>
        <script>
          setTimeout(() => { window.print(); }, 500);
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  } else {
    window.print();
  }
}

function resetSession() {
  state.currentChallengeIndex = 0;
  state.xp = 0; // Starts at 0 XP!
  state.totalScore = 0;
  state.answers = [];
  state.predictAnswered = false;
  state.mcqAnswered = false;

  updateXPDisplay();
  renderRoadmap();
  renderChallenge();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Boot application on DOM ready
document.addEventListener('DOMContentLoaded', init);

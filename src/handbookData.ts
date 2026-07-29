/**
 * DSA Pattern Handbook Data
 * Complete documentation for the 5 core DSA patterns.
 */

export interface KeywordInfo {
  word: string;
  explanation: string;
}

export interface SyntaxExample {
  title: string;
  description: string;
  code: string;
}

export interface InterviewProblem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  linkTitle: string;
}

export interface PatternHandbookDetail {
  id: number;
  name: string;
  difficulty: 'Beginner' | 'Intermediate';
  readTime: string;
  shortDescription: string;
  
  // 1. What is this Pattern?
  whatIsIt: string;

  // 2. Why is it Used?
  whyUsed: string;

  // 3. When Should You Use It?
  whenToUse: string[];

  // 4. Recognition Keywords
  keywords: KeywordInfo[];

  // 5. Recognition Tips
  recognitionTips: string[];

  // 6. Brute Force vs Optimized Approach
  bruteForceVsOptimized: {
    bruteForce: string;
    optimized: string;
  };

  // 7. Step-by-Step Algorithm
  stepByStepAlgorithm: string[];

  // 8. Java Syntax & APIs
  javaSyntax: SyntaxExample[];

  // 9. Complete Java Implementation
  completeJavaCode: string;

  // 10. Time and Space Complexity
  complexityComparison: {
    bruteTime: string;
    bruteSpace: string;
    optTime: string;
    optSpace: string;
    notes: string;
  };

  // 11. Visual Explanation
  visualExplanation: {
    diagramType: string;
    steps: { label: string; desc: string }[];
  };

  // 12. Real-World Applications
  realWorldApps: { domain: string; description: string }[];

  // 13. Common Interview Problems
  commonProblems: InterviewProblem[];

  // 14. Common Mistakes
  commonMistakes: string[];

  // 15. Interview Tips
  interviewTips: string[];

  // 16. Key Takeaways
  keyTakeaways: {
    whenToUse: string;
    whyItWorks: string;
    complexity: string;
    recognitionTrick: string;
  };
}

export interface SummaryComparisonRow {
  pattern: string;
  bestUsedFor: string;
  keywords: string;
  timeComp: string;
  spaceComp: string;
  difficulty: string;
}

export const HANDBOOK_PATTERNS: PatternHandbookDetail[] = [
  {
    id: 1,
    name: "Arrays & Hashing",
    difficulty: "Beginner",
    readTime: "5 min read",
    shortDescription: "Trade extra O(n) space for lightning-fast O(1) lookups to instantly verify element presence or count frequencies.",
    whatIsIt: "Arrays store elements sequentially in contiguous memory blocks, providing O(1) index access. Hashing maps keys to buckets using a hash function, allowing O(1) average constant-time insertions, deletions, and lookups.",
    whyUsed: "It eliminates brute-force nested loop searches O(n²) by keeping track of previously visited numbers, frequencies, or complement values in a single O(n) pass.",
    whenToUse: [
      "When you need to test whether an element (or its complement) was already encountered.",
      "When counting frequencies of characters or integers (Anagrams, Top K Frequent).",
      "When checking for duplicates or finding unique elements in unsorted collections."
    ],
    keywords: [
      { word: "HashMap", explanation: "Stores key-value pairs; ideal for counting frequencies or tracking index positions of complement values." },
      { word: "HashSet", explanation: "Stores unique elements; perfect for O(1) duplicate checks and existence validation." },
      { word: "Duplicate", explanation: "Signals set insertion or checking size difference between array and set." },
      { word: "Frequency", explanation: "Signals counting elements using `map.put(key, map.getOrDefault(key, 0) + 1)`." }
    ],
    recognitionTips: [
      "If the problem asks for pairs/complements without requiring sorted order, use a HashMap<Integer, Integer>.",
      "If you need to verify if elements are identical or anagrams, count character frequencies with a Map or array.",
      "If order doesn't matter and you need existence check in O(1), reach for a HashSet<Integer> or HashSet<String>."
    ],
    bruteForceVsOptimized: {
      bruteForce: "Brute Force: Check every possible pair using nested loops (i and j). Takes O(n²) time and O(1) auxiliary space.",
      optimized: "Optimized: Iterate once through the array, computing target - num[i], and check if it exists in a Map<Integer, Integer>. Takes O(n) time and O(n) space."
    },
    stepByStepAlgorithm: [
      "Initialize an empty `Map<Integer, Integer> map = new HashMap<>();` to store number-to-index mappings.",
      "Loop through each element `nums[i]` at index `i` in the array.",
      "Calculate required complement value `int complement = target - nums[i]`.",
      "If `map.containsKey(complement)`, return `new int[] { map.get(complement), i }`.",
      "Otherwise, insert `map.put(nums[i], i)` into the map.",
      "If loop completes without a match, return `new int[0]`."
    ],
    javaSyntax: [
      {
        title: "HashMap Frequency Counter",
        description: "Counting character or integer occurrences cleanly in Java 17.",
        code: "Map<Character, Integer> counts = new HashMap<>();\nfor (char c : str.toCharArray()) {\n    // Safely increment frequency count\n    counts.put(c, counts.getOrDefault(c, 0) + 1);\n}"
      },
      {
        title: "HashSet Duplicate Detector",
        description: "Instantly check if an array contains duplicates using generics.",
        code: "Set<Integer> seen = new HashSet<>();\nfor (int num : nums) {\n    // add() returns false if element already exists in set\n    if (!seen.add(num)) {\n        return true;\n    }\n}\nreturn false;"
      }
    ],
    completeJavaCode: `import java.util.HashMap;
import java.util.Map;

public class TwoSumSolution {
    public int[] twoSum(int[] nums, int target) {
        if (nums == null || nums.length < 2) {
            return new int[0];
        }

        // HashMap stores value -> array index mapping
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            // Check if complement has been seen previously
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }

            // Store current number and its index in map
            map.put(nums[i], i);
        }

        // Return empty array if no pair satisfies target
        return new int[0];
    }
}`,
    complexityComparison: {
      bruteTime: "O(n²)",
      bruteSpace: "O(1)",
      optTime: "O(n)",
      optSpace: "O(n)",
      notes: "Trading space complexity O(n) for dramatically reduced time complexity from quadratic to linear."
    },
    visualExplanation: {
      diagramType: "HashMap Lookup Flow",
      steps: [
        { label: "Step 1: Inspect 2", desc: "Target = 9. Needed = 7. Map is empty. Store map.put(2, 0)." },
        { label: "Step 2: Inspect 7", desc: "Target = 9. Needed = 2. Map contains 2 at index 0! Match found: [0, 1]." }
      ]
    },
    realWorldApps: [
      { domain: "Database Indexing", description: "B-Tree and Hash Indexes for instant primary key lookups." },
      { domain: "Search Systems", description: "Inverted indexes for word search in search engines like Google and Elasticsearch." },
      { domain: "Caching Systems", description: "Redis and Memcached key-value stores for sub-millisecond data retrieval." }
    ],
    commonProblems: [
      { title: "Two Sum", difficulty: "Easy", linkTitle: "LeetCode 1" },
      { title: "Contains Duplicate", difficulty: "Easy", linkTitle: "LeetCode 217" },
      { title: "Valid Anagram", difficulty: "Easy", linkTitle: "LeetCode 242" },
      { title: "Group Anagrams", difficulty: "Medium", linkTitle: "LeetCode 49" },
      { title: "Top K Frequent Elements", difficulty: "Medium", linkTitle: "LeetCode 347" }
    ],
    commonMistakes: [
      "Using the same element twice (e.g. adding index i to itself if num == complement).",
      "Forgetting to specify explicit generic types like Map<Integer, Integer> or Set<Character>.",
      "Assuming iteration order is preserved in HashMap (use LinkedHashMap if insertion order matters)."
    ],
    interviewTips: [
      "Always state the time-space tradeoff explicitly: 'I can solve this in O(n) time using O(n) extra space with a HashMap.'",
      "If the input alphabet is fixed (e.g. lowercase English letters), prefer an `int[26]` primitive array over a Map for lower memory overhead."
    ],
    keyTakeaways: {
      whenToUse: "Unsorted search, duplicate checks, frequency counts, complement pairs.",
      whyItWorks: "Hash functions map keys directly to memory buckets for O(1) amortized operations.",
      complexity: "Time: O(n) average | Space: O(n) extra memory.",
      recognitionTrick: "Look for 'pair adding to target', 'duplicates', or 'character counts'."
    }
  },
  {
    id: 2,
    name: "Two Pointers",
    difficulty: "Beginner",
    readTime: "6 min read",
    shortDescription: "Iterate from both ends toward the middle or at different speeds to solve searching/sorting problems in O(1) auxiliary space.",
    whatIsIt: "Two Pointers is a technique where two integer indices iterate across an array or string. They can move inward (converging from opposite ends) or in the same direction (fast and slow pointers).",
    whyUsed: "It avoids generating nested combinations or extra space allocations, reducing time complexity to linear O(n) while keeping space complexity strictly O(1).",
    whenToUse: [
      "When the input array or string is sorted (or can be sorted).",
      "When finding pairs, triplets, or sub-ranges that meet a specific target sum.",
      "When detecting cycles in linked lists or fast/slow pointer traversals (Floyd's algorithm)."
    ],
    keywords: [
      { word: "Sorted Array", explanation: "Indicates elements increase/decrease monotonically, allowing pointer direction decisions." },
      { word: "Pair Sum", explanation: "Adjust left or right pointer based on whether current sum is too small or too large." },
      { word: "Palindrome", explanation: "Compare characters from outer bounds moving inward toward center." },
      { word: "In-place", explanation: "Requirement to modify array without allocating new memory structures." }
    ],
    recognitionTips: [
      "If problem says 'Sorted Array' + 'Find Pair', immediately think Converging Two Pointers.",
      "If problem asks to reverse, compare symmetric bounds, or partition elements in-place, Two Pointers is the optimal tool.",
      "If detecting duplicate elements or cycles without modifying references, use Fast & Slow pointers."
    ],
    bruteForceVsOptimized: {
      bruteForce: "Brute Force: Check all pairs with two nested loops. Time complexity: O(n²), Space complexity: O(1).",
      optimized: "Optimized: Place left pointer at start (0) and right pointer at end (n-1). Move left rightward if sum < target; move right leftward if sum > target. Time complexity: O(n), Space: O(1)."
    },
    stepByStepAlgorithm: [
      "Initialize `left = 0` and `right = s.length() - 1`.",
      "Loop while `left < right`.",
      "Increment `left` while `s.charAt(left)` is non-alphanumeric.",
      "Decrement `right` while `s.charAt(right)` is non-alphanumeric.",
      "Compare `Character.toLowerCase(s.charAt(left))` and `Character.toLowerCase(s.charAt(right))`.",
      "If they don't match, return `false`. Otherwise, increment `left++` and decrement `right--`.",
      "If loop terminates without mismatch, return `true`."
    ],
    javaSyntax: [
      {
        title: "Converging Pointers Loop",
        description: "Standard template for searching sorted arrays or palindrome validation.",
        code: "int left = 0, right = nums.length - 1;\nwhile (left < right) {\n    int sum = nums[left] + nums[right];\n    if (sum == target) {\n        return new int[] { left, right };\n    } else if (sum < target) {\n        left++;\n    } else {\n        right--;\n    }\n}"
      },
      {
        title: "Fast & Slow Pointers (In-place Array Modification)",
        description: "Remove duplicate elements or zeros in O(1) space.",
        code: "int slow = 0;\nfor (int fast = 0; fast < nums.length; fast++) {\n    if (nums[fast] != 0) {\n        nums[slow++] = nums[fast];\n    }\n}"
      }
    ],
    completeJavaCode: `public class TwoPointerSolutions {
    public boolean isPalindrome(String s) {
        if (s == null) {
            return false;
        }

        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            // Skip non-alphanumeric characters from left
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            // Skip non-alphanumeric characters from right
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }

            // Compare case-insensitive characters
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}`,
    complexityComparison: {
      bruteTime: "O(n²)",
      bruteSpace: "O(1)",
      optTime: "O(n)",
      optSpace: "O(1)",
      notes: "Optimal O(1) space guarantee because pointers only store 32-bit integer indices."
    },
    visualExplanation: {
      diagramType: "Two Pointer Convergence",
      steps: [
        { label: "Pointers at Bounds", desc: "[1, 3, 4, 6, 8, 10], Target = 10. Left=1, Right=10. Sum=11 (Too high -> Right--)" },
        { label: "Adjust Right Pointer", desc: "Left=1, Right=8. Sum=9 (Too low -> Left++)" },
        { label: "Adjust Left Pointer", desc: "Left=3, Right=8. Sum=11 (Too high -> Right--)" },
        { label: "Match Found!", desc: "Left=4, Right=6. Sum=10 == Target! Indices found." }
      ]
    },
    realWorldApps: [
      { domain: "Audio Signal Processing", description: "Filtering noise and matching audio waveforms from boundaries." },
      { domain: "Memory Compaction", description: "Defragmenting memory blocks by swapping used and free blocks in operating system kernels." },
      { domain: "Data Deduplication", description: "Stream processing for removing duplicate consecutive logs." }
    ],
    commonProblems: [
      { title: "Valid Palindrome", difficulty: "Easy", linkTitle: "LeetCode 125" },
      { title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", linkTitle: "LeetCode 167" },
      { title: "3Sum", difficulty: "Medium", linkTitle: "LeetCode 15" },
      { title: "Container With Most Water", difficulty: "Medium", linkTitle: "LeetCode 11" },
      { title: "Trapping Rain Water", difficulty: "Hard", linkTitle: "LeetCode 42" }
    ],
    commonMistakes: [
      "Using Two Pointers on an UNSORTED array without sorting it first.",
      "Off-by-one errors in while condition (`left < right` vs `left <= right`).",
      "Forgetting to skip non-alphanumeric characters or duplicate triplets in 3Sum."
    ],
    interviewTips: [
      "In 3Sum or 4Sum, sort the array first O(n log n), then fix one number and use Two Pointers for the remaining two numbers.",
      "Be ready to explain why pointer moves are valid: 'Because the array is sorted, incrementing left strictly increases the sum.'"
    ],
    keyTakeaways: {
      whenToUse: "Sorted arrays, palindromes, pair sums, in-place array manipulation.",
      whyItWorks: "Leverages array order to eliminate bad combinations deterministically.",
      complexity: "Time: O(n) | Space: O(1) auxiliary.",
      recognitionTrick: "Keywords: 'Sorted', 'Pair', 'Palindrome', 'In-place'."
    }
  },
  {
    id: 3,
    name: "Sliding Window",
    difficulty: "Intermediate",
    readTime: "7 min read",
    shortDescription: "Maintain a dynamic or fixed contiguous sub-window over an array or string to process contiguous range problems in linear time.",
    whatIsIt: "Sliding Window maintains a contiguous subsegment of a string or array defined by `[left, right]`. As `right` expands the window, `left` shrinks it whenever a window condition (such as duplicate characters) is violated.",
    whyUsed: "Without Sliding Window, evaluating all substrings or subarrays takes O(N²) or O(N³). Sliding Window reuses previous state in O(1) time per step, ensuring linear O(N) execution.",
    whenToUse: [
      "When solving string problems asking for 'Longest substring without repeating characters'.",
      "When problem specifies 'contiguous subarray' or 'substring'.",
      "When finding minimum or maximum window length/sum satisfying a specific constraint."
    ],
    keywords: [
      { word: "Substring", explanation: "Contiguous sequence of characters within a string." },
      { word: "HashSet window", explanation: "Set<Character> used to track unique characters in current window range [left, right]." },
      { word: "Dynamic Window", explanation: "Window shrinks from left whenever duplicate character is detected." },
      { word: "Contiguous Range", explanation: "Sequential elements bounded between left and right pointers." }
    ],
    recognitionTips: [
      "If problem says 'Longest Substring Without Repeating Characters', use Variable Sliding Window + Set<Character>.",
      "If problem specifies a fixed window size K, expand right and subtract `arr[right - K]` when right >= K - 1.",
      "If problem says 'Shortest Subarray with Sum >= S', shrink window from left as long as constraint is met."
    ],
    bruteForceVsOptimized: {
      bruteForce: "Brute Force: Check all possible substrings with nested loops and verify character uniqueness for each. Takes O(N²) or O(N³) time.",
      optimized: "Optimized: Maintain a Set<Character> set and two pointers left and right. Shrink left whenever a duplicate is found. Takes O(N) time and O(min(N, M)) space."
    },
    stepByStepAlgorithm: [
      "Initialize `Set<Character> set = new HashSet<>();` to store unique characters in current window.",
      "Initialize `int left = 0;` and `int maxLength = 0;`.",
      "Loop `right` from `0` to `s.length() - 1` to expand the right boundary.",
      "While `set.contains(s.charAt(right))`, remove `s.charAt(left)` from `set` and increment `left++`.",
      "Add `s.charAt(right)` to `set`.",
      "Calculate window size `(right - left + 1)` and update `maxLength = Math.max(maxLength, right - left + 1)`.",
      "Return `maxLength`."
    ],
    javaSyntax: [
      {
        title: "Variable Window Template (Longest Substring without Repeats)",
        description: "Optimal Java 17 implementation using explicit generic types.",
        code: "Set<Character> set = new HashSet<>();\n\nint left = 0;\nint maxLength = 0;\n\nfor (int right = 0; right < s.length(); right++) {\n    while (set.contains(s.charAt(right))) {\n        set.remove(s.charAt(left++));\n    }\n    set.add(s.charAt(right));\n    maxLength = Math.max(maxLength, right - left + 1);\n}"
      },
      {
        title: "Fixed Window Template (Subarray of Size K)",
        description: "Standard template for rolling window of size K.",
        code: "int currentSum = 0, maxSum = Integer.MIN_VALUE;\nfor (int right = 0; right < nums.length; right++) {\n    currentSum += nums[right];\n    if (right >= k - 1) {\n        maxSum = Math.max(maxSum, currentSum);\n        currentSum -= nums[right - (k - 1)];\n    }\n}"
      }
    ],
    completeJavaCode: `import java.util.HashSet;
import java.util.Set;

public class SlidingWindowSolution {
    public int lengthOfLongestSubstring(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        // Set stores unique characters in the current window [left, right]
        Set<Character> set = new HashSet<>();

        int left = 0;
        int maxLength = 0;

        // Expand the right boundary of the window
        for (int right = 0; right < s.length(); right++) {
            // Shrink window from left if character at right is duplicate
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left++));
            }
            
            // Add current character to window set
            set.add(s.charAt(right));
            
            // Update maximum length found so far
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}`,
    complexityComparison: {
      bruteTime: "O(n²)",
      bruteSpace: "O(min(n, m))",
      optTime: "O(n)",
      optSpace: "O(min(n, m))",
      notes: "Each character enters the set once (right pointer) and leaves at most once (left pointer), guaranteeing 2n operations total = O(n)."
    },
    visualExplanation: {
      diagramType: "Window Shift with HashSet",
      steps: [
        { label: "Expand Window", desc: "s = 'abcabcbb'. right=0 ('a'). Set = ['a'], maxLength = 1." },
        { label: "Expand to 'c'", desc: "right=2 ('c'). Set = ['a', 'b', 'c'], maxLength = 3." },
        { label: "Duplicate Detected", desc: "right=3 ('a'). Set contains 'a'! Shrink left (remove 'a', left=1). Add 'a'. Set = ['b', 'c', 'a'], maxLength = 3." }
      ]
    },
    realWorldApps: [
      { domain: "Network Packet Analysis", description: "Calculating average throughput over rolling 5-second time windows." },
      { domain: "Financial Stock Tickers", description: "Computing moving averages (e.g. 50-day moving average) in trading platforms." },
      { domain: "Video Streaming Buffers", description: "Managing adaptive bitrate streaming buffer windows." }
    ],
    commonProblems: [
      { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", linkTitle: "LeetCode 3" },
      { title: "Minimum Size Subarray Sum", difficulty: "Medium", linkTitle: "LeetCode 209" },
      { title: "Permutation in String", difficulty: "Medium", linkTitle: "LeetCode 567" },
      { title: "Fruit Into Baskets", difficulty: "Medium", linkTitle: "LeetCode 904" },
      { title: "Sliding Window Maximum", difficulty: "Hard", linkTitle: "LeetCode 239" }
    ],
    commonMistakes: [
      "Shrinking the window using `if` instead of `while` when multiple elements need removal.",
      "Off-by-one errors when calculating window length (`right - left + 1` vs `right - left`).",
      "Forgetting to declare complete generic types like `Set<Character> set = new HashSet<>();`."
    ],
    interviewTips: [
      "Classify the problem immediately: 'Is the window size fixed K, or is it variable based on a target condition like uniqueness?'",
      "Explain the time complexity clearly: 'Even with the nested while loop, left and right pointers each move at most N times, yielding O(N) total time.'"
    ],
    keyTakeaways: {
      whenToUse: "Contiguous substrings, unique character ranges, sliding window maximum.",
      whyItWorks: "Reuses previous window computations by adding incoming element and removing outgoing element.",
      complexity: "Time: O(n) | Space: O(min(n, m)).",
      recognitionTrick: "Look for 'Longest substring without repeating characters' or 'contiguous window'."
    }
  },
  {
    id: 4,
    name: "Prefix Sum",
    difficulty: "Beginner",
    readTime: "5 min read",
    shortDescription: "Precompute cumulative totals in an auxiliary array or HashMap to answer range sum queries in constant O(1) time.",
    whatIsIt: "Prefix Sum creates a precomputed array or running total `prefix` where `prefix[i]` holds the sum of elements from index `0` up to `i`. Range sum from `L` to `R` is then computed as `prefix[R] - prefix[L-1]`.",
    whyUsed: "Evaluating range sums directly on an array takes O(N) time per query. For Q queries, brute force takes O(Q * N). Prefix Sum reduces Q queries to O(Q * 1) = O(Q) total time after O(N) precomputation.",
    whenToUse: [
      "When you need to answer multiple range sum queries on an array that doesn't change (static array).",
      "When finding subarrays with a specific target sum (Prefix Sum + Map<Integer, Integer> technique).",
      "When calculating cumulative counts or range updates (Difference Array)."
    ],
    keywords: [
      { word: "Range Query", explanation: "Question asking for sum or product between index L and R." },
      { word: "Running Sum", explanation: "Cumulative total built sequentially from start of array." },
      { word: "Subarray Sum Equals K", explanation: "Indicates using Map<Integer, Integer> storing prefixSum -> frequency." },
      { word: "Static Array", explanation: "Array that is not mutated between range queries." }
    ],
    recognitionTips: [
      "If the problem mentions 'Sum between index L and R multiple times', use Prefix Sum.",
      "If finding 'Subarrays with sum equal to K', use Prefix Sum + Map<Integer, Integer> (`map.containsKey(currentSum - K)`).",
      "If problem involves 2D grid sub-rectangle sums, use 2D Prefix Sum Matrix."
    ],
    bruteForceVsOptimized: {
      bruteForce: "Brute Force: Loop from index L to R for every query. Query time: O(N), Q queries = O(Q * N).",
      optimized: "Optimized: Precompute prefix array in O(N). Answer each range query `sum(L, R) = prefix[R] - prefix[L-1]` in O(1) time."
    },
    stepByStepAlgorithm: [
      "Initialize `Map<Integer, Integer> prefixMap = new HashMap<>();` to store prefix sums and their frequencies.",
      "Seed base case: `prefixMap.put(0, 1);` for subarrays starting at index 0.",
      "Initialize `int currentSum = 0;` and `int resultCount = 0;`.",
      "Loop through each `num` in `nums` array.",
      "Add `num` to `currentSum`.",
      "If `prefixMap.containsKey(currentSum - k)`, increment `resultCount += prefixMap.get(currentSum - k)`.",
      "Store/update current prefix sum: `prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1)`.",
      "Return `resultCount`."
    ],
    javaSyntax: [
      {
        title: "Prefix Array Construction (1-based Indexing)",
        description: "Adding dummy 0 at index 0 eliminates edge cases for L = 0.",
        code: "int[] prefix = new int[nums.length + 1];\nfor (int i = 0; i < nums.length; i++) {\n    prefix[i + 1] = prefix[i] + nums[i];\n}\n// Range sum [left, right] inclusive (0-based indexing):\nint rangeSum = prefix[right + 1] - prefix[left];"
      },
      {
        title: "Subarray Sum Equals K (Prefix + HashMap)",
        description: "Counts total subarrays whose elements sum up to K in O(N) time.",
        code: "Map<Integer, Integer> prefixMap = new HashMap<>();\nprefixMap.put(0, 1); // Base case for subarray starting at index 0\n\nint currentSum = 0;\nint count = 0;\n\nfor (int num : nums) {\n    currentSum += num;\n    if (prefixMap.containsKey(currentSum - k)) {\n        count += prefixMap.get(currentSum - k);\n    }\n    prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1);\n}"
      }
    ],
    completeJavaCode: `import java.util.HashMap;
import java.util.Map;

public class PrefixSumSolution {
    public int subarraySum(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        // Map stores prefixSum -> frequency of occurrence
        Map<Integer, Integer> prefixMap = new HashMap<>();
        prefixMap.put(0, 1); // Base case: prefix sum of 0 appears once before array starts

        int currentSum = 0;
        int resultCount = 0;

        for (int num : nums) {
            currentSum += num; // Calculate running cumulative sum

            // If (currentSum - k) exists in map, add its frequency
            if (prefixMap.containsKey(currentSum - k)) {
                resultCount += prefixMap.get(currentSum - k);
            }

            // Record or update frequency of current prefix sum
            prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1);
        }

        return resultCount;
    }
}`,
    complexityComparison: {
      bruteTime: "Precompute: O(0), Query: O(N)",
      bruteSpace: "O(1)",
      optTime: "Precompute: O(N), Query: O(1)",
      optSpace: "O(N)",
      notes: "O(N) precomputation pays off massively when answering thousands of queries in O(1) time."
    },
    visualExplanation: {
      diagramType: "Cumulative Array Mapping",
      steps: [
        { label: "Original Array", desc: "nums = [1, 2, 3, 4, 5]" },
        { label: "Prefix Array", desc: "prefix = [0, 1, 3, 6, 10, 15]" },
        { label: "Query Range [1, 3]", desc: "sum(nums[1..3]) = 2 + 3 + 4 = 9 -> prefix[4] - prefix[1] = 10 - 1 = 9!" }
      ]
    },
    realWorldApps: [
      { domain: "Financial Statement Auditing", description: "Quarterly and year-to-date cumulative revenue reporting." },
      { domain: "Image Processing", description: "Integral images (Summed-Area Tables) for instant box blur filters in computer vision." },
      { domain: "Telemetry Metrics", description: "Aggregating server requests per minute over continuous time intervals." }
    ],
    commonProblems: [
      { title: "Range Sum Query - Immutable", difficulty: "Easy", linkTitle: "LeetCode 303" },
      { title: "Find Pivot Index", difficulty: "Easy", linkTitle: "LeetCode 724" },
      { title: "Subarray Sum Equals K", difficulty: "Medium", linkTitle: "LeetCode 560" },
      { title: "Product of Array Except Self", difficulty: "Medium", linkTitle: "LeetCode 238" },
      { title: "Subarray Sums Divisible by K", difficulty: "Medium", linkTitle: "LeetCode 974" }
    ],
    commonMistakes: [
      "Forgetting to seed `prefixMap.put(0, 1)` when combining Prefix Sum with HashMap.",
      "Off-by-one errors in boundary queries when using 0-based indexing without dummy zero.",
      "Attempting to use Prefix Sum on arrays that undergo frequent element updates (use Binary Indexed Tree or Segment Tree instead)."
    ],
    interviewTips: [
      "Mention 1-based indexing prefix array trick (`size = N + 1`) to eliminate `if (L == 0)` boundary checks.",
      "If the problem includes negative numbers, Sliding Window fails, but Prefix Sum + Map<Integer, Integer> works perfectly!"
    ],
    keyTakeaways: {
      whenToUse: "Range sum queries, pivot index, cumulative counts, target subarray sum.",
      whyItWorks: "Converts range query into simple subtraction `prefix[R] - prefix[L-1]`.",
      complexity: "Precompute: O(N) | Query: O(1) | Space: O(N).",
      recognitionTrick: "Keywords: 'Range sum', 'Cumulative', 'Subarray sum equals K'."
    }
  },
  {
    id: 5,
    name: "Backtracking",
    difficulty: "Intermediate",
    readTime: "8 min read",
    shortDescription: "Recursively explore all possible decision paths, backtracking (undoing choices) whenever a path fails to meet constraints.",
    whatIsIt: "Backtracking is an algorithmic paradigm that builds candidates incrementally and abandons ('backtracks') a candidate as soon as it determines the candidate cannot lead to a valid solution.",
    whyUsed: "It systematically evaluates combinatorial search spaces (permutations, subsets, board games) faster than exhaustive generation by pruning invalid branches early.",
    whenToUse: [
      "When asked to 'Generate all permutations', 'Find all combinations', or 'Solve all valid configurations'.",
      "When solving constraint satisfaction problems (N-Queens, Sudoku, Word Search, Partition Equal Subset).",
      "When constructing paths through decision trees where choices must be undone."
    ],
    keywords: [
      { word: "Permutation", explanation: "All ordered arrangements of elements." },
      { word: "Combination", explanation: "All unordered selections of elements." },
      { word: "DFS / Recursion", explanation: "Depth-first search traversal through state space tree." },
      { word: "Backtrack Step", explanation: "Removing last added element from path state before next branch." }
    ],
    recognitionTips: [
      "If prompt asks 'Find ALL possible solutions' or 'Generate ALL subsets/permutations', think Backtracking.",
      "Look for constraint-driven board problems (Sudoku, N-Queens, Grid Word Search).",
      "If input size N is very small (N <= 15 or N <= 20), it hints at exponential N! or 2^N backtracking."
    ],
    bruteForceVsOptimized: {
      bruteForce: "Brute Force: Generate all possible combinations without checking constraints, testing validity at the very end. Time: O(N^N).",
      optimized: "Optimized: Backtrack immediately as soon as a partial solution violates constraints (Pruning). Drastically reduces visited states."
    },
    stepByStepAlgorithm: [
      "Define recursive `backtrack(nums, current, result)` helper function with explicit generics `List<Integer>` and `List<List<Integer>>`.",
      "Base Case: If `current.size() == nums.length`, create deep copy `result.add(new ArrayList<>(current))` and return.",
      "Loop through each candidate `num` in `nums`.",
      "If `current.contains(num)`, skip (constraint check).",
      "Step 1 (Make Choice): `current.add(num)`.",
      "Step 2 (Explore): `backtrack(nums, current, result)`.",
      "Step 3 (Backtrack / Undo Choice): `current.remove(current.size() - 1)`."
    ],
    javaSyntax: [
      {
        title: "Standard Backtracking Template (Permutations)",
        description: "Universal boilerplate for permutations using explicit generics.",
        code: "private void backtrack(int[] nums, List<Integer> current, List<List<Integer>> result) {\n    if (current.size() == nums.length) {\n        result.add(new ArrayList<>(current)); // Deep copy required!\n        return;\n    }\n    for (int i = 0; i < nums.length; i++) {\n        if (current.contains(nums[i])) continue;\n        current.add(nums[i]);                  // 1. Make choice\n        backtrack(nums, current, result);      // 2. Recurse path\n        current.remove(current.size() - 1);    // 3. Undo choice (Backtrack)\n    }\n}"
      },
      {
        title: "Subsets / Combinations Template",
        description: "Using start index to generate combinations without duplicates.",
        code: "private void backtrack(int start, int[] nums, List<Integer> current, List<List<Integer>> result) {\n    result.add(new ArrayList<>(current)); // Deep copy current subset\n    for (int i = start; i < nums.length; i++) {\n        current.add(nums[i]);                    // 1. Choose\n        backtrack(i + 1, nums, current, result); // 2. Recurse next index\n        current.remove(current.size() - 1);      // 3. Undo choice\n    }\n}"
      }
    ],
    completeJavaCode: `import java.util.ArrayList;
import java.util.List;

public class BacktrackingSolution {
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
        // Base Case: complete permutation constructed
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current)); // Deep copy to prevent state corruption
            return;
        }

        for (int num : nums) {
            // Constraint check: skip if number is already in current path
            if (current.contains(num)) {
                continue;
            }

            // Step 1: Choose
            current.add(num);

            // Step 2: Recurse
            backtrack(nums, current, result);

            // Step 3: Undo Choice (Backtrack)
            current.remove(current.size() - 1);
        }
    }
}`,
    complexityComparison: {
      bruteTime: "O(N^N)",
      bruteSpace: "O(N)",
      optTime: "O(N!) for Permutations | O(2^N) for Subsets",
      optSpace: "O(N) recursion stack height",
      notes: "Early constraint pruning prevents exploring dead-end subtrees, keeping execution fast."
    },
    visualExplanation: {
      diagramType: "Decision State Tree",
      steps: [
        { label: "Root Level []", desc: "Choices available: [1, 2, 3]" },
        { label: "Branch 1 -> [1]", desc: "Remaining choices: [2, 3] -> Recurse to [1, 2] and [1, 3]" },
        { label: "Leaf Level -> [1, 2, 3]", desc: "Full permutation built! Add copy to results. Backtrack to [1, 2], then [1]." }
      ]
    },
    realWorldApps: [
      { domain: "AI Game Engines", description: "Minimax and alpha-beta pruning for Chess and Go moves." },
      { domain: "Automated Timetable Scheduling", description: "Solving course/exam schedules satisfying room and time constraints." },
      { domain: "Circuit Routing & EDA", description: "Printed circuit board (PCB) component trace auto-routing." }
    ],
    commonProblems: [
      { title: "Subsets", difficulty: "Medium", linkTitle: "LeetCode 78" },
      { title: "Permutations", difficulty: "Medium", linkTitle: "LeetCode 46" },
      { title: "Combination Sum", difficulty: "Medium", linkTitle: "LeetCode 39" },
      { title: "Word Search", difficulty: "Medium", linkTitle: "LeetCode 79" },
      { title: "N-Queens", difficulty: "Hard", linkTitle: "LeetCode 51" }
    ],
    commonMistakes: [
      "Adding `current` directly as `result.add(current)` instead of creating a deep copy `result.add(new ArrayList<>(current))`. Since Java passes object references, all entries become empty when backtracking completes!",
      "Forgetting the undo choice step `current.remove(current.size() - 1)`.",
      "Omitting explicit generic type declarations such as `List<Integer>` or `List<List<Integer>>`."
    ],
    interviewTips: [
      "Always highlight the 3 essential steps of backtracking: 1. Choose, 2. Recurse, 3. Unchoose (Backtrack).",
      "Emphasize deep copying: 'I am creating a new ArrayList copy before adding to the result list so state modification during backtracking doesn't corrupt previous answers.'"
    ],
    keyTakeaways: {
      whenToUse: "Generate all permutations, combinations, subsets, Sudoku, N-Queens.",
      whyItWorks: "Explores decision tree with DFS and prunes invalid paths early.",
      complexity: "Time: O(N!) or O(2^N) | Space: O(N) recursion stack.",
      recognitionTrick: "Keywords: 'Generate all', 'Find all valid combinations', 'N <= 15'."
    }
  }
];

export const SUMMARY_COMPARISON_TABLE: SummaryComparisonRow[] = [
  {
    pattern: "Arrays & Hashing",
    bestUsedFor: "Instant O(1) duplicate checks, frequency counting, complement lookups.",
    keywords: "HashMap, HashSet, Duplicate, Frequency, Complement",
    timeComp: "O(n) average",
    spaceComp: "O(n)",
    difficulty: "Beginner"
  },
  {
    pattern: "Two Pointers",
    bestUsedFor: "Searching sorted arrays, palindromes, pair sums in O(1) space.",
    keywords: "Sorted Array, Pair Sum, Palindrome, In-place, Converging",
    timeComp: "O(n)",
    spaceComp: "O(1)",
    difficulty: "Beginner"
  },
  {
    pattern: "Sliding Window",
    bestUsedFor: "Contiguous subarrays or substrings, fixed size K or min/max bounds.",
    keywords: "Contiguous, Subarray, Substring, Window size K, Min/Max length",
    timeComp: "O(n)",
    spaceComp: "O(1) / O(k)",
    difficulty: "Intermediate"
  },
  {
    pattern: "Prefix Sum",
    bestUsedFor: "Static range sum queries, cumulative totals, subarray sum equals K.",
    keywords: "Range Query, Running Sum, Cumulative, Subarray Sum K",
    timeComp: "Precompute: O(N) | Query: O(1)",
    spaceComp: "O(N)",
    difficulty: "Beginner"
  },
  {
    pattern: "Backtracking",
    bestUsedFor: "Generating all combinations, permutations, subsets, board games.",
    keywords: "Permutations, Combinations, Subsets, DFS, Recursion, Undo Choice",
    timeComp: "O(N!) / O(2^N)",
    spaceComp: "O(N) recursion stack",
    difficulty: "Intermediate"
  }
];

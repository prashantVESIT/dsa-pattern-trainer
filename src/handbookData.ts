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
      "If the problem asks for pairs/complements without requiring sorted order, use a HashMap.",
      "If you need to verify if elements are identical or anagrams, count character frequencies.",
      "If order doesn't matter and you need existence check in O(1), reach for HashSet."
    ],
    bruteForceVsOptimized: {
      bruteForce: "Brute Force: Check every possible pair using nested loops (i and j). Takes O(n²) time and O(1) auxiliary space.",
      optimized: "Optimized: Iterate once through the array, computing target - num[i], and check if it exists in a HashMap. Takes O(n) time and O(n) space."
    },
    stepByStepAlgorithm: [
      "Initialize an empty HashMap (or array of size 26 for ASCII characters).",
      "Loop through each element `x` at index `i` in the array.",
      "Calculate required value `needed = target - x`.",
      "If `map.containsKey(needed)`, return `new int[]{map.get(needed), i}`.",
      "Otherwise, insert `map.put(x, i)` into the map.",
      "If loop finishes with no match, return empty or handle no-solution case."
    ],
    javaSyntax: [
      {
        title: "HashMap Frequency Counter",
        description: "Counting character or integer occurrences cleanly in Java.",
        code: "Map<Character, Integer> counts = new HashMap<>();\nfor (char c : str.toCharArray()) {\n    counts.put(c, counts.getOrDefault(c, 0) + 1);\n}"
      },
      {
        title: "HashSet Duplicate Detector",
        description: "Instantly check if an array contains duplicates.",
        code: "Set<Integer> seen = new HashSet<>();\nfor (int num : nums) {\n    if (!seen.add(num)) return true; // add returns false if element exists\n}"
      }
    ],
    completeJavaCode: `import java.util.HashMap;\nimport java.util.Map;\n\npublic class TwoSumSolution {\n    public int[] twoSum(int[] nums, int target) {\n        // Map stores value -> index\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        throw new IllegalArgumentException("No two sum solution found");\n    }\n}`,
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
        { label: "Step 1: Inspect 2", desc: "Target = 9. Needed = 7. HashMap is empty. Store map[2] = 0." },
        { label: "Step 2: Inspect 7", desc: "Target = 9. Needed = 2. HashMap contains 2 at index 0! Match found: [0, 1]." }
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
      "Forgetting to handle hash collisions or assuming iteration order is preserved in HashMap (use LinkedHashMap if needed).",
      "Creating unnecessary objects inside tight loops instead of reusing map instances."
    ],
    interviewTips: [
      "Always state the time-space tradeoff explicitly to your interviewer: 'I can solve this in O(n) time using O(n) extra space with a HashMap.'",
      "If the input alphabet is fixed (e.g. lowercase English letters), prefer an `int[26]` primitive array over a HashMap for O(1) memory overhead."
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
      "Set `left = 0` and `right = nums.length - 1`.",
      "Loop while `left < right`.",
      "Calculate `currentSum = nums[left] + nums[right]`.",
      "If `currentSum == target`, return `[left + 1, right + 1]` (or target indices).",
      "If `currentSum < target`, increment `left++` to increase sum.",
      "If `currentSum > target`, decrement `right--` to decrease sum.",
      "Return empty if pointers cross without match."
    ],
    javaSyntax: [
      {
        title: "Converging Pointers Loop",
        description: "Standard layout for searching sorted arrays or palindrome validation.",
        code: "int left = 0, right = nums.length - 1;\nwhile (left < right) {\n    int sum = nums[left] + nums[right];\n    if (sum == target) return true;\n    else if (sum < target) left++;\n    else right--;\n}"
      },
      {
        title: "Fast & Slow Pointers (In-place Swap)",
        description: "Remove duplicates or move zeros in-place.",
        code: "int slow = 0;\nfor (int fast = 0; fast < nums.length; fast++) {\n    if (nums[fast] != 0) {\n        nums[slow++] = nums[fast];\n    }\n}"
      }
    ],
    completeJavaCode: `public class TwoPointerSolutions {\n    public boolean isPalindrome(String s) {\n        int left = 0, right = s.length() - 1;\n        while (left < right) {\n            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n        return true;\n    }\n}`,
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
    shortDescription: "Maintain a dynamic or fixed contiguous sub-window over an array to process contiguous range problems in linear time.",
    whatIsIt: "Sliding Window maintains a contiguous subsegment of an array or string defined by `[left, right]`. As the right boundary expands, the left boundary shrinks to preserve window conditions.",
    whyUsed: "Without Sliding Window, evaluating all subarrays of size k takes O(n * k) or O(n²). Sliding Window reuses previous calculations by subtracting the outgoing element and adding the incoming element in O(1) per step.",
    whenToUse: [
      "When the problem specifies 'contiguous subarray' or 'substring'.",
      "When looking for min/max length or sum satisfying a condition (e.g. max sum subarray of size K).",
      "When string problem asks for 'longest substring with at most K distinct characters'."
    ],
    keywords: [
      { word: "Subarray", explanation: "Contiguous segment of array elements." },
      { word: "Substring", explanation: "Contiguous sequence of characters within string." },
      { word: "Window", explanation: "Bounded range [L, R] that slides incrementally across the dataset." },
      { word: "Maximum/Minimum", explanation: "Target constraint that governs when the window expands or contracts." }
    ],
    recognitionTips: [
      "If problem says 'Contiguous Subarray of Size K', think Fixed Sliding Window.",
      "If problem says 'Shortest Subarray with Sum >= S', think Variable Sliding Window.",
      "If problem says 'Longest Substring Without Repeating Characters', think Variable Sliding Window + HashSet/HashMap."
    ],
    bruteForceVsOptimized: {
      bruteForce: "Brute Force: Recompute sum/state for every subarray starting at index i. Time: O(n * k) or O(n²).",
      optimized: "Optimized: Slide window by 1 element. Add `arr[right]` to current sum, subtract `arr[left]` from current sum. Time: O(n), Space: O(1) or O(K)."
    },
    stepByStepAlgorithm: [
      "Initialize `left = 0`, `currentSum = 0`, `maxSum = MIN_VALUE`.",
      "Loop `right` from `0` to `n - 1`.",
      "Add `nums[right]` to `currentSum`.",
      "If window size `(right - left + 1) == k` (fixed window):",
      "  Update `maxSum = Math.max(maxSum, currentSum)`.",
      "  Subtract `nums[left]` from `currentSum` and increment `left++`.",
      "Return `maxSum`."
    ],
    javaSyntax: [
      {
        title: "Fixed Window Template",
        description: "Optimal template for window of size K.",
        code: "int currentSum = 0, maxSum = Integer.MIN_VALUE;\nfor (int right = 0; right < nums.length; right++) {\n    currentSum += nums[right];\n    if (right >= k - 1) {\n        maxSum = Math.max(maxSum, currentSum);\n        currentSum -= nums[right - (k - 1)];\n    }\n}"
      },
      {
        title: "Variable Window Template (String)",
        description: "Longest substring without repeating characters.",
        code: "Set<Character> set = new HashSet<>();\nint left = 0, maxLength = 0;\nfor (int right = 0; right < s.length(); right++) {\n    while (set.contains(s.charAt(right))) {\n        set.remove(s.charAt(left++));\n    }\n    set.add(s.charAt(right));\n    maxLength = Math.max(maxLength, right - left + 1);\n}"
      }
    ],
    completeJavaCode: `public class SlidingWindowSolution {\n    public int maxSubArraySum(int[] nums, int k) {\n        if (nums == null || nums.length < k) return 0;\n        int windowSum = 0;\n        for (int i = 0; i < k; i++) {\n            windowSum += nums[i];\n        }\n        int maxSum = windowSum;\n        for (int right = k; right < nums.length; right++) {\n            windowSum += nums[right] - nums[right - k];\n            maxSum = Math.max(maxSum, windowSum);\n        }\n        return maxSum;\n    }\n}`,
    complexityComparison: {
      bruteTime: "O(n * k)",
      bruteSpace: "O(1)",
      optTime: "O(n)",
      optSpace: "O(1)",
      notes: "Each element enters the window once (right) and leaves at most once (left), guaranteeing 2n operations total = O(n)."
    },
    visualExplanation: {
      diagramType: "Window Shift",
      steps: [
        { label: "Window [0..2] k=3", desc: "[2, 1, 5, 1, 3, 2] -> Sum = 2+1+5 = 8. Max = 8." },
        { label: "Slide Right to [1..3]", desc: "Subtract 2, Add 1 -> Sum = 8 - 2 + 1 = 7. Max = 8." },
        { label: "Slide Right to [2..4]", desc: "Subtract 1, Add 3 -> Sum = 7 - 1 + 3 = 9. Max = 9!" }
      ]
    },
    realWorldApps: [
      { domain: "Network Packet Analysis", description: "Calculating average throughput over rolling 5-second time windows." },
      { domain: "Financial Stock Tickers", description: "Computing moving averages (e.g. 50-day moving average) in trading platforms." },
      { domain: "Video Streaming Buffers", description: "Managing adaptive bitrate streaming buffer windows." }
    ],
    commonProblems: [
      { title: "Maximum Sum Subarray of Size K", difficulty: "Easy", linkTitle: "GfK Practice" },
      { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", linkTitle: "LeetCode 3" },
      { title: "Minimum Size Subarray Sum", difficulty: "Medium", linkTitle: "LeetCode 209" },
      { title: "Permutation in String", difficulty: "Medium", linkTitle: "LeetCode 567" },
      { title: "Sliding Window Maximum", difficulty: "Hard", linkTitle: "LeetCode 239" }
    ],
    commonMistakes: [
      "Shrinking the window using `if` instead of `while` in variable window problems.",
      "Off-by-one errors when calculating window length (`right - left + 1` vs `right - left`).",
      "Forgetting to update global result BEFORE shrinking the window when expanding."
    ],
    interviewTips: [
      "Classify the problem immediately: 'Is the window size fixed K, or is it variable based on a target condition?'",
      "For Sliding Window Maximum (Hard), mention using a `Deque` to store indices of potential max elements in decreasing order."
    ],
    keyTakeaways: {
      whenToUse: "Contiguous subarrays, substrings, moving averages, min/max window range.",
      whyItWorks: "Reuses previous window computations by adding incoming element and removing outgoing element.",
      complexity: "Time: O(n) | Space: O(1) or O(K).",
      recognitionTrick: "Look for 'contiguous', 'subarray', 'substring', or 'window size K'."
    }
  },
  {
    id: 4,
    name: "Prefix Sum",
    difficulty: "Beginner",
    readTime: "5 min read",
    shortDescription: "Precompute cumulative totals in an auxiliary array to answer range sum queries in constant O(1) time.",
    whatIsIt: "Prefix Sum creates a precomputed array `prefix` where `prefix[i]` holds the sum of elements from index `0` up to `i`. Range sum from `L` to `R` is then computed as `prefix[R] - prefix[L-1]`.",
    whyUsed: "Evaluating range sums directly on an array takes O(N) time per query. For Q queries, brute force takes O(Q * N). Prefix Sum reduces Q queries to O(Q * 1) = O(Q) total time after O(N) precomputation.",
    whenToUse: [
      "When you need to answer multiple range sum queries on an array that doesn't change (static array).",
      "When finding subarrays with a specific target sum (Prefix Sum + HashMap technique).",
      "When calculating cumulative counts or range updates (Difference Array)."
    ],
    keywords: [
      { word: "Range Query", explanation: "Question asking for sum or product between index L and R." },
      { word: "Running Sum", explanation: "Cumulative total built sequentially from start of array." },
      { word: "Subarray Sum Equals K", explanation: "Indicates using HashMap storing prefixSum -> frequency." },
      { word: "Static Array", explanation: "Array that is not mutated between range queries." }
    ],
    recognitionTips: [
      "If the problem mentions 'Sum between index L and R multiple times', use Prefix Sum.",
      "If finding 'Subarrays with sum equal to K', use Prefix Sum + HashMap (`map.containsKey(currentSum - K)`).",
      "If problem involves 2D grid sub-rectangle sums, use 2D Prefix Sum Matrix."
    ],
    bruteForceVsOptimized: {
      bruteForce: "Brute Force: Loop from index L to R for every query. Query time: O(N), Q queries = O(Q * N).",
      optimized: "Optimized: Precompute prefix array in O(N). Answer each range query `sum(L, R) = prefix[R] - prefix[L-1]` in O(1) time."
    },
    stepByStepAlgorithm: [
      "Create array `prefix` of size `N` (or `N + 1` with 1-based indexing for cleaner bounds).",
      "Set `prefix[0] = nums[0]`.",
      "For `i = 1` to `N - 1`: `prefix[i] = prefix[i - 1] + nums[i]`.",
      "To answer query for range `[L, R]`:",
      "  If `L == 0`, return `prefix[R]`.",
      "  Else return `prefix[R] - prefix[L - 1]`."
    ],
    javaSyntax: [
      {
        title: "Prefix Array Construction (1-based)",
        description: "Adding dummy 0 at index 0 eliminates edge cases for L=0.",
        code: "int[] prefix = new int[nums.length + 1];\nfor (int i = 0; i < nums.length; i++) {\n    prefix[i + 1] = prefix[i] + nums[i];\n}\n// Range sum [L, R] inclusive:\nint rangeSum = prefix[R + 1] - prefix[L];"
      },
      {
        title: "Subarray Sum Equals K (Prefix + HashMap)",
        description: "Counts total subarrays whose elements sum up to K.",
        code: "Map<Integer, Integer> map = new HashMap<>();\nmap.put(0, 1);\nint currentSum = 0, count = 0;\nfor (int num : nums) {\n    currentSum += num;\n    if (map.containsKey(currentSum - k)) {\n        count += map.get(currentSum - k);\n    }\n    map.put(currentSum, map.getOrDefault(currentSum, 0) + 1);\n}"
      }
    ],
    completeJavaCode: `import java.util.HashMap;\nimport java.util.Map;\n\npublic class PrefixSumSolution {\n    public int subarraySum(int[] nums, int k) {\n        Map<Integer, Integer> prefixMap = new HashMap<>();\n        prefixMap.put(0, 1); // Base case for subarray starting at index 0\n        int currentSum = 0, resultCount = 0;\n        for (int num : nums) {\n            currentSum += num;\n            if (prefixMap.containsKey(currentSum - k)) {\n                resultCount += prefixMap.get(currentSum - k);\n            }\n            prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1);\n        }\n        return resultCount;\n    }\n}`,
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
      "If the problem includes negative numbers, Sliding Window fails, but Prefix Sum + HashMap works perfectly!"
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
      "Define recursive `backtrack(state, path, result)` helper function.",
      "Base Case: If `path` meets target condition (e.g. `path.size() == target`), add copy `new ArrayList<>(path)` to `result` and return.",
      "For each candidate `choice` in available decisions:",
      "  If `choice` is valid (passes constraints):",
      "    Make choice: `path.add(choice)`.",
      "    Recurse: `backtrack(state, path, result)`.",
      "    Undo choice (Backtrack): `path.remove(path.size() - 1)`."
    ],
    javaSyntax: [
      {
        title: "Standard Backtracking Template",
        description: "Universal boilerplate for permutations and combination sum.",
        code: "void backtrack(int[] nums, List<Integer> current, List<List<Integer>> result) {\n    if (current.size() == nums.length) {\n        result.add(new ArrayList<>(current)); // Make deep copy!\n        return;\n    }\n    for (int i = 0; i < nums.length; i++) {\n        if (current.contains(nums[i])) continue;\n        current.add(nums[i]);\n        backtrack(nums, current, result);      // Recurse\n        current.remove(current.size() - 1);    // Undo state!\n    }\n}"
      },
      {
        title: "Subsets / Combinations Template",
        description: "Using start index to avoid duplicate combinations.",
        code: "void backtrack(int start, int[] nums, List<Integer> current, List<List<Integer>> res) {\n    res.add(new ArrayList<>(current));\n    for (int i = start; i < nums.length; i++) {\n        current.add(nums[i]);\n        backtrack(i + 1, nums, current, res);\n        current.remove(current.size() - 1);\n    }\n}"
      }
    ],
    completeJavaCode: `import java.util.ArrayList;\nimport java.util.List;\n\npublic class BacktrackingSolution {\n    public List<List<Integer>> permute(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(nums, new ArrayList<>(), result);\n        return result;\n    }\n\n    private void backtrack(int[] nums, List<Integer> current, List<List<Integer>> result) {\n        if (current.size() == nums.length) {\n            result.add(new ArrayList<>(current)); // Deep copy required!\n            return;\n        }\n        for (int num : nums) {\n            if (current.contains(num)) continue; // Skip used numbers\n            current.add(num);\n            backtrack(nums, current, result);\n            current.remove(current.size() - 1); // Backtrack step\n        }\n    }\n}`,
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
      "Adding `current` directly to `result.add(current)` instead of `result.add(new ArrayList<>(current))`. Since Java passes objects by reference, all entries become empty when backtracking finishes!",
      "Forgetting the undo choice step `current.remove(current.size() - 1)`.",
      "Not incrementing `start + 1` in combinations, causing infinite loops."
    ],
    interviewTips: [
      "Always highlight the 3 essential steps of backtracking to your interviewer: 1. Choose, 2. Recurse, 3. Unchoose.",
      "Emphasize deep copying: 'I am creating a new ArrayList copy before adding to the result list so state modification doesn't corrupt previous answers.'"
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

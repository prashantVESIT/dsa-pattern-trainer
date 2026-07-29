(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();const O=[{id:1,name:"Arrays & Hashing",difficulty:"Beginner",readTime:"5 min read",shortDescription:"Trade extra O(n) space for lightning-fast O(1) lookups to instantly verify element presence or count frequencies.",whatIsIt:"Arrays store elements sequentially in contiguous memory blocks, providing O(1) index access. Hashing maps keys to buckets using a hash function, allowing O(1) average constant-time insertions, deletions, and lookups.",whyUsed:"It eliminates brute-force nested loop searches O(n²) by keeping track of previously visited numbers, frequencies, or complement values in a single O(n) pass.",whenToUse:["When you need to test whether an element (or its complement) was already encountered.","When counting frequencies of characters or integers (Anagrams, Top K Frequent).","When checking for duplicates or finding unique elements in unsorted collections."],keywords:[{word:"HashMap",explanation:"Stores key-value pairs; ideal for counting frequencies or tracking index positions of complement values."},{word:"HashSet",explanation:"Stores unique elements; perfect for O(1) duplicate checks and existence validation."},{word:"Duplicate",explanation:"Signals set insertion or checking size difference between array and set."},{word:"Frequency",explanation:"Signals counting elements using `map.put(key, map.getOrDefault(key, 0) + 1)`."}],recognitionTips:["If the problem asks for pairs/complements without requiring sorted order, use a HashMap<Integer, Integer>.","If you need to verify if elements are identical or anagrams, count character frequencies with a Map or array.","If order doesn't matter and you need existence check in O(1), reach for a HashSet<Integer> or HashSet<String>."],bruteForceVsOptimized:{bruteForce:"Brute Force: Check every possible pair using nested loops (i and j). Takes O(n²) time and O(1) auxiliary space.",optimized:"Optimized: Iterate once through the array, computing target - num[i], and check if it exists in a Map<Integer, Integer>. Takes O(n) time and O(n) space."},stepByStepAlgorithm:["Initialize an empty `Map<Integer, Integer> map = new HashMap<>();` to store number-to-index mappings.","Loop through each element `nums[i]` at index `i` in the array.","Calculate required complement value `int complement = target - nums[i]`.","If `map.containsKey(complement)`, return `new int[] { map.get(complement), i }`.","Otherwise, insert `map.put(nums[i], i)` into the map.","If loop completes without a match, return `new int[0]`."],javaSyntax:[{title:"HashMap Frequency Counter",description:"Counting character or integer occurrences cleanly in Java 17.",code:`Map<Character, Integer> counts = new HashMap<>();
for (char c : str.toCharArray()) {
    // Safely increment frequency count
    counts.put(c, counts.getOrDefault(c, 0) + 1);
}`},{title:"HashSet Duplicate Detector",description:"Instantly check if an array contains duplicates using generics.",code:`Set<Integer> seen = new HashSet<>();
for (int num : nums) {
    // add() returns false if element already exists in set
    if (!seen.add(num)) {
        return true;
    }
}
return false;`}],completeJavaCode:`import java.util.HashMap;
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
}`,complexityComparison:{bruteTime:"O(n²)",bruteSpace:"O(1)",optTime:"O(n)",optSpace:"O(n)",notes:"Trading space complexity O(n) for dramatically reduced time complexity from quadratic to linear."},visualExplanation:{diagramType:"HashMap Lookup Flow",steps:[{label:"Step 1: Inspect 2",desc:"Target = 9. Needed = 7. Map is empty. Store map.put(2, 0)."},{label:"Step 2: Inspect 7",desc:"Target = 9. Needed = 2. Map contains 2 at index 0! Match found: [0, 1]."}]},realWorldApps:[{domain:"Database Indexing",description:"B-Tree and Hash Indexes for instant primary key lookups."},{domain:"Search Systems",description:"Inverted indexes for word search in search engines like Google and Elasticsearch."},{domain:"Caching Systems",description:"Redis and Memcached key-value stores for sub-millisecond data retrieval."}],commonProblems:[{title:"Two Sum",difficulty:"Easy",linkTitle:"LeetCode 1"},{title:"Contains Duplicate",difficulty:"Easy",linkTitle:"LeetCode 217"},{title:"Valid Anagram",difficulty:"Easy",linkTitle:"LeetCode 242"},{title:"Group Anagrams",difficulty:"Medium",linkTitle:"LeetCode 49"},{title:"Top K Frequent Elements",difficulty:"Medium",linkTitle:"LeetCode 347"}],commonMistakes:["Using the same element twice (e.g. adding index i to itself if num == complement).","Forgetting to specify explicit generic types like Map<Integer, Integer> or Set<Character>.","Assuming iteration order is preserved in HashMap (use LinkedHashMap if insertion order matters)."],interviewTips:["Always state the time-space tradeoff explicitly: 'I can solve this in O(n) time using O(n) extra space with a HashMap.'","If the input alphabet is fixed (e.g. lowercase English letters), prefer an `int[26]` primitive array over a Map for lower memory overhead."],keyTakeaways:{whenToUse:"Unsorted search, duplicate checks, frequency counts, complement pairs.",whyItWorks:"Hash functions map keys directly to memory buckets for O(1) amortized operations.",complexity:"Time: O(n) average | Space: O(n) extra memory.",recognitionTrick:"Look for 'pair adding to target', 'duplicates', or 'character counts'."}},{id:2,name:"Two Pointers",difficulty:"Beginner",readTime:"6 min read",shortDescription:"Iterate from both ends toward the middle or at different speeds to solve searching/sorting problems in O(1) auxiliary space.",whatIsIt:"Two Pointers is a technique where two integer indices iterate across an array or string. They can move inward (converging from opposite ends) or in the same direction (fast and slow pointers).",whyUsed:"It avoids generating nested combinations or extra space allocations, reducing time complexity to linear O(n) while keeping space complexity strictly O(1).",whenToUse:["When the input array or string is sorted (or can be sorted).","When finding pairs, triplets, or sub-ranges that meet a specific target sum.","When detecting cycles in linked lists or fast/slow pointer traversals (Floyd's algorithm)."],keywords:[{word:"Sorted Array",explanation:"Indicates elements increase/decrease monotonically, allowing pointer direction decisions."},{word:"Pair Sum",explanation:"Adjust left or right pointer based on whether current sum is too small or too large."},{word:"Palindrome",explanation:"Compare characters from outer bounds moving inward toward center."},{word:"In-place",explanation:"Requirement to modify array without allocating new memory structures."}],recognitionTips:["If problem says 'Sorted Array' + 'Find Pair', immediately think Converging Two Pointers.","If problem asks to reverse, compare symmetric bounds, or partition elements in-place, Two Pointers is the optimal tool.","If detecting duplicate elements or cycles without modifying references, use Fast & Slow pointers."],bruteForceVsOptimized:{bruteForce:"Brute Force: Check all pairs with two nested loops. Time complexity: O(n²), Space complexity: O(1).",optimized:"Optimized: Place left pointer at start (0) and right pointer at end (n-1). Move left rightward if sum < target; move right leftward if sum > target. Time complexity: O(n), Space: O(1)."},stepByStepAlgorithm:["Initialize `left = 0` and `right = s.length() - 1`.","Loop while `left < right`.","Increment `left` while `s.charAt(left)` is non-alphanumeric.","Decrement `right` while `s.charAt(right)` is non-alphanumeric.","Compare `Character.toLowerCase(s.charAt(left))` and `Character.toLowerCase(s.charAt(right))`.","If they don't match, return `false`. Otherwise, increment `left++` and decrement `right--`.","If loop terminates without mismatch, return `true`."],javaSyntax:[{title:"Converging Pointers Loop",description:"Standard template for searching sorted arrays or palindrome validation.",code:`int left = 0, right = nums.length - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) {
        return new int[] { left, right };
    } else if (sum < target) {
        left++;
    } else {
        right--;
    }
}`},{title:"Fast & Slow Pointers (In-place Array Modification)",description:"Remove duplicate elements or zeros in O(1) space.",code:`int slow = 0;
for (int fast = 0; fast < nums.length; fast++) {
    if (nums[fast] != 0) {
        nums[slow++] = nums[fast];
    }
}`}],completeJavaCode:`public class TwoPointerSolutions {
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
}`,complexityComparison:{bruteTime:"O(n²)",bruteSpace:"O(1)",optTime:"O(n)",optSpace:"O(1)",notes:"Optimal O(1) space guarantee because pointers only store 32-bit integer indices."},visualExplanation:{diagramType:"Two Pointer Convergence",steps:[{label:"Pointers at Bounds",desc:"[1, 3, 4, 6, 8, 10], Target = 10. Left=1, Right=10. Sum=11 (Too high -> Right--)"},{label:"Adjust Right Pointer",desc:"Left=1, Right=8. Sum=9 (Too low -> Left++)"},{label:"Adjust Left Pointer",desc:"Left=3, Right=8. Sum=11 (Too high -> Right--)"},{label:"Match Found!",desc:"Left=4, Right=6. Sum=10 == Target! Indices found."}]},realWorldApps:[{domain:"Audio Signal Processing",description:"Filtering noise and matching audio waveforms from boundaries."},{domain:"Memory Compaction",description:"Defragmenting memory blocks by swapping used and free blocks in operating system kernels."},{domain:"Data Deduplication",description:"Stream processing for removing duplicate consecutive logs."}],commonProblems:[{title:"Valid Palindrome",difficulty:"Easy",linkTitle:"LeetCode 125"},{title:"Two Sum II - Input Array Is Sorted",difficulty:"Medium",linkTitle:"LeetCode 167"},{title:"3Sum",difficulty:"Medium",linkTitle:"LeetCode 15"},{title:"Container With Most Water",difficulty:"Medium",linkTitle:"LeetCode 11"},{title:"Trapping Rain Water",difficulty:"Hard",linkTitle:"LeetCode 42"}],commonMistakes:["Using Two Pointers on an UNSORTED array without sorting it first.","Off-by-one errors in while condition (`left < right` vs `left <= right`).","Forgetting to skip non-alphanumeric characters or duplicate triplets in 3Sum."],interviewTips:["In 3Sum or 4Sum, sort the array first O(n log n), then fix one number and use Two Pointers for the remaining two numbers.","Be ready to explain why pointer moves are valid: 'Because the array is sorted, incrementing left strictly increases the sum.'"],keyTakeaways:{whenToUse:"Sorted arrays, palindromes, pair sums, in-place array manipulation.",whyItWorks:"Leverages array order to eliminate bad combinations deterministically.",complexity:"Time: O(n) | Space: O(1) auxiliary.",recognitionTrick:"Keywords: 'Sorted', 'Pair', 'Palindrome', 'In-place'."}},{id:3,name:"Sliding Window",difficulty:"Intermediate",readTime:"7 min read",shortDescription:"Maintain a dynamic or fixed contiguous sub-window over an array or string to process contiguous range problems in linear time.",whatIsIt:"Sliding Window maintains a contiguous subsegment of a string or array defined by `[left, right]`. As `right` expands the window, `left` shrinks it whenever a window condition (such as duplicate characters) is violated.",whyUsed:"Without Sliding Window, evaluating all substrings or subarrays takes O(N²) or O(N³). Sliding Window reuses previous state in O(1) time per step, ensuring linear O(N) execution.",whenToUse:["When solving string problems asking for 'Longest substring without repeating characters'.","When problem specifies 'contiguous subarray' or 'substring'.","When finding minimum or maximum window length/sum satisfying a specific constraint."],keywords:[{word:"Substring",explanation:"Contiguous sequence of characters within a string."},{word:"HashSet window",explanation:"Set<Character> used to track unique characters in current window range [left, right]."},{word:"Dynamic Window",explanation:"Window shrinks from left whenever duplicate character is detected."},{word:"Contiguous Range",explanation:"Sequential elements bounded between left and right pointers."}],recognitionTips:["If problem says 'Longest Substring Without Repeating Characters', use Variable Sliding Window + Set<Character>.","If problem specifies a fixed window size K, expand right and subtract `arr[right - K]` when right >= K - 1.","If problem says 'Shortest Subarray with Sum >= S', shrink window from left as long as constraint is met."],bruteForceVsOptimized:{bruteForce:"Brute Force: Check all possible substrings with nested loops and verify character uniqueness for each. Takes O(N²) or O(N³) time.",optimized:"Optimized: Maintain a Set<Character> set and two pointers left and right. Shrink left whenever a duplicate is found. Takes O(N) time and O(min(N, M)) space."},stepByStepAlgorithm:["Initialize `Set<Character> set = new HashSet<>();` to store unique characters in current window.","Initialize `int left = 0;` and `int maxLength = 0;`.","Loop `right` from `0` to `s.length() - 1` to expand the right boundary.","While `set.contains(s.charAt(right))`, remove `s.charAt(left)` from `set` and increment `left++`.","Add `s.charAt(right)` to `set`.","Calculate window size `(right - left + 1)` and update `maxLength = Math.max(maxLength, right - left + 1)`.","Return `maxLength`."],javaSyntax:[{title:"Variable Window Template (Longest Substring without Repeats)",description:"Optimal Java 17 implementation using explicit generic types.",code:`Set<Character> set = new HashSet<>();

int left = 0;
int maxLength = 0;

for (int right = 0; right < s.length(); right++) {
    while (set.contains(s.charAt(right))) {
        set.remove(s.charAt(left++));
    }
    set.add(s.charAt(right));
    maxLength = Math.max(maxLength, right - left + 1);
}`},{title:"Fixed Window Template (Subarray of Size K)",description:"Standard template for rolling window of size K.",code:`int currentSum = 0, maxSum = Integer.MIN_VALUE;
for (int right = 0; right < nums.length; right++) {
    currentSum += nums[right];
    if (right >= k - 1) {
        maxSum = Math.max(maxSum, currentSum);
        currentSum -= nums[right - (k - 1)];
    }
}`}],completeJavaCode:`import java.util.HashSet;
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
}`,complexityComparison:{bruteTime:"O(n²)",bruteSpace:"O(min(n, m))",optTime:"O(n)",optSpace:"O(min(n, m))",notes:"Each character enters the set once (right pointer) and leaves at most once (left pointer), guaranteeing 2n operations total = O(n)."},visualExplanation:{diagramType:"Window Shift with HashSet",steps:[{label:"Expand Window",desc:"s = 'abcabcbb'. right=0 ('a'). Set = ['a'], maxLength = 1."},{label:"Expand to 'c'",desc:"right=2 ('c'). Set = ['a', 'b', 'c'], maxLength = 3."},{label:"Duplicate Detected",desc:"right=3 ('a'). Set contains 'a'! Shrink left (remove 'a', left=1). Add 'a'. Set = ['b', 'c', 'a'], maxLength = 3."}]},realWorldApps:[{domain:"Network Packet Analysis",description:"Calculating average throughput over rolling 5-second time windows."},{domain:"Financial Stock Tickers",description:"Computing moving averages (e.g. 50-day moving average) in trading platforms."},{domain:"Video Streaming Buffers",description:"Managing adaptive bitrate streaming buffer windows."}],commonProblems:[{title:"Longest Substring Without Repeating Characters",difficulty:"Medium",linkTitle:"LeetCode 3"},{title:"Minimum Size Subarray Sum",difficulty:"Medium",linkTitle:"LeetCode 209"},{title:"Permutation in String",difficulty:"Medium",linkTitle:"LeetCode 567"},{title:"Fruit Into Baskets",difficulty:"Medium",linkTitle:"LeetCode 904"},{title:"Sliding Window Maximum",difficulty:"Hard",linkTitle:"LeetCode 239"}],commonMistakes:["Shrinking the window using `if` instead of `while` when multiple elements need removal.","Off-by-one errors when calculating window length (`right - left + 1` vs `right - left`).","Forgetting to declare complete generic types like `Set<Character> set = new HashSet<>();`."],interviewTips:["Classify the problem immediately: 'Is the window size fixed K, or is it variable based on a target condition like uniqueness?'","Explain the time complexity clearly: 'Even with the nested while loop, left and right pointers each move at most N times, yielding O(N) total time.'"],keyTakeaways:{whenToUse:"Contiguous substrings, unique character ranges, sliding window maximum.",whyItWorks:"Reuses previous window computations by adding incoming element and removing outgoing element.",complexity:"Time: O(n) | Space: O(min(n, m)).",recognitionTrick:"Look for 'Longest substring without repeating characters' or 'contiguous window'."}},{id:4,name:"Prefix Sum",difficulty:"Beginner",readTime:"5 min read",shortDescription:"Precompute cumulative totals in an auxiliary array or HashMap to answer range sum queries in constant O(1) time.",whatIsIt:"Prefix Sum creates a precomputed array or running total `prefix` where `prefix[i]` holds the sum of elements from index `0` up to `i`. Range sum from `L` to `R` is then computed as `prefix[R] - prefix[L-1]`.",whyUsed:"Evaluating range sums directly on an array takes O(N) time per query. For Q queries, brute force takes O(Q * N). Prefix Sum reduces Q queries to O(Q * 1) = O(Q) total time after O(N) precomputation.",whenToUse:["When you need to answer multiple range sum queries on an array that doesn't change (static array).","When finding subarrays with a specific target sum (Prefix Sum + Map<Integer, Integer> technique).","When calculating cumulative counts or range updates (Difference Array)."],keywords:[{word:"Range Query",explanation:"Question asking for sum or product between index L and R."},{word:"Running Sum",explanation:"Cumulative total built sequentially from start of array."},{word:"Subarray Sum Equals K",explanation:"Indicates using Map<Integer, Integer> storing prefixSum -> frequency."},{word:"Static Array",explanation:"Array that is not mutated between range queries."}],recognitionTips:["If the problem mentions 'Sum between index L and R multiple times', use Prefix Sum.","If finding 'Subarrays with sum equal to K', use Prefix Sum + Map<Integer, Integer> (`map.containsKey(currentSum - K)`).","If problem involves 2D grid sub-rectangle sums, use 2D Prefix Sum Matrix."],bruteForceVsOptimized:{bruteForce:"Brute Force: Loop from index L to R for every query. Query time: O(N), Q queries = O(Q * N).",optimized:"Optimized: Precompute prefix array in O(N). Answer each range query `sum(L, R) = prefix[R] - prefix[L-1]` in O(1) time."},stepByStepAlgorithm:["Initialize `Map<Integer, Integer> prefixMap = new HashMap<>();` to store prefix sums and their frequencies.","Seed base case: `prefixMap.put(0, 1);` for subarrays starting at index 0.","Initialize `int currentSum = 0;` and `int resultCount = 0;`.","Loop through each `num` in `nums` array.","Add `num` to `currentSum`.","If `prefixMap.containsKey(currentSum - k)`, increment `resultCount += prefixMap.get(currentSum - k)`.","Store/update current prefix sum: `prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1)`.","Return `resultCount`."],javaSyntax:[{title:"Prefix Array Construction (1-based Indexing)",description:"Adding dummy 0 at index 0 eliminates edge cases for L = 0.",code:`int[] prefix = new int[nums.length + 1];
for (int i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
}
// Range sum [left, right] inclusive (0-based indexing):
int rangeSum = prefix[right + 1] - prefix[left];`},{title:"Subarray Sum Equals K (Prefix + HashMap)",description:"Counts total subarrays whose elements sum up to K in O(N) time.",code:`Map<Integer, Integer> prefixMap = new HashMap<>();
prefixMap.put(0, 1); // Base case for subarray starting at index 0

int currentSum = 0;
int count = 0;

for (int num : nums) {
    currentSum += num;
    if (prefixMap.containsKey(currentSum - k)) {
        count += prefixMap.get(currentSum - k);
    }
    prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1);
}`}],completeJavaCode:`import java.util.HashMap;
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
}`,complexityComparison:{bruteTime:"Precompute: O(0), Query: O(N)",bruteSpace:"O(1)",optTime:"Precompute: O(N), Query: O(1)",optSpace:"O(N)",notes:"O(N) precomputation pays off massively when answering thousands of queries in O(1) time."},visualExplanation:{diagramType:"Cumulative Array Mapping",steps:[{label:"Original Array",desc:"nums = [1, 2, 3, 4, 5]"},{label:"Prefix Array",desc:"prefix = [0, 1, 3, 6, 10, 15]"},{label:"Query Range [1, 3]",desc:"sum(nums[1..3]) = 2 + 3 + 4 = 9 -> prefix[4] - prefix[1] = 10 - 1 = 9!"}]},realWorldApps:[{domain:"Financial Statement Auditing",description:"Quarterly and year-to-date cumulative revenue reporting."},{domain:"Image Processing",description:"Integral images (Summed-Area Tables) for instant box blur filters in computer vision."},{domain:"Telemetry Metrics",description:"Aggregating server requests per minute over continuous time intervals."}],commonProblems:[{title:"Range Sum Query - Immutable",difficulty:"Easy",linkTitle:"LeetCode 303"},{title:"Find Pivot Index",difficulty:"Easy",linkTitle:"LeetCode 724"},{title:"Subarray Sum Equals K",difficulty:"Medium",linkTitle:"LeetCode 560"},{title:"Product of Array Except Self",difficulty:"Medium",linkTitle:"LeetCode 238"},{title:"Subarray Sums Divisible by K",difficulty:"Medium",linkTitle:"LeetCode 974"}],commonMistakes:["Forgetting to seed `prefixMap.put(0, 1)` when combining Prefix Sum with HashMap.","Off-by-one errors in boundary queries when using 0-based indexing without dummy zero.","Attempting to use Prefix Sum on arrays that undergo frequent element updates (use Binary Indexed Tree or Segment Tree instead)."],interviewTips:["Mention 1-based indexing prefix array trick (`size = N + 1`) to eliminate `if (L == 0)` boundary checks.","If the problem includes negative numbers, Sliding Window fails, but Prefix Sum + Map<Integer, Integer> works perfectly!"],keyTakeaways:{whenToUse:"Range sum queries, pivot index, cumulative counts, target subarray sum.",whyItWorks:"Converts range query into simple subtraction `prefix[R] - prefix[L-1]`.",complexity:"Precompute: O(N) | Query: O(1) | Space: O(N).",recognitionTrick:"Keywords: 'Range sum', 'Cumulative', 'Subarray sum equals K'."}},{id:5,name:"Backtracking",difficulty:"Intermediate",readTime:"8 min read",shortDescription:"Recursively explore all possible decision paths, backtracking (undoing choices) whenever a path fails to meet constraints.",whatIsIt:"Backtracking is an algorithmic paradigm that builds candidates incrementally and abandons ('backtracks') a candidate as soon as it determines the candidate cannot lead to a valid solution.",whyUsed:"It systematically evaluates combinatorial search spaces (permutations, subsets, board games) faster than exhaustive generation by pruning invalid branches early.",whenToUse:["When asked to 'Generate all permutations', 'Find all combinations', or 'Solve all valid configurations'.","When solving constraint satisfaction problems (N-Queens, Sudoku, Word Search, Partition Equal Subset).","When constructing paths through decision trees where choices must be undone."],keywords:[{word:"Permutation",explanation:"All ordered arrangements of elements."},{word:"Combination",explanation:"All unordered selections of elements."},{word:"DFS / Recursion",explanation:"Depth-first search traversal through state space tree."},{word:"Backtrack Step",explanation:"Removing last added element from path state before next branch."}],recognitionTips:["If prompt asks 'Find ALL possible solutions' or 'Generate ALL subsets/permutations', think Backtracking.","Look for constraint-driven board problems (Sudoku, N-Queens, Grid Word Search).","If input size N is very small (N <= 15 or N <= 20), it hints at exponential N! or 2^N backtracking."],bruteForceVsOptimized:{bruteForce:"Brute Force: Generate all possible combinations without checking constraints, testing validity at the very end. Time: O(N^N).",optimized:"Optimized: Backtrack immediately as soon as a partial solution violates constraints (Pruning). Drastically reduces visited states."},stepByStepAlgorithm:["Define recursive `backtrack(nums, current, result)` helper function with explicit generics `List<Integer>` and `List<List<Integer>>`.","Base Case: If `current.size() == nums.length`, create deep copy `result.add(new ArrayList<>(current))` and return.","Loop through each candidate `num` in `nums`.","If `current.contains(num)`, skip (constraint check).","Step 1 (Make Choice): `current.add(num)`.","Step 2 (Explore): `backtrack(nums, current, result)`.","Step 3 (Backtrack / Undo Choice): `current.remove(current.size() - 1)`."],javaSyntax:[{title:"Standard Backtracking Template (Permutations)",description:"Universal boilerplate for permutations using explicit generics.",code:`private void backtrack(int[] nums, List<Integer> current, List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current)); // Deep copy required!
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (current.contains(nums[i])) continue;
        current.add(nums[i]);                  // 1. Make choice
        backtrack(nums, current, result);      // 2. Recurse path
        current.remove(current.size() - 1);    // 3. Undo choice (Backtrack)
    }
}`},{title:"Subsets / Combinations Template",description:"Using start index to generate combinations without duplicates.",code:`private void backtrack(int start, int[] nums, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current)); // Deep copy current subset
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);                    // 1. Choose
        backtrack(i + 1, nums, current, result); // 2. Recurse next index
        current.remove(current.size() - 1);      // 3. Undo choice
    }
}`}],completeJavaCode:`import java.util.ArrayList;
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
}`,complexityComparison:{bruteTime:"O(N^N)",bruteSpace:"O(N)",optTime:"O(N!) for Permutations | O(2^N) for Subsets",optSpace:"O(N) recursion stack height",notes:"Early constraint pruning prevents exploring dead-end subtrees, keeping execution fast."},visualExplanation:{diagramType:"Decision State Tree",steps:[{label:"Root Level []",desc:"Choices available: [1, 2, 3]"},{label:"Branch 1 -> [1]",desc:"Remaining choices: [2, 3] -> Recurse to [1, 2] and [1, 3]"},{label:"Leaf Level -> [1, 2, 3]",desc:"Full permutation built! Add copy to results. Backtrack to [1, 2], then [1]."}]},realWorldApps:[{domain:"AI Game Engines",description:"Minimax and alpha-beta pruning for Chess and Go moves."},{domain:"Automated Timetable Scheduling",description:"Solving course/exam schedules satisfying room and time constraints."},{domain:"Circuit Routing & EDA",description:"Printed circuit board (PCB) component trace auto-routing."}],commonProblems:[{title:"Subsets",difficulty:"Medium",linkTitle:"LeetCode 78"},{title:"Permutations",difficulty:"Medium",linkTitle:"LeetCode 46"},{title:"Combination Sum",difficulty:"Medium",linkTitle:"LeetCode 39"},{title:"Word Search",difficulty:"Medium",linkTitle:"LeetCode 79"},{title:"N-Queens",difficulty:"Hard",linkTitle:"LeetCode 51"}],commonMistakes:["Adding `current` directly as `result.add(current)` instead of creating a deep copy `result.add(new ArrayList<>(current))`. Since Java passes object references, all entries become empty when backtracking completes!","Forgetting the undo choice step `current.remove(current.size() - 1)`.","Omitting explicit generic type declarations such as `List<Integer>` or `List<List<Integer>>`."],interviewTips:["Always highlight the 3 essential steps of backtracking: 1. Choose, 2. Recurse, 3. Unchoose (Backtrack).","Emphasize deep copying: 'I am creating a new ArrayList copy before adding to the result list so state modification during backtracking doesn't corrupt previous answers.'"],keyTakeaways:{whenToUse:"Generate all permutations, combinations, subsets, Sudoku, N-Queens.",whyItWorks:"Explores decision tree with DFS and prunes invalid paths early.",complexity:"Time: O(N!) or O(2^N) | Space: O(N) recursion stack.",recognitionTrick:"Keywords: 'Generate all', 'Find all valid combinations', 'N <= 15'."}}],W=[{pattern:"Arrays & Hashing",bestUsedFor:"Instant O(1) duplicate checks, frequency counting, complement lookups.",keywords:"HashMap, HashSet, Duplicate, Frequency, Complement",timeComp:"O(n) average",spaceComp:"O(n)",difficulty:"Beginner"},{pattern:"Two Pointers",bestUsedFor:"Searching sorted arrays, palindromes, pair sums in O(1) space.",keywords:"Sorted Array, Pair Sum, Palindrome, In-place, Converging",timeComp:"O(n)",spaceComp:"O(1)",difficulty:"Beginner"},{pattern:"Sliding Window",bestUsedFor:"Contiguous subarrays or substrings, fixed size K or min/max bounds.",keywords:"Contiguous, Subarray, Substring, Window size K, Min/Max length",timeComp:"O(n)",spaceComp:"O(1) / O(k)",difficulty:"Intermediate"},{pattern:"Prefix Sum",bestUsedFor:"Static range sum queries, cumulative totals, subarray sum equals K.",keywords:"Range Query, Running Sum, Cumulative, Subarray Sum K",timeComp:"Precompute: O(N) | Query: O(1)",spaceComp:"O(N)",difficulty:"Beginner"},{pattern:"Backtracking",bestUsedFor:"Generating all combinations, permutations, subsets, board games.",keywords:"Permutations, Combinations, Subsets, DFS, Recursion, Undo Choice",timeComp:"O(N!) / O(2^N)",spaceComp:"O(N) recursion stack",difficulty:"Intermediate"}];function p(n){return n?n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}class U{constructor(t,e,s,i){this.activePatternId=1,this.searchQuery="",this.onNavigateToQuiz=t,this.onNavigateToMatrix=e,this.onNavigateToHandbook=s,this.onPlaySound=i}init(){this.bindEvents(),this.renderCards(),this.renderExpandedDetail(),this.renderMatrixVisualCharts(),this.renderComparisonTable(),this.renderMatrixCheatsheet()}bindEvents(){const t=document.getElementById("handbook-search"),e=document.getElementById("handbook-search-mobile"),s=r=>{this.searchQuery=r.target.value.toLowerCase().trim(),this.renderCards()};t&&(t.oninput=s),e&&(e.oninput=s);const i=document.getElementById("handbook-to-matrix-btn");i&&(i.onclick=()=>this.onNavigateToMatrix());const o=document.getElementById("handbook-to-quiz-btn");o&&(o.onclick=()=>this.onNavigateToQuiz());const l=document.getElementById("matrix-to-quiz-btn");l&&(l.onclick=()=>this.onNavigateToQuiz())}renderCards(){const t=document.getElementById("handbook-cards-grid");if(!t)return;t.innerHTML="";const e=O.filter(s=>{if(!this.searchQuery)return!0;const i=s.name.toLowerCase().includes(this.searchQuery),o=s.shortDescription.toLowerCase().includes(this.searchQuery),l=s.keywords.some(r=>r.word.toLowerCase().includes(this.searchQuery)||r.explanation.toLowerCase().includes(this.searchQuery));return i||o||l});if(e.length===0){t.innerHTML=`
        <div class="col-span-full p-8 rounded-2xl bg-surface-container border border-outline-variant text-center text-on-surface-variant">
          <span class="material-symbols-outlined text-outline" style="font-size: 36px;">search_off</span>
          <p class="text-sm font-bold text-white mt-2">No patterns matched your search "${this.searchQuery}"</p>
          <p class="text-xs text-outline mt-1">Try searching for terms like 'HashMap', 'Sorted', 'Window', 'Range', or 'DFS'.</p>
        </div>
      `;return}e.forEach(s=>{const i=s.id===this.activePatternId,o=document.createElement("div"),l=s.difficulty==="Beginner"?"bg-secondary/10 border-secondary/30 text-secondary":"bg-primary/10 border-primary/30 text-primary";o.className=`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-5 cursor-pointer ${i?"bg-surface-container-highest border-primary shadow-glow-primary scale-[1.01]":"bg-surface-container/80 hover:bg-surface-container-high border-outline-variant/60 hover:border-primary/50 hover:-translate-y-0.5"}`,o.onclick=()=>{var c;(c=this.onPlaySound)==null||c.call(this),this.activePatternId=s.id,this.renderCards(),this.renderExpandedDetail();const r=document.getElementById("handbook-expanded-detail");r&&r.scrollIntoView({behavior:"smooth",block:"start"})},o.innerHTML=`
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2">
            <span class="px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${l}">
              ${s.difficulty}
            </span>
            <span class="text-[11px] text-on-surface-variant flex items-center gap-1 font-medium">
              <span class="material-symbols-outlined" style="font-size: 14px;">schedule</span>
              ${s.readTime}
            </span>
          </div>

          <h3 class="text-white text-lg font-black tracking-tight flex items-center justify-between">
            ${s.name}
            ${i?'<span class="material-symbols-outlined text-primary" style="font-size: 20px;">check_circle</span>':""}
          </h3>

          <p class="text-on-surface-variant text-xs leading-relaxed">
            ${s.shortDescription}
          </p>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs font-bold ${i?"text-primary":"text-on-surface-variant hover:text-white"}">
          <span>${i?"Currently Viewing":"Learn Pattern Details"}</span>
          <span class="material-symbols-outlined" style="font-size: 18px;">${i?"expand_more":"arrow_forward"}</span>
        </div>
      `,t.appendChild(o)})}renderExpandedDetail(){const t=document.getElementById("handbook-expanded-detail");if(!t)return;const e=O.find(r=>r.id===this.activePatternId)||O[0],s=e.difficulty==="Beginner"?"bg-secondary/10 border-secondary/40 text-secondary":"bg-primary/10 border-primary/40 text-primary";t.innerHTML=`
      <div class="bg-surface-container rounded-3xl border border-outline-variant p-8 lg:p-12 flex flex-col gap-12 shadow-2xl modal-enter">
        
        <!-- TOP HEADER & TITLE -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-outline-variant/50">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 rounded-full border text-xs font-black uppercase tracking-widest ${s}">
                ${e.difficulty}
              </span>
              <span class="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined" style="font-size: 16px;">schedule</span>
                ${e.readTime}
              </span>
            </div>
            <h2 class="text-2xl lg:text-3xl font-black text-white tracking-tight">${e.name} - Deep Dive</h2>
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
            <p class="text-on-surface-variant text-sm leading-relaxed">${p(e.whatIsIt)}</p>
          </div>

          <div class="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/50 flex flex-col gap-3">
            <h3 class="text-white text-base font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">bolt</span>
              2. Why is it Used?
            </h3>
            <p class="text-on-surface-variant text-sm leading-relaxed">${p(e.whyUsed)}</p>
          </div>
        </div>

        <!-- 3. WHEN SHOULD YOU USE IT -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 22px;">event_available</span>
            3. When Should You Use It?
          </h3>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${e.whenToUse.map(r=>`
              <li class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-start gap-3">
                <span class="material-symbols-outlined text-secondary flex-shrink-0 mt-0.5" style="font-size: 18px;">check_circle</span>
                <span class="text-xs text-on-surface font-medium leading-relaxed">${p(r)}</span>
              </li>
            `).join("")}
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
              ${e.keywords.map(r=>`
                <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col gap-1.5">
                  <span class="px-2.5 py-0.5 rounded-md bg-secondary/10 border border-secondary/30 text-secondary text-xs font-black self-start">
                    ${p(r.word)}
                  </span>
                  <p class="text-[11px] text-on-surface-variant leading-relaxed">${p(r.explanation)}</p>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Recognition Tips -->
          <div class="flex flex-col gap-4">
            <h3 class="text-white text-lg font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-primary" style="font-size: 22px;">tips_and_updates</span>
              5. Recognition Tips
            </h3>
            <div class="flex flex-col gap-3">
              ${e.recognitionTips.map(r=>`
                <div class="p-4 rounded-xl bg-surface-container-low border-l-4 border-primary text-xs text-on-surface leading-relaxed italic">
                  "${p(r)}"
                </div>
              `).join("")}
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
              <p class="text-xs text-on-surface-variant leading-relaxed">${p(e.bruteForceVsOptimized.bruteForce)}</p>
            </div>
            <div class="p-5 rounded-2xl bg-secondary/10 border border-secondary/30 flex flex-col gap-2">
              <p class="text-xs font-black uppercase text-secondary tracking-wider">Optimized Pattern Approach</p>
              <p class="text-xs text-on-surface-variant leading-relaxed">${p(e.bruteForceVsOptimized.optimized)}</p>
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
            ${e.stepByStepAlgorithm.map((r,c)=>`
              <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-start gap-4">
                <span class="size-6 rounded-full bg-primary/20 border border-primary text-primary text-xs font-black flex items-center justify-center flex-shrink-0">
                  ${c+1}
                </span>
                <span class="text-xs text-on-surface font-mono font-medium leading-relaxed mt-0.5">${p(r)}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- 8. JAVA SYNTAX & APIS -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 22px;">terminal</span>
            8. Essential Java Syntax & APIs
          </h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            ${e.javaSyntax.map((r,c)=>`
              <div class="flex flex-col gap-2 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant">
                <div class="flex justify-between items-center">
                  <h4 class="text-white text-xs font-bold">${p(r.title)}</h4>
                  <button data-copy-id="syntax-${c}" class="copy-btn text-[11px] text-primary font-bold hover:underline flex items-center gap-1">
                    <span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span> Copy
                  </button>
                </div>
                <p class="text-[11px] text-on-surface-variant mb-2">${p(r.description)}</p>
                <pre id="syntax-${c}" class="font-mono text-xs text-blue-200 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar">${p(r.code)}</pre>
              </div>
            `).join("")}
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
            <pre id="full-java-code" class="whitespace-pre leading-relaxed">${p(e.completeJavaCode)}</pre>
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
                  <td class="p-4 text-error">${p(e.complexityComparison.bruteTime)}</td>
                  <td class="p-4">${p(e.complexityComparison.bruteSpace)}</td>
                  <td class="p-4 text-on-surface-variant font-sans text-[11px]">Unoptimized nested evaluations</td>
                </tr>
                <tr>
                  <td class="p-4 text-secondary font-sans font-bold">${p(e.name)} (Optimized)</td>
                  <td class="p-4 text-secondary">${p(e.complexityComparison.optTime)}</td>
                  <td class="p-4 text-secondary">${p(e.complexityComparison.optSpace)}</td>
                  <td class="p-4 text-on-surface-variant font-sans text-[11px]">${p(e.complexityComparison.notes)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 11. VISUAL EXPLANATION -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">schema</span>
            11. Visual Explanation (${p(e.visualExplanation.diagramType)})
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${e.visualExplanation.steps.map((r,c)=>`
              <div class="p-5 rounded-xl bg-surface-container-low border border-outline-variant/50 flex flex-col gap-2">
                <span class="text-[10px] font-black uppercase text-primary tracking-widest">Phase 0${c+1}</span>
                <h4 class="text-white text-xs font-bold">${p(r.label)}</h4>
                <p class="text-[11px] text-on-surface-variant leading-relaxed">${p(r.desc)}</p>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- 12. REAL-WORLD APPLICATIONS -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-size: 22px;">domain</span>
            12. Real-World Industry Applications
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${e.realWorldApps.map(r=>`
              <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col gap-1.5">
                <h4 class="text-white text-xs font-bold text-secondary flex items-center gap-1.5">
                  <span class="material-symbols-outlined" style="font-size: 16px;">memory</span>
                  ${p(r.domain)}
                </h4>
                <p class="text-[11px] text-on-surface-variant leading-relaxed">${p(r.description)}</p>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- 13. COMMON INTERVIEW PROBLEMS -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white text-lg font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary" style="font-size: 22px;">quiz</span>
            13. Common Interview Problems
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${e.commonProblems.map(r=>{const c=r.difficulty==="Easy"?"bg-secondary/10 border-secondary/30 text-secondary":r.difficulty==="Medium"?"bg-primary/10 border-primary/30 text-primary":"bg-error/10 border-error/30 text-error";return`
                <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-3">
                  <div class="flex flex-col gap-1">
                    <span class="text-xs font-bold text-white">${p(r.title)}</span>
                    <span class="text-[10px] text-outline">${p(r.linkTitle)}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full border text-[10px] font-black uppercase ${c}">
                    ${p(r.difficulty)}
                  </span>
                </div>
              `}).join("")}
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
              ${e.commonMistakes.map(r=>`
                <div class="p-4 rounded-xl bg-error-container/10 border border-error/30 flex items-start gap-3">
                  <span class="material-symbols-outlined text-error flex-shrink-0" style="font-size: 18px;">error</span>
                  <span class="text-xs text-on-surface-variant leading-relaxed">${p(r)}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <h3 class="text-white text-lg font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-primary" style="font-size: 22px;">record_voice_over</span>
              15. Interview Tips
            </h3>
            <div class="flex flex-col gap-3">
              ${e.interviewTips.map(r=>`
                <div class="p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-3">
                  <span class="material-symbols-outlined text-primary flex-shrink-0" style="font-size: 18px;">record_voice_over</span>
                  <span class="text-xs text-on-surface-variant leading-relaxed">${p(r)}</span>
                </div>
              `).join("")}
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
              <p class="text-on-surface-variant leading-relaxed">${p(e.keyTakeaways.whenToUse)}</p>
            </div>
            <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
              <p class="text-[10px] font-black text-secondary uppercase mb-1">Why It Works</p>
              <p class="text-on-surface-variant leading-relaxed">${p(e.keyTakeaways.whyItWorks)}</p>
            </div>
            <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
              <p class="text-[10px] font-black text-white uppercase mb-1">Complexity</p>
              <p class="text-on-surface-variant font-mono leading-relaxed">${p(e.keyTakeaways.complexity)}</p>
            </div>
            <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
              <p class="text-[10px] font-black text-primary uppercase mb-1">Recognition Trick</p>
              <p class="text-on-surface-variant leading-relaxed">${p(e.keyTakeaways.recognitionTrick)}</p>
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
    `;const i=document.getElementById("copy-full-java-btn");i&&(i.onclick=()=>{navigator.clipboard.writeText(e.completeJavaCode),i.innerHTML='<span class="material-symbols-outlined" style="font-size: 14px;">check</span> Copied!',setTimeout(()=>{i.innerHTML='<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span> Copy Full Code'},2e3)}),t.querySelectorAll(".copy-btn").forEach(r=>{r.onclick=()=>{const c=r.getAttribute("data-copy-id");if(c){const u=document.getElementById(c);u&&(navigator.clipboard.writeText(u.innerText),r.innerHTML='<span class="material-symbols-outlined" style="font-size: 14px;">check</span> Copied!',setTimeout(()=>{r.innerHTML='<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span> Copy'},2e3))}}});const l=document.getElementById("next-pattern-matrix-btn");l&&(l.onclick=()=>{this.onNavigateToMatrix()})}renderMatrixVisualCharts(){const t=document.getElementById("matrix-visual-chart-section");t&&(t.innerHTML=`
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
    `)}renderComparisonTable(){const t=document.getElementById("matrix-table-container");t&&(t.innerHTML=`
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
            ${W.map(e=>`
              <tr class="hover:bg-surface-container-high/60 transition-colors">
                <td class="p-4 font-black text-white flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary" style="font-size: 16px;">label</span>
                  ${e.pattern}
                </td>
                <td class="p-4 text-on-surface-variant max-w-xs leading-relaxed">${e.bestUsedFor}</td>
                <td class="p-4 text-secondary font-mono font-bold">${e.keywords}</td>
                <td class="p-4 text-primary font-mono font-bold">${e.timeComp}</td>
                <td class="p-4 font-mono">${e.spaceComp}</td>
                <td class="p-4">
                  <span class="px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase ${e.difficulty==="Beginner"?"bg-secondary/10 border-secondary/30 text-secondary":"bg-primary/10 border-primary/30 text-primary"}">
                    ${e.difficulty}
                  </span>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `)}renderMatrixCheatsheet(){const t=document.getElementById("matrix-cheatsheet-section");t&&(t.innerHTML=`
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
    `)}}const w=[{id:1,topic:"Arrays & Hashing",problem:"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",explanation:"The optimal approach uses a HashMap<Integer, Integer> to store numbers we've already visited and their array indices.",complexity:{time:"O(n)",space:"O(n)"},mistake:"Trying to use nested loops O(n²) or omitting explicit generic types in Java.",hint:"When iterating through the array, compute complement = target - nums[i] and check if it exists in a Map<Integer, Integer>.",code:`import java.util.HashMap;
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
}`,mcq:{question:"Why is a HashMap better than sorting for the Two Sum problem in this case?",options:["Sorting takes O(n log n)","HashMaps work in O(1) average lookup","Sorting loses index information","All of the above"],correct:3}},{id:2,topic:"Two Pointers",problem:"Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.",explanation:"Maintain left pointer at start (0) and right pointer at end (n - 1). Move them inward while skipping non-alphanumeric characters.",complexity:{time:"O(n)",space:"O(1)"},mistake:"Allocating a new string or using recursion, which increases space complexity to O(n).",hint:"Compare characters from both ends moving inward using Character.isLetterOrDigit() and Character.toLowerCase().",code:`public class Solution {
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
}`,mcq:{question:"In what scenario is the Two Pointer approach typically optimized?",options:["When extra space is prohibited","When the array is sorted","When searching for pairs","All of the above"],correct:3}},{id:3,topic:"Sliding Window",problem:"Given a string s, find the length of the longest substring without repeating characters.",explanation:"Maintain a sliding window defined by [left, right]. Use a Set<Character> to track unique characters in the window and shrink left whenever a duplicate is found.",complexity:{time:"O(n)",space:"O(min(n, m))"},mistake:"Shrinking the window using an if statement instead of a while loop when removing duplicate characters.",hint:"Use a Set<Character> set = new HashSet<>(); to store unique characters in window [left, right] and shrink from left when duplicate is detected.",code:`import java.util.HashSet;
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
}`,mcq:{question:"What is the primary benefit of the Sliding Window technique?",options:["Reduces space complexity","Eliminates redundant calculations by reusing window state","Sorts the data first","Works for non-contiguous elements"],correct:1}},{id:4,topic:"Prefix Sum",problem:"Given an array of integers nums and an integer k, return the total number of contiguous subarrays whose sum equals to k.",explanation:"Store running cumulative prefix sums in a Map<Integer, Integer> map. For each current sum, check if (currentSum - k) exists in the map.",complexity:{time:"O(n)",space:"O(n)"},mistake:"Forgetting to seed map.put(0, 1) or calculating range sums from scratch with nested loops.",hint:"If currentSum - k has been seen previously in the prefix map, add its frequency to your answer.",code:`import java.util.HashMap;
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
}`,mcq:{question:"What is the time complexity to find a range sum after building a Prefix Sum array or map?",options:["O(n)","O(log n)","O(1)","O(j - i)"],correct:2}},{id:5,topic:"Backtracking",problem:"Generate all possible permutations of a given array of distinct integers.",explanation:"Use a recursive helper backtrack(nums, current, result) to explore all decision paths. Add elements to current, recurse, and undo choice (backtrack) by removing last element.",complexity:{time:"O(n!)",space:"O(n)"},mistake:"Adding current directly to result without making a deep copy (new ArrayList<>(current)), resulting in empty lists when backtracking finishes.",hint:"Problem asks to 'Generate all', 'Find all', or 'Try all combinations' using 3 steps: Choose, Recurse, Unchoose.",code:`import java.util.ArrayList;
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
}`,mcq:{question:"Why do we create a 'new ArrayList<>(current)' before adding it to results?",options:["Java passes objects by reference; without a deep copy, subsequent removals corrupt all result entries","To clear the list","To sort the output","For memory optimization"],correct:0}}],V=["Arrays & Hashing","Two Pointers","Sliding Window","Prefix Sum","Backtracking","Dynamic Programming","Greedy Algorithms","Binary Search"];let a={isLoggedIn:!1,currentChallengeIndex:0,xp:0,totalScore:0,answers:[],predictAnswered:!1,mcqAnswered:!1,userName:"Prashant Singh",userEmail:"prashantnsingh1@gmail.com",isMasked:!1,pin:"",settings:{sounds:!0,contrast:!1,theme:"monokai"}};class K{constructor(){if(this.ctx=null,typeof window<"u"){const t=()=>{this.initCtx()};window.addEventListener("click",t,{passive:!0}),window.addEventListener("keydown",t,{passive:!0}),window.addEventListener("pointerdown",t,{passive:!0}),window.addEventListener("touchstart",t,{passive:!0})}}initCtx(){try{if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}catch{}}playTone(t,e,s="sine",i=.12,o=!1){if(!(!a.settings.sounds&&!o))try{if(this.initCtx(),!this.ctx)return;this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{});const l=this.ctx.createOscillator(),r=this.ctx.createGain(),c=this.ctx.currentTime;l.type=s,l.frequency.setValueAtTime(t,c),r.gain.setValueAtTime(i,c),r.gain.linearRampToValueAtTime(1e-4,c+e),l.connect(r),r.connect(this.ctx.destination),l.start(c),l.stop(c+e)}catch{}}playClick(){this.playTone(587.33,.08,"sine",.12)}playNav(){this.playTone(440,.08,"sine",.1)}playCorrect(){this.playTone(523.25,.09,"sine",.15),setTimeout(()=>this.playTone(659.25,.1,"sine",.15),75),setTimeout(()=>this.playTone(783.99,.14,"sine",.15),150),setTimeout(()=>this.playTone(1046.5,.22,"sine",.15),225)}playIncorrect(){this.playTone(180,.14,"sawtooth",.14),setTimeout(()=>this.playTone(135,.24,"sawtooth",.14),100)}playSuccess(){this.playCorrect()}playError(){this.playIncorrect()}playToggleOn(){this.playTone(523.25,.08,"sine",.18,!0),setTimeout(()=>this.playTone(659.25,.1,"sine",.18,!0),70),setTimeout(()=>this.playTone(880,.15,"sine",.18,!0),140)}playToggleOff(){this.playTone(440,.08,"sine",.15,!0),setTimeout(()=>this.playTone(330,.12,"sine",.15,!0),70)}}const m=new K;let D;function _(){D=new U(n=>{m.playNav(),n!==void 0&&n>=0&&n<w.length&&(a.currentChallengeIndex=n),F()},()=>{m.playNav(),R()},()=>{m.playNav(),I()},()=>{m.playNav()}),D.init(),G(),Q(),q(),E(),P(),a.isLoggedIn?I():z()}function Q(){const n=document.getElementById("login-form"),t=document.getElementById("guest-login-btn"),e=document.getElementById("toggle-mask-btn"),s=document.getElementById("clear-local-btn"),i=document.getElementById("login-name-input"),o=document.getElementById("login-email-input"),l=document.getElementById("login-pin-input"),r=document.getElementById("mask-icon"),c=document.getElementById("mask-label");e&&(e.onclick=()=>{m.playClick(),a.isMasked=!a.isMasked,i&&(i.type=a.isMasked?"password":"text"),o&&(o.type=a.isMasked?"password":"email"),r&&(r.innerText=a.isMasked?"visibility":"visibility_off"),c&&(c.innerText=a.isMasked?"Unmask Private Inputs":"Mask Private Inputs")}),s&&(s.onclick=()=>{m.playError(),i&&(i.value=""),o&&(o.value=""),l&&(l.value=""),a.userName="",a.userEmail="",a.pin="",alert("Local session privacy data cleared.")}),n&&(n.onsubmit=d=>{var k,C,T;d.preventDefault(),m.playSuccess(),a.userName=((k=i==null?void 0:i.value)==null?void 0:k.trim())||"Candidate",a.userEmail=((C=o==null?void 0:o.value)==null?void 0:C.trim())||"candidate@dsa-trainer.dev",a.pin=((T=l==null?void 0:l.value)==null?void 0:T.trim())||"",a.isLoggedIn=!0,P(),I()}),t&&(t.onclick=()=>{m.playSuccess(),a.userName="Guest Candidate",a.userEmail="guest@dsa-trainer.dev",a.isLoggedIn=!0,P(),I()}),document.querySelectorAll(".nav-btn-handbook").forEach(d=>{d.onclick=()=>{m.playNav(),I()}}),document.querySelectorAll(".nav-btn-matrix").forEach(d=>{d.onclick=()=>{m.playNav(),R()}}),document.querySelectorAll(".nav-btn-quiz").forEach(d=>{d.onclick=()=>{m.playNav(),F()}}),document.querySelectorAll(".global-settings-trigger").forEach(d=>{d.onclick=()=>$("settings")}),document.querySelectorAll(".global-profile-trigger").forEach(d=>{d.onclick=()=>$("profile")}),document.querySelectorAll(".global-logout-trigger").forEach(d=>{d.onclick=()=>{m.playClick(),a.isLoggedIn=!1,z()}});const u=document.getElementById("modal-overlay");document.querySelectorAll(".close-modal-btn").forEach(d=>{d.onclick=S}),u&&(u.onclick=d=>{d.target===u&&S()});const g=document.getElementById("toggle-sounds"),h=document.getElementById("toggle-contrast");g&&(g.onclick=()=>{m.initCtx();const d=!a.settings.sounds;a.settings.sounds=d,B(),E(),d?m.playToggleOn():m.playToggleOff()}),h&&(h.onclick=()=>{a.settings.contrast=!a.settings.contrast,a.settings.sounds&&m.playClick(),B(),E()}),document.querySelectorAll("#theme-selector button").forEach(d=>{d.onclick=()=>{const k=d.getAttribute("data-theme");k&&(a.settings.theme=k,a.settings.sounds&&m.playClick(),B(),E())}});const y=document.getElementById("mobile-toggle-roadmap-btn"),x=document.getElementById("close-mobile-roadmap-btn"),b=document.getElementById("mobile-roadmap-drawer");y&&(y.onclick=()=>{m.playClick(),b&&b.classList.remove("hidden")}),x&&(x.onclick=()=>{N()}),b&&(b.onclick=d=>{d.target===b&&N()})}function N(){m.playClick();const n=document.getElementById("mobile-roadmap-drawer");n&&n.classList.add("hidden")}function z(){S();const n=document.getElementById("login-view"),t=document.getElementById("handbook-view"),e=document.getElementById("matrix-view"),s=document.getElementById("main-app-view");n&&n.classList.remove("hidden"),t&&t.classList.add("hidden"),e&&e.classList.add("hidden"),s&&s.classList.add("hidden")}function I(){S();const n=document.getElementById("login-view"),t=document.getElementById("handbook-view"),e=document.getElementById("matrix-view"),s=document.getElementById("main-app-view");n&&n.classList.add("hidden"),t&&t.classList.remove("hidden"),e&&e.classList.add("hidden"),s&&s.classList.add("hidden"),window.scrollTo({top:0,behavior:"smooth"})}function R(){S();const n=document.getElementById("login-view"),t=document.getElementById("handbook-view"),e=document.getElementById("matrix-view"),s=document.getElementById("main-app-view");n&&n.classList.add("hidden"),t&&t.classList.add("hidden"),e&&e.classList.remove("hidden"),s&&s.classList.add("hidden"),window.scrollTo({top:0,behavior:"smooth"})}function F(){S();const n=document.getElementById("login-view"),t=document.getElementById("handbook-view"),e=document.getElementById("matrix-view"),s=document.getElementById("main-app-view");n&&n.classList.add("hidden"),t&&t.classList.add("hidden"),e&&e.classList.add("hidden"),s&&s.classList.remove("hidden"),M(),A(),window.scrollTo({top:0,behavior:"smooth"})}function P(){const n=document.getElementById("header-user-name"),t=document.getElementById("header-user-email"),e=document.getElementById("cert-name-input"),s=document.getElementById("cert-name-display");n&&(n.innerText=a.userName),t&&(t.innerText=a.userEmail),e&&(e.value=a.userName),s&&(s.innerText=a.userName)}function $(n){m.playClick();const t=document.getElementById("modal-overlay"),e=document.getElementById("settings-modal"),s=document.getElementById("profile-modal"),i=document.getElementById("email-modal");t&&(t.classList.remove("hidden"),e&&e.classList.toggle("hidden",n!=="settings"),s&&s.classList.toggle("hidden",n!=="profile"),i&&i.classList.toggle("hidden",n!=="email"),n==="profile"&&Y())}function S(){m.playClick();const n=document.getElementById("modal-overlay"),t=document.getElementById("settings-modal"),e=document.getElementById("profile-modal"),s=document.getElementById("email-modal");n&&n.classList.add("hidden"),t&&t.classList.add("hidden"),e&&e.classList.add("hidden"),s&&s.classList.add("hidden")}function B(){try{localStorage.setItem("dsa_trainer_settings",JSON.stringify(a.settings))}catch{}}function G(){try{const n=localStorage.getItem("dsa_trainer_settings");if(n){const t=JSON.parse(n);typeof t.sounds=="boolean"&&(a.settings.sounds=t.sounds),typeof t.contrast=="boolean"&&(a.settings.contrast=t.contrast),["monokai","github","dracula"].includes(t.theme)&&(a.settings.theme=t.theme)}}catch{}}function E(){document.documentElement.classList.toggle("high-contrast",!!a.settings.contrast);const n=document.getElementById("toggle-sounds"),t=document.getElementById("toggle-sounds-thumb");n&&t&&(a.settings.sounds?(n.className="w-12 h-6 rounded-full bg-primary relative transition-colors duration-300",t.className="absolute top-1 left-1 size-4 bg-white rounded-full transition-all duration-300 translate-x-6"):(n.className="w-12 h-6 rounded-full bg-outline-variant relative transition-colors duration-300",t.className="absolute top-1 left-1 size-4 bg-white rounded-full transition-all duration-300 translate-x-0"));const e=document.getElementById("toggle-contrast"),s=document.getElementById("toggle-contrast-thumb");e&&s&&(a.settings.contrast?(e.className="w-12 h-6 rounded-full bg-primary relative transition-colors duration-300",s.className="absolute top-1 left-1 size-4 bg-white rounded-full transition-all duration-300 translate-x-6"):(e.className="w-12 h-6 rounded-full bg-outline-variant relative transition-colors duration-300",s.className="absolute top-1 left-1 size-4 bg-white rounded-full transition-all duration-300 translate-x-0")),document.documentElement.setAttribute("data-syntax-theme",a.settings.theme),document.querySelectorAll("#theme-selector button").forEach(l=>{l.getAttribute("data-theme")===a.settings.theme?l.className="px-3 py-2 rounded-lg bg-primary/20 border-2 border-primary text-primary text-xs font-bold transition-all shadow-glow-primary":l.className="px-3 py-2 rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant text-xs font-medium transition-all hover:bg-surface-container-high"});const o=document.getElementById("code-snippet");o&&(o.className=`whitespace-pre leading-relaxed font-mono text-sm ${a.settings.theme==="dracula"?"text-pink-200":a.settings.theme==="github"?"text-blue-200":"text-yellow-200"}`)}function Y(){const n=document.getElementById("profile-name"),t=document.getElementById("profile-xp"),e=document.getElementById("profile-score"),s=document.getElementById("profile-email");n&&(n.innerText=a.userName),t&&(t.innerText=`${a.xp} XP`),e&&(e.innerText=`${H()}/10`),s&&(s.innerText=a.userEmail)}function H(){return a.answers.reduce((n,t)=>n+(t.predictCorrect?1:0)+(t.mcqCorrect?1:0),0)}function M(){const n=document.getElementById("roadmap-container"),t=document.getElementById("mobile-roadmap-container"),e=(l,r,c=!1)=>{const u=r<a.currentChallengeIndex,f=r===a.currentChallengeIndex,g=document.createElement("div"),h=r<=a.currentChallengeIndex||a.currentChallengeIndex>=w.length;g.className=`flex items-center gap-3.5 px-4 py-3 rounded-2xl border transition-all duration-300 ${h?"cursor-pointer hover:border-primary hover:scale-[1.01]":"cursor-not-allowed opacity-60"} ${f?"bg-surface-container-highest border-primary shadow-glow-primary active-pulse":u?"bg-surface-container/50 border-secondary/30":"border-transparent opacity-70"}`;const v=u?"check_circle":f?"track_changes":"lock",y=u?"text-secondary bg-secondary/20":f?"text-primary bg-primary/20":"text-outline bg-surface-container";return g.innerHTML=`
      <div class="flex-shrink-0">
        <div class="size-8 rounded-full ${y} flex items-center justify-center">
          <span class="material-symbols-outlined" style="font-size: 18px; ${u?"font-variation-settings: 'FILL' 1;":""}">${v}</span>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-white text-xs font-black tracking-tight truncate">Challenge ${r+1}</p>
        <p class="${f?"text-primary font-bold":"text-on-surface-variant"} text-[10px] uppercase tracking-widest">${u?"Completed":f?"Predicting...":"Locked"}</p>
      </div>
    `,h&&(g.onclick=()=>{m.playNav(),a.currentChallengeIndex=r,M(),A(),c&&N()}),g};n&&(n.innerHTML="",w.forEach((l,r)=>{n.appendChild(e(l,r,!1))})),t&&(t.innerHTML="",w.forEach((l,r)=>{t.appendChild(e(l,r,!0))}));const s=Math.min(a.currentChallengeIndex+1,5),i=`${Math.min(a.currentChallengeIndex,5)/5*100}%`;document.querySelectorAll(".progress-text-val").forEach(l=>{l.innerText=`${s}/5`});const o=document.getElementById("progress-bar");o&&(o.style.width=i),document.querySelectorAll(".mobile-progress-bar-fill").forEach(l=>{l.style.width=i})}function A(){const n=document.getElementById("challenge-card"),t=document.getElementById("results-card");if(a.currentChallengeIndex>=w.length){n&&n.classList.add("hidden"),t&&(t.classList.remove("hidden"),ee());return}n&&n.classList.remove("hidden"),t&&t.classList.add("hidden");const e=w[a.currentChallengeIndex];a.predictAnswered=!1,a.mcqAnswered=!1;const s=document.getElementById("challenge-title"),i=document.getElementById("problem-text"),o=document.getElementById("revealed-topic");s&&(s.innerText=`Challenge ${e.id} of 5`),i&&(i.innerText=e.problem),o&&(o.classList.add("hidden","opacity-0"),o.innerText=e.topic);const l=document.getElementById("pattern-buttons");if(l){l.innerHTML="";const h=[...V.filter(y=>y!==e.topic)].sort(()=>.5-Math.random()).slice(0,5);[e.topic,...h].sort(()=>.5-Math.random()).forEach(y=>{const x=document.createElement("button");x.className="flex items-center justify-between p-5 rounded-2xl border border-outline-variant bg-surface-container-low hover:bg-surface-container-highest transition-all group hover:border-primary glow-button text-left",x.innerHTML=`
        <span class="text-on-surface font-bold group-hover:text-white transition-colors">${y}</span>
        <span class="material-symbols-outlined text-outline group-hover:text-primary transition-all group-hover:translate-x-1" style="font-size: 20px;">chevron_right</span>
      `,x.onclick=()=>J(y),l.appendChild(x)})}const r=document.getElementById("prediction-section"),c=document.getElementById("prediction-feedback"),u=document.getElementById("approach-section"),f=document.getElementById("next-btn");r&&r.classList.remove("hidden"),c&&c.classList.add("hidden","opacity-0"),u&&u.classList.add("hidden"),f&&f.classList.add("hidden")}function J(n,t){if(a.predictAnswered)return;a.predictAnswered=!0;const e=w[a.currentChallengeIndex],s=n===e.topic;s?m.playSuccess():m.playError(),document.querySelectorAll("#pattern-buttons button").forEach(f=>{var h;f.disabled=!0,f.classList.remove("glow-button","hover:border-primary");const g=(h=f.querySelector("span"))==null?void 0:h.textContent;g===e.topic?f.className="flex items-center justify-between p-5 rounded-2xl border-2 border-secondary bg-secondary/10 text-left font-bold text-white shadow-glow-secondary":g===n&&!s?f.className="flex items-center justify-between p-5 rounded-2xl border-2 border-error bg-error-container/10 text-left font-bold text-error opacity-80":f.classList.add("opacity-40")});const o=document.getElementById("revealed-topic");o&&(o.classList.remove("hidden"),setTimeout(()=>o.classList.remove("opacity-0"),50));const l=document.getElementById("prediction-feedback"),r=document.getElementById("feedback-icon"),c=document.getElementById("feedback-status"),u=document.getElementById("feedback-msg");l&&r&&c&&u&&(l.classList.remove("hidden"),setTimeout(()=>l.classList.remove("opacity-0"),10),s?(l.className="p-5 rounded-2xl flex items-center gap-5 transition-reveal bg-secondary/10 border border-secondary text-secondary mt-6 shadow-glow-secondary",r.innerText="verified",c.innerText="Strategy Confirmed (+50 XP)",u.innerText=`Accurate identification! This problem is best tackled using the ${e.topic} pattern.`,j(50)):(l.className="p-5 rounded-2xl flex items-center gap-5 transition-reveal bg-error-container/10 border border-error text-error mt-6",r.innerText="error_outline",c.innerText="Pattern Misaligned",u.innerText=`You selected '${n}'. The optimal pattern for this problem is ${e.topic}.`)),a.answers[a.currentChallengeIndex]?(a.answers[a.currentChallengeIndex].predictCorrect=s,a.answers[a.currentChallengeIndex].selectedPredict=n):a.answers[a.currentChallengeIndex]={predictCorrect:s,mcqCorrect:!1,selectedPredict:n,selectedMCQIndex:-1},X(e)}function X(n){const t=document.getElementById("approach-section");if(!t)return;t.classList.remove("hidden");const e=document.getElementById("approach-explanation"),s=document.getElementById("time-complexity"),i=document.getElementById("space-complexity"),o=document.getElementById("interview-mistake"),l=document.getElementById("recognition-hint"),r=document.getElementById("code-snippet"),c=document.getElementById("copy-code-btn");e&&(e.innerText=n.explanation),s&&(s.innerText=n.complexity.time),i&&(i.innerText=n.complexity.space),o&&(o.innerText=n.mistake),l&&(l.innerText=n.hint),r&&(r.innerText=n.code),c&&(c.onclick=()=>{m.playClick(),navigator.clipboard.writeText(n.code).then(()=>{c.innerHTML='<span class="material-symbols-outlined" style="font-size: 14px;">check</span> Copied!',setTimeout(()=>{c.innerHTML='<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span> Copy Code'},2e3)})});const u=document.getElementById("mcq-question"),f=document.getElementById("mcq-options");u&&(u.innerText=n.mcq.question),f&&(f.innerHTML="",n.mcq.options.forEach((g,h)=>{const v=document.createElement("button");v.className="flex items-center gap-5 p-5 rounded-2xl border border-outline-variant bg-surface-container hover:border-secondary transition-all text-left group w-full",v.innerHTML=`
        <div class="size-8 rounded-full border-2 border-outline group-hover:border-secondary flex items-center justify-center text-sm font-black transition-all flex-shrink-0">
          ${String.fromCharCode(65+h)}
        </div>
        <span class="text-on-surface-variant font-bold group-hover:text-white transition-colors">${g}</span>
      `,v.onclick=()=>Z(h,n.mcq.correct),f.appendChild(v)}))}function Z(n,t,e){if(a.mcqAnswered)return;a.mcqAnswered=!0;const s=n===t;s?m.playSuccess():m.playError(),a.answers[a.currentChallengeIndex]&&(a.answers[a.currentChallengeIndex].mcqCorrect=s,a.answers[a.currentChallengeIndex].selectedMCQIndex=n),document.querySelectorAll("#mcq-options button").forEach((l,r)=>{l.disabled=!0,r===t?l.className="flex items-center gap-5 p-5 rounded-2xl border-2 border-secondary bg-secondary/10 text-left scale-[1.01] shadow-glow-secondary text-white font-bold w-full":r===n&&!s?l.className="flex items-center gap-5 p-5 rounded-2xl border-2 border-error bg-error-container/10 text-left opacity-80 text-error font-bold w-full":l.classList.add("opacity-40")}),s&&j(50);const o=document.getElementById("next-btn");o&&(o.classList.remove("hidden"),a.currentChallengeIndex===w.length-1?o.innerText="Complete Course & View Results":o.innerText="Complete Challenge & Next",o.onclick=()=>{m.playNav(),a.currentChallengeIndex++,M(),A(),window.scrollTo({top:0,behavior:"smooth"})})}function j(n){a.xp+=n,q()}function q(){document.querySelectorAll(".xp-counter-val").forEach(s=>{s.innerText=`${a.xp}`});const t=document.getElementById("xp-counter"),e=document.getElementById("xp-display-wrapper");t&&(t.innerText=`${a.xp}`),e&&(e.classList.add("scale-105","border-primary"),setTimeout(()=>{e.classList.remove("scale-105","border-primary")},600))}function ee(){const n=H(),t=a.xp,e=Math.round(n/10*100),s=document.getElementById("results-total-score"),i=document.getElementById("results-total-xp"),o=document.getElementById("results-accuracy");s&&(s.innerText=`${n} / 10`),i&&(i.innerText=`${t} XP`),o&&(o.innerText=`${e}%`);const l=document.getElementById("results-congrats-title"),r=document.getElementById("results-congrats-msg"),c=document.getElementById("results-grade-badge");l&&(l.innerText=`Congratulations, ${a.userName}!`),c&&(c.innerText=n>=9?"Gold Mastery Tier":n>=6?"Silver Competency Tier":"Developing Coder Tier"),r&&(n>=9?r.innerText="🎉 Exceptional algorithmic mastery! You demonstrated outstanding pattern recognition and complexity evaluation across all 5 core domains.":n>=6?r.innerText="👏 Solid job, Coder! You have built a strong problem-solving foundation in data structures and algorithm patterns.":r.innerText="💪 Great start, Coder! You've taken important strides toward mastering blind pattern prediction. Review the recommendations below to level up.");const u=document.getElementById("open-email-modal-btn");u&&(u.onclick=()=>{ne(n,t)}),te(),ie(),ae(),re(n,t);const f=document.getElementById("restart-btn");f&&(f.onclick=()=>{m.playNav(),oe()})}function te(n){const t=document.getElementById("scope-recommendations-list");if(!t)return;t.innerHTML="";const s=w.map((i,o)=>{const l=a.answers[o]||{predictCorrect:!1,mcqCorrect:!1},r=(l.predictCorrect?1:0)+(l.mcqCorrect?1:0);return{data:i,ans:l,score:r}}).filter(i=>i.score<2);if(s.length===0){t.innerHTML=`
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
    `;return}s.forEach(({data:i,ans:o,score:l})=>{let r="";!o.predictCorrect&&!o.mcqCorrect?r=`Re-examine the core mechanism of ${i.topic}. Key trigger to look for: "${i.hint}". Common pitfall: ${i.mistake}`:o.predictCorrect?r=`Great job recognizing the ${i.topic} pattern! Review complexity and implementation nuances: ${i.explanation}`:r=`Your theoretical knowledge on ${i.topic} is solid, but refine your initial pattern recognition when given problem statements. Clue: "${i.hint}"`;const c=document.createElement("div");c.className="p-4 rounded-xl bg-surface-container-highest/60 border border-outline-variant flex flex-col gap-2",c.innerHTML=`
      <div class="flex justify-between items-center text-xs font-bold">
        <span class="text-white flex items-center gap-1.5">
          <span class="material-symbols-outlined text-primary" style="font-size: 16px;">lightbulb</span>
          ${i.topic}
        </span>
        <span class="text-[10px] px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary font-mono">
          Score: ${l}/2
        </span>
      </div>
      <p class="text-xs text-on-surface-variant leading-relaxed">
        ${r}
      </p>
      <p class="text-[11px] italic text-outline mt-1 font-mono">
        Complexity: ${i.complexity.time} time | ${i.complexity.space} space
      </p>
    `,t.appendChild(c)})}function ne(n,t){$("email");const e=document.getElementById("email-recipient-input"),s=document.getElementById("email-subject-input"),i=document.getElementById("email-body-textarea"),o=document.getElementById("send-mailto-btn"),l=document.getElementById("copy-email-draft-btn"),r=document.getElementById("copy-email-btn-text"),c=Math.round(n/10*100),u=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),f=n>=9?"Gold Mastery Tier":n>=6?"Silver Competency Tier":"Developing Coder Tier",g=w.map((x,b)=>{const d=a.answers[b]||{predictCorrect:!1,mcqCorrect:!1},k=(d.predictCorrect?1:0)+(d.mcqCorrect?1:0);return`• ${x.topic}: ${k}/2 (Predict: ${d.predictCorrect?"✓":"✗"} | MCQ: ${d.mcqCorrect?"✓":"✗"})`}).join(`
`),h=w.map((x,b)=>{const d=a.answers[b]||{predictCorrect:!1,mcqCorrect:!1};return(d.predictCorrect?1:0)+(d.mcqCorrect?1:0)<2?`• ${x.topic}: Clue to remember - "${x.hint}". Pitfall to avoid - ${x.mistake}`:null}).filter(Boolean),v=h.length>0?h.join(`
`):"• Perfect Score Achieved! Recommended next step: Practice Monotonic Queue and Dynamic Programming optimizations.";e&&(e.value=a.userEmail),s&&(s.value=`[DSA Pattern Trainer Report] Candidate ${a.userName} - ${n}/10 (${c}%)`);const y=`Dear ${a.userName},

Congratulations on completing the 5-topic DSA Pattern Trainer evaluation curriculum!

=== PERFORMANCE SUMMARY ===
Candidate Full Name: ${a.userName}
Email Address: ${a.userEmail}
Evaluation Date: ${u}
Final Real Score: ${n} / 10 (${c}%)
Total Earned XP: ${t} XP
Performance Tier: ${f}

=== TOPIC-BY-TOPIC BREAKDOWN ===
${g}

=== SCOPE FOR IMPROVEMENT & RECOMMENDATIONS ===
${v}

=== CERTIFICATE CREDENTIAL ===
Certificate Serial: CERT-DSA-2026-${Math.abs(a.userName.split("").reduce((x,b)=>x+b.charCodeAt(0),0)*137).toString(16).toUpperCase().padStart(4,"0")}
Verification Status: Verified Client-Side Certificate

Keep coding and refining your algorithmic pattern recognition!

Best regards,
DSA Pattern Trainer Automated Evaluation
`;i&&(i.value=y),o&&(o.onclick=()=>{var C,T;m.playClick();const x=((C=e==null?void 0:e.value)==null?void 0:C.trim())||a.userEmail,b=((T=s==null?void 0:s.value)==null?void 0:T.trim())||"DSA Pattern Trainer Report",d=(i==null?void 0:i.value)||y,k=`mailto:${encodeURIComponent(x)}?subject=${encodeURIComponent(b)}&body=${encodeURIComponent(d)}`;window.open(k,"_blank")}),l&&(l.onclick=async()=>{m.playSuccess();const x=(i==null?void 0:i.value)||y;try{await navigator.clipboard.writeText(x),r&&(r.innerText="Copied to Clipboard!"),setTimeout(()=>{r&&(r.innerText="Copy Draft Text")},2e3)}catch(b){console.error("Failed to copy email draft",b)}})}function ie(){const n=document.getElementById("results-bar-chart");n&&(n.innerHTML="",w.forEach((t,e)=>{const s=a.answers[e]||{predictCorrect:!1,mcqCorrect:!1},i=(s.predictCorrect?1:0)+(s.mcqCorrect?1:0),o=i/2*100,l=i===2?"bg-secondary text-secondary":i===1?"bg-primary text-primary":"bg-error text-error",r=i===2?"bg-secondary/10 border-secondary/30":i===1?"bg-primary/10 border-primary/30":"bg-error/10 border-error/30",c=document.createElement("div");c.className="flex flex-col gap-2 p-4 rounded-xl bg-surface-container border border-outline-variant/40",c.innerHTML=`
      <div class="flex justify-between items-center text-sm font-bold">
        <span class="text-white flex items-center gap-2">
          <span class="size-2 rounded-full ${l.split(" ")[0]}"></span>
          ${t.topic}
        </span>
        <div class="flex items-center gap-3">
          <span class="text-xs px-2.5 py-1 rounded-full border ${r} ${l.split(" ")[1]}">
            Predict: ${s.predictCorrect?"✓":"✗"} | MCQ: ${s.mcqCorrect?"✓":"✗"}
          </span>
          <span class="text-white font-code-md">${i} / 2</span>
        </div>
      </div>
      <div class="h-3 w-full bg-surface-container-lowest rounded-full overflow-hidden p-[1px]">
        <div class="h-full ${l.split(" ")[0]} rounded-full transition-all duration-1000" style="width: ${o}%;"></div>
      </div>
    `,n.appendChild(c)}))}function ae(){const n=document.getElementById("results-focus-area");if(!n)return;const t=w.map((o,l)=>{const r=a.answers[l]||{predictCorrect:!1,mcqCorrect:!1},c=(r.predictCorrect?1:0)+(r.mcqCorrect?1:0);return{topic:o.topic,score:c,hint:o.hint,explanation:o.explanation}}),e=Math.min(...t.map(o=>o.score)),i=t.filter(o=>o.score===e)[0];e===2?(n.className="p-6 rounded-2xl bg-secondary/10 border border-secondary/40 text-secondary",n.innerHTML=`
      <div class="flex items-start gap-4">
        <span class="material-symbols-outlined text-secondary" style="font-size: 32px;">verified</span>
        <div>
          <h4 class="text-lg font-bold text-white mb-1">Mastery Achieved!</h4>
          <p class="text-sm opacity-90 leading-relaxed text-on-surface">
            Congratulations! You achieved a perfect score across all 5 DSA topics. You demonstrated complete proficiency in pattern recognition, complexity evaluation, and algorithm mechanics.
          </p>
        </div>
      </div>
    `):(n.className="p-6 rounded-2xl bg-primary/10 border border-primary/40 text-primary-fixed",n.innerHTML=`
      <div class="flex items-start gap-4">
        <span class="material-symbols-outlined text-primary" style="font-size: 32px;">center_focus_strong</span>
        <div>
          <h4 class="text-xs font-black uppercase tracking-widest text-primary mb-1">Recommended Focus Area</h4>
          <h3 class="text-xl font-bold text-white mb-2">${i.topic} (Score: ${i.score}/2)</h3>
          <p class="text-sm opacity-90 leading-relaxed text-on-surface-variant mb-3">
            Focus on strengthening your identification skills for <strong>${i.topic}</strong>. Key clue to watch for: <em>"${i.hint}"</em>
          </p>
          <p class="text-xs italic text-outline">${i.explanation}</p>
        </div>
      </div>
    `)}function re(n,t){const e=document.getElementById("cert-name-input"),s=document.getElementById("cert-name-display"),i=document.getElementById("cert-date-display"),o=document.getElementById("cert-score-display"),l=document.getElementById("cert-xp-display"),r=document.getElementById("cert-serial-display"),c=document.getElementById("download-pdf-cert-btn"),u=document.getElementById("print-cert-btn"),f=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});e&&(e.value=a.userName,e.oninput=g=>{a.userName=g.target.value||"Candidate",s&&(s.innerText=a.userName)}),s&&(s.innerText=a.userName),i&&(i.innerText=f),o&&(o.innerText=`${n} / 10`),l&&(l.innerText=`${t} XP`),r&&(r.innerText=`CERT-DSA-2026-${Math.abs(a.userName.split("").reduce((g,h)=>g+h.charCodeAt(0),0)*137).toString(16).toUpperCase().padStart(4,"0")}`),c&&(c.onclick=()=>{se(n,t)}),u&&(u.onclick=()=>{L(n,t)})}async function se(n,t){m.playSuccess();const e=document.getElementById("download-pdf-text");e&&(e.innerText="Generating PDF...");const s=a.userName||"Candidate",i=document.getElementById("printable-certificate");if(!i){L(n,t),e&&(e.innerText="Download PDF Certificate");return}const o=document.getElementById("cert-name-display"),l=document.getElementById("cert-date-display"),r=document.getElementById("cert-score-display"),c=document.getElementById("cert-xp-display"),u=document.getElementById("cert-serial-display"),f=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),g=`CERT-DSA-2026-${Math.abs(s.split("").reduce((v,y)=>v+y.charCodeAt(0),0)*137).toString(16).toUpperCase().padStart(4,"0")}`;o&&(o.innerText=s),l&&(l.innerText=f),r&&(r.innerText=`${n} / 10`),c&&(c.innerText=`${t} XP`),u&&(u.innerText=g),i.classList.add("pdf-export-mode");const h=window.html2pdf;if(h){const v={margin:[8,8,8,8],filename:`DSA_Certificate_${s.replace(/\s+/g,"_")}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff"},jsPDF:{unit:"mm",format:"a4",orientation:"landscape"}};try{await h().set(v).from(i).save(),e&&(e.innerText="PDF Downloaded!")}catch(y){console.error("html2pdf failed, falling back to print window",y),L(n,t),e&&(e.innerText="Download PDF Certificate")}finally{i.classList.remove("pdf-export-mode"),setTimeout(()=>{e&&(e.innerText="Download PDF Certificate")},3e3)}}else i.classList.remove("pdf-export-mode"),L(n,t),e&&(e.innerText="Download PDF Certificate")}function L(n,t){m.playClick();const e=a.userName||"Candidate",s=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),i=`CERT-DSA-2026-${Math.abs(e.split("").reduce((l,r)=>l+r.charCodeAt(0),0)*137).toString(16).toUpperCase().padStart(4,"0")}`,o=window.open("","_blank","width=950,height=650");o?(o.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>DSA Certificate - ${e}</title>
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
          <div class="name">${e}</div>
          <div class="desc">has successfully completed the 5-topic blind pattern prediction curriculum, mastering problem identification, complexity trade-offs, and verification checks.</div>
          <div class="stats">
            <div><div class="label">Serial Number</div><div class="val" style="color:#d97706; font-family:monospace;">${i}</div></div>
            <div><div class="label">Issue Date</div><div class="val">${s}</div></div>
            <div><div class="label">Score Achieved</div><div class="val" style="color:#0d9488;">${n} / 10</div></div>
            <div><div class="label">XP Credential</div><div class="val" style="color:#d97706;">${t} XP</div></div>
          </div>
        </div>
        <script>
          setTimeout(() => { window.print(); }, 500);
        <\/script>
      </body>
      </html>
    `),o.document.close()):window.print()}function oe(){a.currentChallengeIndex=0,a.xp=0,a.totalScore=0,a.answers=[],a.predictAnswered=!1,a.mcqAnswered=!1,q(),M(),A(),window.scrollTo({top:0,behavior:"smooth"})}document.addEventListener("DOMContentLoaded",_);

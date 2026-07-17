export type LeetCodeProblem = {
  name: string;
  difficulty: "easy" | "medium" | "hard";
  url: string;
  note: string;
};

export type DsaPattern = {
  slug: string;
  name: string;
  shortDescription: string;
  status: "real" | "stub";
  whenToUse: string; // markdown
  whyItMatters: string; // markdown
  problems: LeetCodeProblem[];
  commonMistakes: string[]; // list
};

export const dsaPatterns: DsaPattern[] = [
  {
    slug: "two-pointers",
    name: "Two Pointers",
    shortDescription:
      "Coordinated pointers moving through an array or string to reduce O(n²) brute force to O(n).",
    status: "real",
    whenToUse:
      "Look for **two pointers** the moment you see any of these signals in a problem:\n\n- The input is a **sorted array or string** and you need to find a pair (or triple) with a target property (sum, difference, product).\n- You're checking a **palindrome or symmetry** — one pointer from each end.\n- The problem asks for a **subarray or substring** meeting a constraint (window slides but this is technically sliding window — a special case of two pointers).\n- The brute force is O(n²) 'try all pairs' and you sense there's a linear-time solution.\n- You're comparing **two arrays in parallel** (merging, intersecting) — one pointer in each.\n\nIf sorting the input unlocks the two-pointer pattern and there's no constraint against O(n log n), sort first, then apply the pattern.",
    whyItMatters:
      "Two pointers is the **single most-used pattern in medium-difficulty interviews** because it turns a large class of O(n²) 'try every pair' problems into O(n) with O(1) extra space — the exact tradeoff interviewers love to see.\n\nOnce you internalize the pattern, you'll recognize it in ~15-20% of array/string problems. The trick is training your eye to spot the signals — sorted input, symmetry, 'find a pair', comparing two sequences — and knowing that a coordinated pointer motion is the right response.\n\nInterviewers use two-pointer problems as **taste tests** — a candidate who reaches for a hashmap on 'Two Sum in a sorted array' shows they don't recognize the pattern, and it's a red flag for the harder problems that follow.",
    problems: [
      {
        name: "Valid Palindrome",
        difficulty: "easy",
        url: "https://leetcode.com/problems/valid-palindrome/",
        note: "The canonical warm-up. One pointer from each end, skip non-alphanumeric.",
      },
      {
        name: "Two Sum II — Input Array Is Sorted",
        difficulty: "medium",
        url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        note: "The pattern in its purest form. If sum too big, move right pointer left; if too small, move left pointer right.",
      },
      {
        name: "Container With Most Water",
        difficulty: "medium",
        url: "https://leetcode.com/problems/container-with-most-water/",
        note: "Same shape as Two Sum II, but the decision rule (move the shorter side) is the whole insight. Hard to intuit; easy once seen.",
      },
      {
        name: "3Sum",
        difficulty: "medium",
        url: "https://leetcode.com/problems/3sum/",
        note: "Sort, then fix one element and run Two Sum II on the rest. Watch for duplicate-skipping in both the outer loop and inner two-pointer scan.",
      },
      {
        name: "Trapping Rain Water",
        difficulty: "hard",
        url: "https://leetcode.com/problems/trapping-rain-water/",
        note: "Two pointers + tracking max_left/max_right. If you get this in an interview and see the pattern, it's a strong signal.",
      },
    ],
    commonMistakes: [
      "Reaching for a hashmap on a sorted-array Two-Sum problem — signals you don't recognize the pattern",
      "Moving both pointers on every iteration instead of only the one dictated by the comparison — breaks correctness",
      "Forgetting to skip duplicates in 3Sum-style problems, producing repeated triplets in the output",
      "Not asking whether the array is sorted (the pattern assumes it) — if the interviewer says no, propose sorting first and discuss the O(n log n) cost tradeoff",
    ],
  },
  {
    slug: "sliding-window",
    name: "Sliding Window",
    shortDescription:
      "Maintain a window over contiguous elements, expanding and shrinking as constraints are met.",
    status: "stub",
    whenToUse: "Coming soon — same template as Two Pointers.",
    whyItMatters: "Coming soon.",
    problems: [],
    commonMistakes: [],
  },
  {
    slug: "dfs-bfs",
    name: "DFS / BFS",
    shortDescription:
      "Graph and tree traversal — DFS via recursion or explicit stack, BFS via queue.",
    status: "stub",
    whenToUse: "Coming soon.",
    whyItMatters: "Coming soon.",
    problems: [],
    commonMistakes: [],
  },
  {
    slug: "backtracking",
    name: "Backtracking",
    shortDescription: "Try, recurse, undo — for combinatorial search problems.",
    status: "stub",
    whenToUse: "Coming soon.",
    whyItMatters: "Coming soon.",
    problems: [],
    commonMistakes: [],
  },
  {
    slug: "dynamic-programming",
    name: "Dynamic Programming",
    shortDescription:
      "Break a problem into overlapping subproblems, memoize or tabulate results.",
    status: "stub",
    whenToUse: "Coming soon.",
    whyItMatters: "Coming soon.",
    problems: [],
    commonMistakes: [],
  },
  {
    slug: "binary-search",
    name: "Binary Search",
    shortDescription:
      "Halve the search space each step — on sorted arrays or on answer spaces.",
    status: "stub",
    whenToUse: "Coming soon.",
    whyItMatters: "Coming soon.",
    problems: [],
    commonMistakes: [],
  },
  {
    slug: "heap",
    name: "Heap / Priority Queue",
    shortDescription:
      "Keep the top-k or the running median in O(log n) per operation.",
    status: "stub",
    whenToUse: "Coming soon.",
    whyItMatters: "Coming soon.",
    problems: [],
    commonMistakes: [],
  },
  {
    slug: "union-find",
    name: "Union-Find",
    shortDescription:
      "Track connected components efficiently — for grouping and cycle detection.",
    status: "stub",
    whenToUse: "Coming soon.",
    whyItMatters: "Coming soon.",
    problems: [],
    commonMistakes: [],
  },
  {
    slug: "trie",
    name: "Trie",
    shortDescription:
      "Prefix tree — for word-lookup, autocomplete, and prefix-based problems.",
    status: "stub",
    whenToUse: "Coming soon.",
    whyItMatters: "Coming soon.",
    problems: [],
    commonMistakes: [],
  },
  {
    slug: "topological-sort",
    name: "Topological Sort",
    shortDescription:
      "Order dependencies via DAG traversal — for scheduling, build systems, course sequences.",
    status: "stub",
    whenToUse: "Coming soon.",
    whyItMatters: "Coming soon.",
    problems: [],
    commonMistakes: [],
  },
];

export function getPattern(slug: string): DsaPattern | undefined {
  return dsaPatterns.find((p) => p.slug === slug);
}

/**
 * 3 ways to sum to n - from simple to advanced
 * Author: Maotou
 * Date: 2025-02-19
 */

// Solution 1: Simple loop (Iterative)
// Time complexity: O(n)
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

// Solution 2: Math formula (Gauss formula)
// Time complexity: O(1)
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

// Solution 3: Recursive
// Time complexity: O(n)
function sum_to_n_c(n: number): number {
  if (n === 1) {
    return 1;
  }

  return n + sum_to_n_c(n - 1);
}

// Test cases
console.log(sum_to_n_a(10)); // Output: 55
console.log(sum_to_n_b(10)); // Output: 55
console.log(sum_to_n_c(10)); // Output: 55

// Conclusion: The best solution is the second one - Math formula (Gauss formula) because it has the lowest time complexity.

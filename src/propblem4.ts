/**
 * Iterative approach.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Adds numbers from 1 to n using a simple for loop.
 * Easy to understand, safe, but less efficient for very large n.
 */
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Recursive approach.
 * Time Complexity: O(n)
 * Space Complexity: O(n) due to call stack
 * 
 * Each call reduces n by 1 until reaching the base case.
 * Elegant in style but inefficient and may cause stack overflow 
 * for large values of n.
 */
function sum_to_n_b(n: number): number {
    if (n == 1) return 1;
    return n + sum_to_n_b(n - 1);
}

/**
 * Mathematical formula (Gauss' approach).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * 
 * Uses the formula n*(n+1)/2 to compute the sum directly.
 * Fastest and most efficient method, suitable for production.
 */
function sum_to_n_c(n: number): number {
    return n * (n + 1) / 2;
}

console.log(sum_to_n_a(10));
console.log(sum_to_n_b(10));
console.log(sum_to_n_c(10));

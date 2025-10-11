// expensive function for an example
function expensiveCalculation(n: number): number {
  console.log(`calculating for ${n}`);
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += Math.sqrt(i);
  }
  return result + n;
}
// my wrapper function
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  // creating a cache objectm which will live in closure
}

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
  const cache: Record<string, any> = {};

  return ((...args: any[]) => {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log(`Fetching from cache key: ${key}`);
      return cache[key];
    }

    const result = fn(...args);

    cache[key] = result;

    return result;
  }) as T;
}

console.log('--- Memoization ---');
const memoizedCalc = memoize(expensiveCalculation);

console.log('First call with 5:');
console.log(memoizedCalc(5));

console.log('\nSecond call with 5:');
console.log(memoizedCalc(5));

console.log('\nFirst call with 10:');
console.log(memoizedCalc(10));

console.log('\nThird call with 5:');
console.log(memoizedCalc(5));
process.exit(0);

function createCounter(n: number): () => void {
  return function () {
    console.log(n++);
  };
}

const counter = createCounter(10);
counter(); // 10
counter(); // 11
counter(); // 12
/**
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */

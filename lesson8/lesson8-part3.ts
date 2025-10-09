const Calculator = (() => {
  // private part
  function validate(n: number): void {
    if (typeof n != 'number' || isNaN(n)) {
      throw new Error('invalid number');
    }
  }

  function log(operation: string, a: number, b: number, result: number): void {
    console.log(`${operation}: ${a} and ${b} = ${result}`);
  }
  function operate(
    operation: string,
    a: number,
    b: number,
    fn: (x: number, y: number) => number,
  ): number {
    validate(a);
    validate(b);
    const result = fn(a, b);
    log(operation, a, b, result);
    return result;
  }
  // public part
  return {
    add(a: number, b: number): number {
      return operate('addition', a, b, (x, y) => x + y);
    },
    multiply(a: number, b: number): number {
      return operate('multiplication', a, b, (x, y) => x * y);
    },
    subtract(a: number, b: number): number {
      return operate('subtraction', a, b, (x, y) => x - y);
    },
    division(a: number, b: number): number {
      if (b === 0) throw new Error('Division by zero');
      return operate('division', a, b, (x, y) => x / y);
    },
  };
})();

console.log(`Addition: ${Calculator.add(5, 3)}`);
console.log(`Multiplication: ${Calculator.multiply(4, 2)}`);
try {
  Calculator.add('invalid' as any, 5);
} catch (e) {
  if (e instanceof Error) {
    console.log(`Caught expected error: ${e.message}`);
  }
}

// let x = 1;

// const logToConsole = function () {
//   console.log(x);
// };

// logToConsole();
// x = 2;

// test task 1

// function makeCounter(count: number) {
//   return function () {
//     return count++;
//   };
// }

// let counter = makeCounter(0);
// let counter2 = makeCounter(0);
// console.log(counter());
// console.log(counter());
// console.log(counter2());
// console.log(counter2());
// export {};

// test task 2

function createIncrement() {
  let count = 0;
  function increment() {
    count++;
  }
  function log() {
    let message = `Count is ${count}`;
    console.log(message);
  }
  return { increment, log };
}

const counter = createIncrement();
counter.increment();
counter.increment();
counter.increment();
counter.log();
export {};

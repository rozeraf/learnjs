class Counter {
  constructor(private _count: number = 0) {}
  increment() {
    console.log(this._count + 1);
  }
}
const counter = new Counter();
// const standaloneIncrement = counter.increment;
// standaloneIncrement();
const boundIncrement = counter.increment.bind(counter);
boundIncrement();
const user1 = { name: 'Ivan' };
const user2 = { name: 'maria' };
function sayName(this: { name: string }) {
  console.log(this.name);
}
sayName.call(user1);
sayName.call(user2);
class Timer {
  constructor(public message: string = 'abcd') {}
  start() {
    setTimeout(() => {
      console.log(this.message);
    }, 1000);
  }
}
const timer = new Timer('Привет');
timer.start();

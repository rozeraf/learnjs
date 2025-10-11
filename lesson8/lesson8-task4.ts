function createGreeter(greeting: string) {
  // my code here. this function ust return NEW function.
  // new function must accept one arg `name` (string),
  // and return string, combining `greeting` from closure and `name`
  function combiner(name: string) {
    return `${greeting}, ${name}`;
  }
  return combiner;
}
console.log('--- Function Factory ---');
const sayHello = createGreeter('hello');
const sayHi = createGreeter('hi');
const sayWelcome = createGreeter('welcome');

console.log(sayHello('Alice'));
console.log(sayHi('bob'));
console.log(sayWelcome('charlie'));
console.log(sayHello('dave'));

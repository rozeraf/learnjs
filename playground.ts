function identity<T>(x: T): T {
  return x;
}
console.log(identity(5));
console.log();

function logKeys<T extends Record<string, any>>(obj: T) {
  for (const key in obj) {
    console.log(key);
    console.log(obj[key]);
    console.log();
  }
}
logKeys({ name: 'Raf', age: 13 });

// задача 1
const numbers: number[] = [1, 2, 3, 4, 5];
console.log(numbers[2]);
numbers.push(6);
console.log(numbers);
// задача 2
const names: string[] = ["иван", "раф", "таир"];
names.forEach((name) => {
  console.log(`Привет, ${name}`);
});
// повтор твоего кода
const numbers2: number[] = [10, 20, 30];
let sum = 0; // вероятно затем, чтобы изначальный результат будет 0, после чего будет прибавляться?
for (const num of numbers2) {
  // i - это индекс (0,1,2) - ладно, допустим.
  // numbers[i] - это элемент, например 10, 20 или 30. - допустим.
  sum = sum + num; 
}
console.log(sum);
// задача 3
const sumArray = (data: number[]): number => {
  let sum = 0;
  for (const num of data) {
    sum = sum + num;
  }
  return sum;
};
console.log(sumArray(numbers));

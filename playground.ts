function increment_all(arr: number[]) {
  arr.forEach((v, i, a) => (a[i] = v + 1));
  return arr;
}
console.log(increment_all([1, 3, 54]));

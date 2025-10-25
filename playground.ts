type Fn = (n: number, i: number) => boolean;

function filter(arr: number[], fn: Fn): number[] {
  const result: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i) && result.push(arr[i]);
  }
  return result;
}

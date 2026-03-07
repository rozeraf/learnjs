type Roots = { x1: number; x2: number };

const solveViet = (a: number, b: number, c: number) => {
  if (a === 0) 'thats not a quadratic equation';
  const p = -b / a;
  const q = c / a;
  const discr = b ** 2 - 4 * a * c;
  if (discr < 0) 'theres no roots';
};

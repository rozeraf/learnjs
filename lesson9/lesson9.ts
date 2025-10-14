// task 1
type Point = readonly [number, number];
const logPoint = ([x, y]: Point) => `Coordinates: X=${x}, Y=${y}`;
const points: Point[] = [
  [1, 2],
  [3, 6],
  [9, 18],
];
points.forEach((p) => console.log(logPoint(p)));
// task 2
const processApiResponse = (response: unknown) => {
  if (typeof response === 'string') return response.toUpperCase();
  if (typeof response === 'number') return response ** 2;
  if (Array.isArray(response)) return response.length;
  return `unknown type: ${typeof response}`;
};
console.log(processApiResponse('\nwhen the lights out, its less dangerous'));
console.log(processApiResponse(27));
console.log(
  processApiResponse([
    'here we are now, entertain us',
    'i feel stupid and cotagious',
    'here we are now, entertain us',
    'a mulatto, an albino',
  ]),
);
console.log(processApiResponse(null));

// task 3
type Shape = 'circle' | 'square' | 'triangle';

const getArea = (shape: Shape): number => {
  const areas: Record<Shape, number> = {
    circle: Math.PI * 5 ** 2,
    square: 5 ** 2,
    triangle: (5 * 8) / 2,
  };

  const result = areas[shape];

  return result;
};
console.log('\n', getArea('circle'));
console.log(getArea('square'));

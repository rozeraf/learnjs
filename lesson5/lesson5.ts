import { ModuleKind } from 'typescript';

// task 1 & 2 & 3
class Car {
  constructor(
    public brand: string,
    public model: string,
    public year: number,
    private _vinCode: string,
  ) {}

  getDescription(): string {
    return `${this.brand} ${this.model}, ${this.year}`;
  }

  getVin(): string {
    return this._vinCode;
  }
}
const garage: Car[] = [
  new Car('Lamorgini', 'Huracan', 2011, 'policecaronly'),
  new Car('Toyota', 'Camry', 2021, 'policecarmaybe'),
];

// const car1 = new Car("Toyota", "Camry", 2021, "policecarmaybe");
// garage.push(car1);

// const car2 = new Car("Lamorgini", "Huracan", 2011, "policecaronly");
// garage.push(car2);

for (const car of garage) {
  console.log(car.getDescription());
}
// console.log(car1.getDescription());
// console.log(car2.getDescription());
// console.log(car1.getVin())
function findCarByModel(model: string): Car | undefined {
  return garage.find((car) => car.model === model);
}
const input: string | null = prompt('enter car model: ');

if (input !== null) {
  const foundCar = findCarByModel(input);

  if (foundCar) {
    console.log(`
        Brand: ${foundCar.brand}
        Model: ${foundCar.model}
        Year: ${foundCar.year}
        Vin code: ${foundCar.getVin()}
    `);
  } else {
    console.log('You cant go further');
  }
}

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

  getFullDescription(): string {
    return `Brand: ${this.brand}
        Model: ${this.model}
        Year: ${this.year}
    Vin code: ${this._vinCode}`;
  }

  getVin(): string {
    return this._vinCode;
  }
}
const garage: Car[] = [
  new Car('Lamorgini', 'Huracan', 2011, 'policecaronly'),
  new Car('Toyota', 'Camry', 2021, 'policecarmaybe'),
];
for (const car of garage) {
  console.log(car.getDescription());
}
function findCarByModel(model: string): Car | undefined {
  return garage.find((car) => car.model.toLowerCase === model.toLowerCase);
}
const input: string | null = prompt('enter car model: ');

const foundCar = input && findCarByModel(input);

if (foundCar) {
  console.log(foundCar.getFullDescription());
} else {
  console.log('You cant go further');
}

// task 1 & 2 & 3
class Car {
    constructor(
        public brand: string,
        public model: string,
        public year: number,
        private _vinCode: string
    ) {}

    getDescription(): string {
        return `${this.brand} ${this.model}, ${this.year}`;
    }

    getVin(): string {
        return this._vinCode;
    }
};

const car1 = new Car("Toyota", "Camry", 2021, "policecarmaybe");
const car2 = new Car("Lamorgini", "Huracan", 2011, "policecaronly");
console.log(car1.getDescription());
console.log(car2.getDescription());
console.log(car1.getVin())
// task 1
type User = {
    name: string;
    age: number;
};
const user: User = {
    name: "raf",
    age: 14
}
console.log(user.name)
// task 2
interface Car {
    brand: string;
    model: string;
    year: number;
    isElectric?: boolean;
    getDescription(): string;
}
const bmw: Car = {
    brand: "bmw",
    model: "m3",
    year: 2000,
    getDescription() {
        return `${this.brand} ${this.model} ${this.year}`
    } 
}
const mercedes: Car = {
    brand: "mercedes",
    model: "cls63",
    year: 2011,
    isElectric: true,
    getDescription() {
        return `${this.brand} ${this.model} ${this.year}`
    } 
}
console.log(bmw.getDescription())
// task 3
const printUser = (user: User): void => {
    console.log(`Пользователь: ${user.name}, Возраст: ${user.age}`)
}
printUser(user)
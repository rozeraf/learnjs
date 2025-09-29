function add(a: number, b: number): number {
    return a + b;
}
console.log(add(5, 10));

const greet = (name: string, age?: number): string => {
    return age ? `Привет, ${name}, тебе ${age} лет.` : `Привет, ${name}`
};
console.log(greet("Алекс"));
console.log(greet("Мария", 30))
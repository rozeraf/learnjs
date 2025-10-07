const calculator = {
  multiplier: 2,
  numbers: [1, 2, 3],

  // Исправь метод, чтобы он возвращал [2, 4, 6]
  getDoubled() {
    return this.numbers.map((n) => {
      return n * this.multiplier; // ошибка здесь
    });
  },
};
console.log(calculator.getDoubled());

class Counter {
  private count = 0;

  increment() {
    console.log(`Обычный: ${++this.count}`);
  }
  incrementArrow = () => {
    console.log(`Стрелочный: ${++this.count}`);
  };
}
const counter = new Counter();
console.log('Вызов как методы:');
counter.increment();
counter.incrementArrow();
console.log('\nВызов "оторванных" методов:');
const inc = counter.increment;
const incArrow = counter.incrementArrow;

try {
  inc();
} catch (error) {
  if (error instanceof Error) {
    console.log(`inc() упал с ошибкой: ${error.message}`);
  }
}
incArrow();

export {};

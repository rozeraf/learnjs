# 📘 Урок 8: "Замыкания и Области видимости"

## Часть 1: Теория (15 минут чтения)

### Execution Context & Scope Chain

```typescript
// Пример 1: Базовое замыкание
function outer() {
  const outerVar = 'Я из outer';

  function inner() {
    console.log(outerVar); // ✅ Доступ к outerVar
  }

  return inner;
}

const myFunc = outer(); // outer выполнилась и завершилась
myFunc(); // "Я из outer" — НО outerVar ещё жива!

// Почему? Потому что inner "захватила" outerVar в замыкание
```

### Визуализация Scope Chain

```typescript
let global = 'global';

function level1() {
  let var1 = 'level1';

  function level2() {
    let var2 = 'level2';

    function level3() {
      let var3 = 'level3';

      // Поиск переменных:
      console.log(var3); // ✅ Найдена в level3
      console.log(var2); // ✅ Поднялись в level2
      console.log(var1); // ✅ Поднялись в level1
      console.log(global); // ✅ Поднялись в global
      console.log(var4); // ❌ ReferenceError (нигде нет)
    }

    level3();
  }

  level2();
}

level1();
```

**Ключевое правило:** Функция ищет переменные **снизу вверх** по цепочке
scope'ов, пока не найдёт или не дойдёт до глобальной области.

---

## Часть 2: Классические ловушки (1-2 часа)

### Задача 1: Цикл и `var` 🔥

```typescript
// ПРОБЛЕМНЫЙ КОД (не исправляй сразу!)
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

// Вопрос 1: Что выведет? (напиши ответ)
// Вопрос 2: Почему так происходит? (объясни механику)
```

**Твоя задача:** Исправь **3 способами:**

#### Способ 1: `let`

```typescript
// Твой код здесь
```

#### Способ 2: IIFE (Immediately Invoked Function Expression)

```typescript
for (var i = 0; i < 3; i++) {
  // Твой код здесь (оберни setTimeout в IIFE)
}
```

<details>
<summary>💡 Подсказка для IIFE</summary>

```typescript
(function (j) {
  // используй j вместо i
})(i); // передай i как аргумент
```

</details>

#### Способ 3: `bind`

```typescript
function logNumber(num: number) {
  console.log(num);
}

for (var i = 0; i < 3; i++) {
  // Твой код здесь (используй bind)
}
```

**Критерий успеха:** Все 3 варианта выводят `0, 1, 2`.

---

### Задача 2: Приватные переменные 🏦

```typescript
// ЗАДАНИЕ: Реализуй функцию
function createBankAccount(initialBalance: number) {
  // Твой код здесь
  // balance должен быть НЕДОСТУПЕН снаружи

  return {
    deposit(amount: number): void {
      // ...
    },
    withdraw(amount: number): void {
      // ...
      // Если amount > balance, выброси ошибку
    },
    getBalance(): number {
      // ...
    },
  };
}

// ТЕСТЫ (должны пройти):
const account = createBankAccount(100);

account.deposit(50);
console.log(account.getBalance()); // 150

account.withdraw(30);
console.log(account.getBalance()); // 120

console.log(account.balance); // undefined (приватная!)

try {
  account.withdraw(200); // Error: Insufficient funds
} catch (e) {
  console.log('Правильно! Ошибка поймана');
}
```

**Критерий успеха:**

- ✅ `balance` недоступен напрямую
- ✅ Методы работают корректно
- ✅ `withdraw` выбрасывает ошибку при нехватке средств

---

### Задача 3: Memory Leak (бонус, опционально)

```typescript
// ПРОБЛЕМНЫЙ КОД
function attachHandler() {
  const hugeArray = new Array(1000000).fill('data');

  document.getElementById('btn')?.addEventListener('click', () => {
    console.log('clicked');
    // hugeArray НЕ используется, но...
  });
}

// Вопрос: В чём проблема?
// Ответ: (напиши текстом)

// Как исправить? (2 способа)
```

<details>
<summary>💡 Подсказка</summary>

Проблема: `hugeArray` захвачен в closure, даже если не используется. При каждом
вызове `attachHandler` создаётся новый массив, который не удаляется из памяти.

Решения:

1. Удалить ссылку на `hugeArray` после использования
2. Вынести handler наружу, где нет доступа к `hugeArray`
</details>

---

## Часть 3: Продвинутые паттерны (1-2 часа)

### Задача 4: Module Pattern 🧩

```typescript
// ЗАДАНИЕ: Создай модуль Calculator

const Calculator = (() => {
  // ПРИВАТНЫЕ функции/переменные
  function validate(n: number): void {
    if (typeof n !== 'number' || isNaN(n)) {
      throw new Error('Invalid number');
    }
  }

  function log(operation: string, a: number, b: number, result: number): void {
    console.log(`${operation}: ${a} and ${b} = ${result}`);
  }

  // ПУБЛИЧНЫЙ API
  return {
    add(a: number, b: number): number {
      // Твой код здесь
      // Используй validate и log
    },

    multiply(a: number, b: number): number {
      // Твой код здесь
    },

    subtract(a: number, b: number): number {
      // Твой код здесь
    },
  };
})();

// ТЕСТЫ:
console.log(Calculator.add(5, 3)); // "add: 5 and 3 = 8" → 8
console.log(Calculator.multiply(4, 2)); // "multiply: 4 and 2 = 8" → 8

try {
  Calculator.add('invalid' as any, 5); // Error: Invalid number
} catch (e) {
  console.log('Правильно! Валидация работает');
}

console.log(Calculator.validate); // undefined (приватная!)
```

**Критерий успеха:**

- ✅ Публичные методы доступны
- ✅ Приватные функции НЕ доступны снаружи
- ✅ Валидация работает
- ✅ Логирование работает

---

### Задача 5: Function Factory 🏭

```typescript
// ЗАДАНИЕ: Создай фабрику приветствий

function createGreeter(greeting: string) {
  // Твой код здесь
  // Верни функцию, которая принимает имя
}

// ТЕСТЫ:
const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');
const sayWelcome = createGreeter('Welcome');

console.log(sayHello('Alice')); // "Hello, Alice!"
console.log(sayHi('Bob')); // "Hi, Bob!"
console.log(sayWelcome('Charlie')); // "Welcome, Charlie!"

// Проверка, что каждая функция независима:
console.log(sayHello('Dave')); // "Hello, Dave!" (не изменилось)
```

**Критерий успеха:** Каждая созданная функция "помнит" свой `greeting`.

---

### Задача 6: Memoization 💾

```typescript
// ЗАДАНИЕ: Оптимизируй дорогую функцию

function expensiveCalculation(n: number): number {
  console.log(`Calculating for ${n}...`);
  // Симуляция долгого вычисления
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result + n;
}

function memoize<T extends (...args: any[]) => any>(fn: T): T {
  // Твой код здесь
  // Используй closure для хранения кэша
}

// ТЕСТЫ:
const memoized = memoize(expensiveCalculation);

console.log(memoized(5)); // "Calculating for 5..." → результат
console.log(memoized(5)); // результат (БЕЗ лога — взято из кэша!)
console.log(memoized(10)); // "Calculating for 10..." → результат
console.log(memoized(5)); // результат (из кэша)
```

**Критерий успеха:**

- ✅ Первый вызов с аргументом — вычисление
- ✅ Повторный вызов с тем же аргументом — из кэша (без лога)
- ✅ TypeScript типы сохранены

<details>
<summary>💡 Подсказка</summary>

```typescript
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache: Record<string, any> = {}; // closure переменная

  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  }) as T;
}
```

</details>

---

## Часть 4: Closure vs `this` (30 минут)

### Задача 7: Стрелочная vs Обычная функция 🎯

```typescript
class Counter {
  private count = 0;

  // Обычный метод
  increment() {
    this.count++;
    console.log(`Обычный: ${this.count}`);
  }

  // Стрелочная функция (class field)
  incrementArrow = () => {
    this.count++;
    console.log(`Стрелочный: ${this.count}`);
  };
}

const counter = new Counter();

// Тест 1: Вызов как методы
counter.increment(); // ?
counter.incrementArrow(); // ?

// Тест 2: "Отрываем" методы
const inc = counter.increment;
const incArrow = counter.incrementArrow;

inc(); // Что произойдёт? Почему?
incArrow(); // Что произойдёт? Почему?
```

**Твоя задача:**

1. Запусти код и запиши результаты
2. Объясни текстом, почему `inc()` падает, а `incArrow()` работает
3. Нарисуй (текстом) схему, где хранятся оба метода (prototype vs instance)

**Вопросы для размышления:**

- Где хранится `increment` (в прототипе или в экземпляре)?
- Где хранится `incrementArrow`?
- Почему стрелочная функция "запоминает" `this`?

---

## Часть 5: Итоговый проект — `useState` Replica (1-2 часа)

### Задача 8: Реализуй React Hook 🪝

```typescript
// ЗАДАНИЕ: Реализуй упрощённый useState

function useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
  // Твой код здесь
  // state должен храниться в closure
  // return [getter, setter]
}

// ТЕСТЫ:

// Тест 1: Базовая работа
const [getCount, setCount] = useState(0);

console.log(getCount()); // 0

setCount(5);
console.log(getCount()); // 5

setCount(10);
console.log(getCount()); // 10

// Тест 2: Независимость экземпляров
const [getName, setName] = useState('Alice');
const [getAge, setAge] = useState(25);

setName('Bob');
setAge(30);

console.log(getName()); // "Bob"
console.log(getAge()); // 30
console.log(getCount()); // 10 (не изменился!)

// Тест 3: Типы сохранены
const [getFlag, setFlag] = useState(true);
setFlag(false);
// setFlag('invalid'); // ❌ TypeScript error
```

**Критерий успеха:**

- ✅ State хранится в closure
- ✅ Независимость экземпляров
- ✅ TypeScript типы работают

---

### Задача 8 (усложнённая, опционально): useState с функцией-обновлением

```typescript
function useState<T>(
  initialValue: T,
): [() => T, (newValueOrUpdater: T | ((prev: T) => T)) => void] {
  // Твой код здесь
  // setter должен принимать либо значение, либо функцию
}

// ТЕСТЫ:
const [getCount, setCount] = useState(0);

setCount(5);
console.log(getCount()); // 5

setCount((prev) => prev + 1); // Функция-обновление
console.log(getCount()); // 6

setCount((prev) => prev * 2);
console.log(getCount()); // 12
```

---

## Часть 6: Устная самопроверка (30 минут)

### Вопрос 1: Что такое замыкание?

```
Напиши своими словами (3-5 предложений):
- Что такое closure?
- Чем отличается от обычной функции?
- Зачем нужно?
```

### Вопрос 2: Проблема с `var`

```typescript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Выводит: 3, 3, 3

// Объясни пошагово:
// 1. Что происходит в цикле?
// 2. Почему все callbacks видят одну переменную?
// 3. Как `let` решает проблему?
```

### Вопрос 3: Приватность через closure

```typescript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    get: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
console.log(counter.count); // undefined

// Объясни:
// 1. Почему counter.count === undefined?
// 2. Как методы получают доступ к count?
// 3. Можно ли извне получить доступ к count?
```

### Вопрос 4: Scope vs Closure

```
Объясни разницу:
- Scope (область видимости)
- Closure (замыкание)
- Приведи пример каждого
```

### Вопрос 5: Стрелочная функция и `this`

```typescript
class Example {
  value = 42;

  method = () => {
    console.log(this.value);
  };
}

const obj = new Example();
const fn = obj.method;
fn(); // 42 (работает!)

// Объясни:
// 1. Почему this не потерялся?
// 2. Что захватила стрелочная функция в closure?
// 3. Когда стрелочная функция создаётся?
```

---

## Тест по Уроку 8 (после самопроверки)

### Задача 1: Быстрая задача (5 минут)

```typescript
// Что выведет код?

function outer() {
  let x = 10;

  return function inner() {
    console.log(x);
    x++;
  };
}

const fn1 = outer();
const fn2 = outer();

fn1(); // ?
fn1(); // ?
fn2(); // ?
fn1(); // ?
```

### Задача 2: Найди ошибку (5 минут)

```typescript
// Код НЕ работает. Почему? Исправь.

function createMultiplier(factor: number) {
  return function (num: number) {
    return num * factor;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // Ожидаем 10

factor = 3; // Меняем factor
console.log(double(5)); // Что выведет?
```

### Задача 3: Практика (10 минут)

```typescript
// Создай функцию createLogger, которая:
// 1. Принимает prefix: string
// 2. Возвращает объект с методами log, warn, error
// 3. Каждый метод добавляет prefix к сообщению
// 4. Внутри хранит массив всех логов (приватно)
// 5. Метод getHistory() возвращает все логи

function createLogger(prefix: string) {
  // Твой код
}

// Тест:
const logger = createLogger('[APP]');
logger.log('Started');
logger.warn('Warning!');
logger.error('Error!');

console.log(logger.getHistory());
// ["[APP] LOG: Started", "[APP] WARN: Warning!", "[APP] ERROR: Error!"]

console.log(logger.logs); // undefined (приватно!)
```

---

## После Урока 8: Что дальше?

### ✅ Ты завершил Урок 8, если:

- [ ] Решил все обязательные задачи (1-8)
- [ ] Прошёл устную самопроверку
- [ ] Прошёл тест
- [ ] Можешь объяснить closure другу за 5 минут

# Проект: Personal Finance Tracker CLI

## Концепция

CLI-приложение для учёта личных финансов. Один файл, ~200-250 строк, покрывает
все твои знания без перегруза.

## Архитектура

### 1. Типы и интерфейсы

```typescript
// Base types
type TransactionType = 'income' | 'expense';
type Category =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'education'
  | 'health'
  | 'other';

// Main entity
interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  category: Category;
  description: string;
  date: Date;
}

// Utility types
type TransactionInput = Omit<Transaction, 'id' | 'date'>;
type TransactionUpdate = Partial<
  Pick<Transaction, 'amount' | 'category' | 'description'>
>;
type TransactionSummary = Pick<
  Transaction,
  'id' | 'amount' | 'type' | 'category'
>;
type ReadonlyTransaction = Readonly<Transaction>;

// Statistics
interface CategoryStats {
  total: number;
  count: number;
}

type StatsByCategory = Record<Category, CategoryStats>;
```

### 2. Команды

```
add       - Добавить транзакцию
list      - Показать все транзакции
balance   - Показать текущий баланс
stats     - Статистика по категориям
delete    - Удалить транзакцию
export    - Экспорт в JSON
```

### 3. Core Functions

#### State Manager (замыкания)

```typescript
function createFinanceManager() {
  let transactions: Transaction[] = [];
  let nextId = 1;

  const add = (input: TransactionInput): Transaction => {
    // создать транзакцию
    // добавить в массив
    // вернуть созданную транзакцию
  };

  const getAll = (): ReadonlyTransaction[] => {
    // вернуть readonly копию
  };

  const getById = (id: number): Transaction | undefined => {
    // find
  };

  const remove = (id: number): boolean => {
    // filter
  };

  const update = (id: number, updates: TransactionUpdate): boolean => {
    // найти и обновить
  };

  return { add, getAll, getById, remove, update };
}
```

#### Balance Calculator

```typescript
function calculateBalance(transactions: readonly Transaction[]): number {
  return transactions.reduce((balance, t) => {
    return t.type === 'income' ? balance + t.amount : balance - t.amount;
  }, 0);
}
```

#### Statistics с мемоизацией

```typescript
function createStatsCalculator() {
  let cache: StatsByCategory | null = null;
  let lastTransactionsLength = 0;

  return (transactions: readonly Transaction[]): StatsByCategory => {
    // Если длина не изменилась - вернуть кеш
    if (cache && transactions.length === lastTransactionsLength) {
      return cache;
    }

    // Иначе пересчитать используя reduce
    const stats: StatsByCategory = {
      food: { total: 0, count: 0 },
      transport: { total: 0, count: 0 },
      // ... остальные категории
    };

    cache = transactions.reduce((acc, t) => {
      if (t.type === 'expense') {
        acc[t.category].total += t.amount;
        acc[t.category].count++;
      }
      return acc;
    }, stats);

    lastTransactionsLength = transactions.length;
    return cache;
  };
}
```

#### Command Handler (object lookup)

```typescript
type CommandHandler = (args: string[]) => void;

const commands: Record<string, CommandHandler> = {
  add: (args) => {
    // parse args и добавить транзакцию
  },
  list: () => {
    // показать все транзакции
  },
  balance: () => {
    // показать баланс
  },
  stats: () => {
    // показать статистику
  },
  delete: (args) => {
    // удалить по id
  },
  export: (args) => {
    // экспорт в файл
  },
};

// Execution
const command = process.argv[2];
const handler = commands[command];

if (handler) {
  handler(process.argv.slice(3));
} else {
  console.log(
    'Unknown command. Use: add, list, balance, stats, delete, export',
  );
}
```

#### File I/O (try/catch)

```typescript
async function loadTransactions(): Promise<Transaction[]> {
  try {
    const file = Bun.file('finance.json');
    const data = await file.text();
    return JSON.parse(data);
  } catch {
    return []; // если файл не существует
  }
}

async function saveTransactions(
  transactions: readonly Transaction[],
): Promise<void> {
  try {
    await Bun.write('finance.json', JSON.stringify(transactions, null, 2));
    console.log('✅ Saved');
  } catch (error) {
    console.error('❌ Failed to save:', error.message);
  }
}
```

### 4. Display Helpers

```typescript
// Emoji для типов
const typeEmoji: Record<TransactionType, string> = {
  income: '💰',
  expense: '💸',
};

// Форматирование суммы
function formatAmount(amount: number, type: TransactionType): string {
  const sign = type === 'income' ? '+' : '-';
  const color = type === 'income' ? '\x1b[32m' : '\x1b[31m';
  const reset = '\x1b[0m';

  return `${color}${sign}$${amount}${reset}`;
}

// Render списка транзакций
function renderTransactions(transactions: readonly TransactionSummary[]): void {
  console.log('\n📊 Transactions:');
  transactions.forEach((t) => {
    console.log(
      `${typeEmoji[t.type]} #${t.id} - ${t.category}: ${formatAmount(t.amount, t.type)}`,
    );
  });
}

// Render статистики
function renderStats(stats: StatsByCategory): void {
  console.log('\n📈 Expenses by Category:');
  Object.entries(stats).forEach(([category, data]) => {
    if (data.count > 0) {
      console.log(`  ${category}: $${data.total} (${data.count} transactions)`);
    }
  });
}
```

## План реализации (5 шагов)

### Step 1: Setup (15 мин)

- Создай файл `finance.ts`
- Определи все типы и интерфейсы
- Создай `createFinanceManager()`

### Step 2: Basic Commands (30 мин)

- Реализуй `add` команду (парсинг аргументов)
- Реализуй `list` команду
- Добавь file I/O (load/save)

### Step 3: Balance & Delete (20 мин)

- Реализуй `calculateBalance()`
- Реализуй `balance` команду
- Реализуй `delete` команду

### Step 4: Statistics (25 мин)

- Создай `createStatsCalculator()` с мемоизацией
- Реализуй `stats` команду
- Добавь красивый вывод с emoji

### Step 5: Polish (20 мин)

- Реализуй `export` команду
- Добавь error handling везде
- Сделай красивый output (цвета, форматирование)

## Пример использования

```bash
# Добавить доход
bun finance.ts add income 5000 education "Фриланс проект"

# Добавить расход
bun finance.ts add expense 150 food "Продукты"
bun finance.ts add expense 50 transport "Метро"

# Показать все транзакции
bun finance.ts list

# Баланс
bun finance.ts balance

# Статистика
bun finance.ts stats

# Удалить транзакцию
bun finance.ts delete 2

# Экспорт
bun finance.ts export backup.json
```

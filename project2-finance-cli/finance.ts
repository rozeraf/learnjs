import type * as Types from './types';
const createFinanceManager = () => {
  let transactions: Types.Transaction[] = [];
  let nextId = 1;
  const add = (input: Types.TransactionInput): Types.Transaction => {
    const newTransaction: Types.Transaction = {
      id: nextId,
      ...input,
      date: new Date(),
    };
    transactions.push(newTransaction);
    nextId++;
    return newTransaction;
  };
  const getAll = (): Types.ReadonlyTransaction[] => {
    // return a readonly copy
    return transactions;
  };
  const getById = (id: number): Types.Transaction | undefined => {
    // find a transaction by id
    return transactions.find((t: Types.Transaction) => t.id === id);
  };
  const remove = (id: number): boolean => {
    // remove a transaction from array by id
    const initialLength = transactions.length;
    transactions = transactions.filter((t: Types.Transaction) => t.id !== id);
    return transactions.length < initialLength;
  };
  const update = (id: number, updates: Types.TransactionUpdate): boolean => {
    // find and update
    const index = transactions.findIndex((t) => t.id === id);
    if (index < 0) return false;
    transactions[index] = { ...transactions[index], ...updates };
    return true;
  };
  return { add, getAll, getById, remove, update };
};
const calculateBalance = (
  transactions: readonly Types.Transaction[],
): number => {
  return transactions.reduce((balance, t) => {
    return t.type === 'income' ? balance + t.amount : balance - t.amount;
  }, 0);
};
const createStatsCalculator = () => {
  let cache: Types.StatsByCategory | null = null;
  let lastTransactionsLength = -1;

  return (
    transactions: readonly Types.Transaction[],
  ): Types.StatsByCategory => {
    if (cache && transactions.length === lastTransactionsLength) {
      console.log('stats from cache');
      return cache;
    }
    const initialStats: Types.StatsByCategory = {
      food: { total: 0, count: 0 },
      transport: { total: 0, count: 0 },
      entertainment: { total: 0, count: 0 },
      education: { total: 0, count: 0 },
      health: { total: 0, count: 0 },
      other: { total: 0, count: 0 },
    };
    cache = transactions.reduce((acc, t) => {
      if (t.type === 'expense') {
        acc[t.category].total += t.amount;
        acc[t.category].count++;
      }
      return acc;
    }, initialStats);
    lastTransactionsLength = transactions.length;
    return cache;
  };
};
const statsCalculator = createStatsCalculator();
const typeEmoji: Record<Types.TransactionType, string> = {
  income: '💰',
  expense: '💸',
};

const formatAmount = (amount: number, type: Types.TransactionType): string => {
  const sign = type === 'income' ? '+' : '-';
  const color = type === 'income' ? '\x1b[32m' : '\x1b[31m';
  const reset = '\x1b[0m';
  return `${color}${sign}$${amount.toFixed(2)}${reset}`;
};

const renderTransactions = (
  transactions: readonly Types.TransactionSummary[],
): void => {
  console.log('\nTransactions:');
  if (transactions.length === 0) {
    console.log('No transactions yet');
    return;
  }
  transactions.forEach((t) => {
    console.log(
      `${typeEmoji[t.type]} #${t.id} - ${t.category}: ${formatAmount(
        t.amount,
        t.type,
      )}`,
    );
  });
};

const renderStats = (stats: Types.StatsByCategory): void => {
  console.log('\nExpenses by Category:');
  let totalExpenses = 0;
  Object.entries(stats).forEach(([category, data]) => {
    if (data.count > 0) {
      totalExpenses += data.total;
      console.log(
        ` - ${category}: $${data.total.toFixed(2)} (${
          data.count
        } transactions)`,
      );
    }
  });
  console.log(`-------------------`);
  console.log(`Total expenses: $${totalExpenses.toFixed(2)}`);
};

const financeManager = createFinanceManager();
const path = `${import.meta.dir}/finance.json`;
async function loadTransactions() {
  const file = Bun.file(path);
  const exists = await file.exists();
  if (exists) {
    const data: Types.Transaction[] = await file.json();
    data.forEach((t) => financeManager.add(t));
  }
}
async function saveTransactions() {
  await Bun.write(path, JSON.stringify(financeManager.getAll()));
}
type CommandHandler = (args: string[]) => void;
const commands: Record<string, CommandHandler> = {
  add: (args) => {
    const [type, amountStr, category, ...descriptionParts] = args;
    const amount = parseFloat(amountStr);
    const description = descriptionParts.join(' ');
    if (!type || !amount || !category) {
      const missing = [];
      if (!type) missing.push('type');
      if (!amount) missing.push('amount');
      if (!category) missing.push('category');
      console.error(
        `error: missing arguments: ${missing.join(', ')} for add command`,
      );
      return;
    }
    if (isNaN(amount)) {
      console.error('error: amount must be a number');
    }
    const transactionInput: Types.TransactionInput = {
      amount,
      category: category as Types.Category,
      description,
      type: type as Types.TransactionType,
    };
    const newTransaction = financeManager.add(transactionInput);
    console.log('transaction added:', newTransaction);
  },
  list: () => {
    renderTransactions(financeManager.getAll());
  },
  stats: () => {
    const allTransactions = financeManager.getAll();
    const stats = statsCalculator(allTransactions);
    renderStats(stats);
  },
  balance: () => {
    const allTransactions = financeManager.getAll();
    const totalBalance = calculateBalance(allTransactions);
    console.log(`Current balance: ${totalBalance.toFixed(2)}`);
  },
  delete: (args) => {
    const [idStr] = args;
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      console.error('error: invalid id, please provide a number');
      return;
    }
    const success = financeManager.remove(id);

    if (success) {
      console.log(`transaction with id ${id} has been deleted`);
    } else {
      console.error(`error: transaction with id ${id} not found`);
    }
  },
};
async function main() {
  await loadTransactions();
  const command = process.argv[2];
  const args = process.argv.slice(3);
  if (!command) {
    console.log(
      `you need to write one of these commands: ${Object.keys(commands).join(
        ', ',
      )}`,
    );
  } else {
    const handler = commands[command];
    if (handler) {
      handler(args);
    } else {
      console.log(`unknown command: ${command}`);
      console.log(`available commands: ${Object.keys(commands).join(', ')}`);
    }
  }

  await saveTransactions();
}
main();

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
    const transactions = financeManager.getAll();
    if (transactions.length === 0) {
      console.log(
        'no transaction added yet. use the add command to create one',
      );
      return;
    }
    console.table(transactions);
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
  const handler = commands[command];
  if (handler) {
    handler(args);
  } else {
    console.log(`unkown command: ${command}`);
    console.log(`available commands: ${Object.keys(commands).join(', ')}`);
  }

  await saveTransactions();
}
main();

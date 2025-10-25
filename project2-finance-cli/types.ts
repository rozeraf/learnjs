export type TransactionType = 'income' | 'expense';
export type Category =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'education'
  | 'health'
  | 'other';

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  category: Category;
  description: string;
  date: Date;
}

export type TransactionInput = Omit<Transaction, 'id' | 'date'>;
export type TransactionUpdate = Partial<
  Pick<Transaction, 'amount' | 'category' | 'description'>
>;
export type TransactionSummary = Pick<
  Transaction,
  'id' | 'amount' | 'type' | 'category'
>;
export type ReadonlyTransaction = Readonly<Transaction>;
export interface CategoryStats {
  total: number;
  count: number;
}
export type StatsByCategory = Record<Category, CategoryStats>;

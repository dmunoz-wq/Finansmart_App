export const initialTransactions = [
  { id: 't1', type: 'income', title: 'Salario', category: 'categories.work', dateGroup: 'date.today', date: 'date.today', amount: 5000 },
  { id: 't2', type: 'expense', title: 'Café', category: 'categories.food', dateGroup: 'date.today', date: 'date.today', amount: 3.5 },
  { id: 't3', type: 'expense', title: 'Supermercado', category: 'categories.home', dateGroup: 'date.yesterday', date: 'date.yesterday', amount: 120 },
];

export const initialBudgets = [
  { id: 'b1', name: 'categories.food', icon: '🍔', spent: 320, total: 500 },
  { id: 'b2', name: 'categories.transport', icon: '🚗', spent: 60, total: 100 },
  { id: 'b3', name: 'categories.entertainment', icon: '🎮', spent: 90, total: 150 },
];

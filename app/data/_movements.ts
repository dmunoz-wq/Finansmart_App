export interface Movement {
  id: string;
  type: "ingreso" | "gasto";
  amount: number;
  description: string;
  date: string;
}

export const mockMovements: Movement[] = [
  {
    id: "1",
    type: "ingreso",
    amount: 1200000,
    description: "Pago de salario",
    date: "2025-01-15"
  },
  {
    id: "2",
    type: "gasto",
    amount: 350000,
    description: "Mercado del mes",
    date: "2025-01-20"
  },
  {
    id: "3",
    type: "gasto",
    amount: 150000,
    description: "Transporte",
    date: "2025-01-22"
  }
];

import React, { createContext, useContext, useState } from "react";

export type Movimiento = {
  id: string;
  tipo: "ingreso" | "gasto";
  titulo: string;
  monto: number;
  categoria: string;
  fecha: string; // YYYY-MM-DD
};

type FinanzasContextType = {
  movimientos: Movimiento[];
  agregarMovimiento: (m: Movimiento) => void;
  ingresosTotales: number;
  gastosTotales: number;
  gastosPorCategoria: Record<string, number>;
  movimientosPorMes: (mes: number) => Movimiento[];
};

const FinanzasContext = createContext<FinanzasContextType | undefined>(undefined);

export const FinanzasProvider = ({ children }: any) => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const agregarMovimiento = (m: Movimiento) => {
    setMovimientos(prev => [...prev, m]);
  };

  const ingresosTotales = movimientos
    .filter(m => m.tipo === "ingreso")
    .reduce((acc, m) => acc + m.monto, 0);

  const gastosTotales = movimientos
    .filter(m => m.tipo === "gasto")
    .reduce((acc, m) => acc + m.monto, 0);

  const gastosPorCategoria = movimientos
    .filter(m => m.tipo === "gasto")
    .reduce((acc: any, m) => {
      acc[m.categoria] = (acc[m.categoria] || 0) + m.monto;
      return acc;
    }, {});

  const movimientosPorMes = (mes: number) =>
    movimientos.filter(m => new Date(m.fecha).getMonth() + 1 === mes);

  return (
    <FinanzasContext.Provider
      value={{
        movimientos,
        agregarMovimiento,
        ingresosTotales,
        gastosTotales,
        gastosPorCategoria,
        movimientosPorMes
      }}
    >
      {children}
    </FinanzasContext.Provider>
  );
};

export const useFinanzas = () => useContext(FinanzasContext)!;

import { View, Text, ScrollView } from "react-native";
import { useFinanzas } from "../context/FinanzasContext";
import MovimientoItem from "../components/MovimientoItem";

export default function HistorialScreen() {
  const { movimientosPorMes } = useFinanzas();

  const mesActual = new Date().getMonth() + 1;
  const movimientos = movimientosPorMes(mesActual);

  return (
    <ScrollView style={{ backgroundColor: "#000", padding: 20 }}>
      <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
        Historial — Mes {mesActual}
      </Text>

      {movimientos.map(m => (
        <MovimientoItem key={m.id} m={m} />
      ))}
    </ScrollView>
  );
}

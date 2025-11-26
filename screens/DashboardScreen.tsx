import { View, Text, ScrollView } from "react-native";
import { useFinanzas } from "../context/FinanzasContext";
import GraficaGastos from "../components/GraficaGastos";
import MovimientoItem from "../components/MovimientoItem";

export default function DashboardScreen() {
  const { ingresosTotales, gastosTotales, movimientos } = useFinanzas();

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "#000", flex: 1 }}>
      <Text style={{ color: "#fff", fontSize: 26, fontWeight: "bold" }}>
        Dashboard
      </Text>

      <View style={{ marginVertical: 20 }}>
        <Text style={{ color: "lightgreen", fontSize: 20 }}>
          Ingresos: ${ingresosTotales}
        </Text>
        <Text style={{ color: "salmon", fontSize: 20 }}>
          Gastos: ${gastosTotales}
        </Text>
      </View>

      <GraficaGastos />

      <Text style={{ color: "#fff", fontSize: 20, marginTop: 30 }}>
        Movimientos recientes
      </Text>

      {movimientos.slice(-5).reverse().map(m => (
        <MovimientoItem key={m.id} m={m} />
      ))}
    </ScrollView>
  );
}

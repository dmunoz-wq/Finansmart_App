import { ProgressChart } from "@/components/ProgressChart";
import { Colors } from "@/constants/theme";
import { useFinanzas } from "@/context/FinanzasContext";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Dashboard() {
  const { width } = useWindowDimensions();
  const isSmall = width < 720;

  // -----------------------------
  // 🔥 TOMAR DATOS DEL CONTEXTO
  // -----------------------------
  const { movimientos } = useFinanzas();

  const ingresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((acc, m) => acc + m.monto, 0);

  const gastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((acc, m) => acc + m.monto, 0);

  const [budget, setBudget] = useState<number>(2450000);

  const balance = ingresos - gastos;
  const percent = useMemo(
    () => (budget > 0 ? Math.round((gastos / budget) * 100) : 0),
    [gastos, budget]
  );

  const fmt = (v: number) => v.toLocaleString("es-CO");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundClear }}>
      <StatusBar style="auto" />

      <ProgressChart />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.centerWrap}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>FinanSmart</Text>

            {/* Balance */}
            <View style={styles.balanceBox}>
              <Text style={styles.balanceLabel}>Balance Total</Text>
              <Text style={styles.balanceValue}>${fmt(balance)}</Text>
            </View>

            {/* Ingresos y gastos */}
            <View style={styles.rowSingle}>
              <View style={[styles.smallBox, { backgroundColor: "#E8F7EE" }]}>
                <Text style={[styles.smallLabel, { color: "#065f46" }]}>
                  Ingresos
                </Text>
                <Text style={[styles.smallValue, { color: "#065f46" }]}>
                  {fmt(ingresos)}
                </Text>
              </View>

              <View style={[styles.smallBox, { backgroundColor: "#FFF1F2" }]}>
                <Text style={[styles.smallLabel, { color: "#7f1d1d" }]}>
                  Gastos
                </Text>
                <Text style={[styles.smallValue, { color: "#7f1d1d" }]}>
                  {fmt(gastos)}
                </Text>
              </View>
            </View>

            {/* Presupuesto */}
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Presupuesto</Text>
              <TextInput
                keyboardType="numeric"
                value={String(budget)}
                onChangeText={(t) =>
                  setBudget(Number(t.replace(/[^0-9]/g, "")) || 0)
                }
                style={styles.budgetInput}
              />
            </View>

            {/* Alerta de presupuesto */}
            <View
              style={[
                styles.alertBox,
                percent >= 80 ? styles.alertDanger : styles.alertOk,
              ]}
            >
              <Text style={styles.alertText}>
                {percent >= 80
                  ? `Alerta: Presupuesto al ${percent}%`
                  : `Presupuesto usado: ${percent}%`}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    backgroundColor: Colors.backgroundClear,
    minHeight: "100%",
    paddingBottom: 60,
  },

  centerWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  card: {
    backgroundColor: Colors.darkGray,
    padding: 18,
    borderRadius: 20,
    width: "95%",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },

  cardTitle: {
    color: Colors.orange,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  balanceBox: {
    backgroundColor: "#fff7ed",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  balanceLabel: { color: "#92400e", fontWeight: "700" },

  balanceValue: {
    color: "#b45309",
    fontSize: 22,
    fontWeight: "700",
  },

  rowSingle: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
    justifyContent: "space-between",
  },

  smallBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },

  smallLabel: { fontWeight: "700", marginBottom: 4 },

  smallValue: { fontWeight: "700", fontSize: 18 },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },

  inputLabel: { color: "#fff", fontWeight: "700" },

  budgetInput: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    width: 160,
    textAlign: "right",
  },

  alertBox: {
    padding: 10,
    borderRadius: 10,
    marginTop: 14,
  },

  alertText: { fontWeight: "700" },

  alertDanger: { backgroundColor: "#fff1f0" },

  alertOk: { backgroundColor: "#f0fdf4" },
});

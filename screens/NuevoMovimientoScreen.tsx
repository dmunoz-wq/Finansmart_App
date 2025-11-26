import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useFinanzas } from "../context/FinanzasContext";

export default function NuevoMovimientoScreen() {
  const { agregarMovimiento } = useFinanzas();

  const [titulo, setTitulo] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");

  const crear = (tipo: "ingreso" | "gasto") => {
    agregarMovimiento({
      id: Date.now().toString(),
      tipo,
      titulo,
      monto: Number(monto),
      categoria,
      fecha: new Date().toISOString().slice(0, 10),
    });

    setTitulo("");
    setMonto("");
    setCategoria("");
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#000", flex: 1 }}>
      <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
        Nuevo Movimiento
      </Text>

      <TextInput
        placeholder="Título"
        placeholderTextColor="#888"
        style={{ color: "#fff", borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        placeholder="Monto"
        placeholderTextColor="#888"
        keyboardType="numeric"
        style={{ color: "#fff", borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={monto}
        onChangeText={setMonto}
      />

      <TextInput
        placeholder="Categoría (Comida, Transporte, etc.)"
        placeholderTextColor="#888"
        style={{ color: "#fff", borderWidth: 1, padding: 10, marginBottom: 20 }}
        value={categoria}
        onChangeText={setCategoria}
      />

      <TouchableOpacity
        style={{ backgroundColor: "lightgreen", padding: 12, marginBottom: 10 }}
        onPress={() => crear("ingreso")}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>+ Ingreso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: "salmon", padding: 12 }}
        onPress={() => crear("gasto")}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>+ Gasto</Text>
      </TouchableOpacity>
    </View>
  );
}

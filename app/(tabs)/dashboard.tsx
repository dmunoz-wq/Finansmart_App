import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function Dashboard() {
  return (
    <ScrollView className="flex-1 bg-[#0d1117] px-4 py-6">

      <Text className="text-green-400 text-3xl font-bold mb-6">
        Dashboard
      </Text>

      <View className="gap-5">

        <View className="bg-[#161b22] p-5 rounded-2xl border border-[#21262d]">
          <Text className="text-green-400 text-xl font-bold">Balance General</Text>
          <Text className="text-gray-400 mt-1">
            Resumen de ingresos y egresos del mes.
          </Text>
          <Text className="text-green-500 text-3xl font-bold mt-4">$12,340</Text>
        </View>

        <View className="bg-[#161b22] p-5 rounded-2xl border border-[#21262d]">
          <Text className="text-green-400 text-xl font-bold">Gastos</Text>
          <Text className="text-gray-400 mt-1">
            Controla tus gastos mensuales.
          </Text>
          <Text className="text-red-500 text-3xl font-bold mt-4">$5,120</Text>
        </View>

        <View className="bg-[#161b22] p-5 rounded-2xl border border-[#21262d]">
          <Text className="text-green-400 text-xl font-bold">Ahorros</Text>
          <Text className="text-gray-400 mt-1">
            Monto total ahorrado actualmente.
          </Text>
          <Text className="text-blue-500 text-3xl font-bold mt-4">$7,220</Text>
        </View>

      </View>

      <Text className="text-gray-600 text-center mt-10 text-sm">
        © 2025 FinanSmart. Todos los derechos reservados.
      </Text>

    </ScrollView>
  );
}

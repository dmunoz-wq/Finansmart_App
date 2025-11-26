import { Stack } from "expo-router";
import { FinanzasProvider } from "../context/FinanzasContext";

export default function RootLayout() {
  return (
    <FinanzasProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </FinanzasProvider>
  );
}

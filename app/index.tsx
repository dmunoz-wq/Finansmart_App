import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a login al montar la ruta raíz
    // Uso setTimeout 0 para asegurar que la navegación está lista
    const t = setTimeout(() => {
      router.replace('/auth/login');
    }, 0);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

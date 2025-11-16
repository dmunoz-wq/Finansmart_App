
import { useAuth } from '@/hooks/useAuth';
import { Registro } from '@/styles/Registro';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <View style={Registro.loginCard}>
      <Text style={Registro.title}>FINANSMART</Text>
      <Text style={Registro.subtitle}>Inicia sesión en tu cuenta</Text>
      
      <TextInput
        style={Registro.input}
        placeholder="Usuario o email"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={Registro.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[Registro.loginButton, isLoading && Registro.buttonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={Registro.buttonText}>
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={Registro.registerLink}>
        <Text style={Registro.registerText}>
          ¿No tienes cuenta? <Text style={Registro.registerBold}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

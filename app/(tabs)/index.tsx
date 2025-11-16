import { Registro } from '@/styles/Registro';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
  };

  return (
    <View style={Registro.mainContainer}>
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

        <TouchableOpacity style={Registro.loginButton} onPress={handleLogin}>
          <Text style={Registro.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

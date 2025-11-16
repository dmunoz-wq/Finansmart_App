import { Registro } from '@/styles/Registro';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = () => {
    console.log('Datos de registro:', formData);
  };

  const goToLogin = () => {
    router.push('/(tabs)/login');
  };

  return (
    <View style={Registro.container}>
      <View style={Registro.registerCard}>
        <Text style={Registro.title}>Crear Cuenta</Text>
        <Text style={Registro.subtitle}>Únete a Finansmart</Text>

        {/* Campos del formulario */}
        <View style={Registro.inputRow}>
          <View style={[Registro.inputContainer, { flex: 1, marginRight: 10 }]}>
            <Text style={Registro.label}>Nombre</Text>
            <TextInput
              style={Registro.input}
              placeholder="Tu nombre"
              placeholderTextColor="#999"
              value={formData.firstName}
              onChangeText={(text) => setFormData({...formData, firstName: text})}
            />
          </View>
          
          <View style={[Registro.inputContainer, { flex: 1, marginLeft: 10 }]}>
            <Text style={Registro.label}>Apellido</Text>
            <TextInput
              style={Registro.input}
              placeholder="Tu apellido"
              placeholderTextColor="#999"
              value={formData.lastName}
              onChangeText={(text) => setFormData({...formData, lastName: text})}
            />
          </View>
        </View>

        <View style={Registro.inputContainer}>
          <Text style={Registro.label}>Email</Text>
          <TextInput
            style={Registro.input}
            placeholder="tu@email.com"
            placeholderTextColor="#999"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={Registro.inputContainer}>
          <Text style={Registro.label}>Contraseña</Text>
          <TextInput
            style={Registro.input}
            placeholder="••••••••"
            placeholderTextColor="#999"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry
          />
        </View>

        <View style={Registro.inputContainer}>
          <Text style={Registro.label}>Confirmar Contraseña</Text>
          <TextInput
            style={Registro.input}
            placeholder="••••••••"
            placeholderTextColor="#999"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={Registro.registerButton} onPress={handleRegister}>
          <Text style={Registro.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        {/*Enlace para volver al login */}
        <TouchableOpacity style={Registro.loginLink} onPress={goToLogin}>
          <Text style={Registro.loginText}>
            ¿Ya tienes cuenta? <Text style={Registro.loginBold}>Iniciar Sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../credencial';
import { Title, Subheading } from 'react-native-paper';

const PantallaCrearCuenta = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Patrón para validar correos electrónicos
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleCrearCuenta = async () => {
    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Cuenta creada', 'Tu cuenta ha sido creada exitosamente.');
      navigation.replace('Login'); // Redirige al login
    } catch (error) {
      // Manejo de errores específicos de Firebase
      if (error.code === 'auth/email-already-in-use') {
        setError('El correo ya está registrado. Intenta con otro.');
      } else if (error.code === 'auth/invalid-email') {
        setError('El formato del correo no es válido.');
      } else {
        setError('Hubo un error al crear tu cuenta. Intenta nuevamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Título principal */}
      <Title style={styles.title}>Crear Cuenta</Title>

      {/* Subtítulo */}
      <Subheading style={styles.subtitle}>Regístrate</Subheading>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError(''); // Limpia el mensaje de error mientras se escribe
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(''); // Limpia el mensaje de error mientras se escribe
        }}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.createButton} onPress={handleCrearCuenta}>
        <Text style={styles.createButtonText}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    height: 45,  
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 45,  
    backgroundColor: '#fff',
    fontSize: 16,
    
    // Sombrado para el campo de texto
    shadowColor: 'red',
    shadowOffset: { width:0, height: 8 },
    shadowOpacity: 0.3,  
    shadowRadius: 9,  
    elevation: 5,  
  },
  createButton: {
    backgroundColor: '#4caf50',  
    borderRadius: 45,  
    width: '80%',
    paddingVertical: 10,  
    marginTop: 10,
    alignItems: 'center',  
  },
  createButtonText: {
    color: '#fff',  
    fontSize: 16,  
    fontWeight: 'bold', 
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default PantallaCrearCuenta;

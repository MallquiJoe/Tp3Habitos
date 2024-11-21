import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../credencial';
import { agregarHabito } from '../habitoCrud';
import { Picker } from '@react-native-picker/picker';

const AgregarHabito = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [nivel, setNivel] = useState('');

  const handleAgregar = async () => {
    const userId = auth.currentUser?.uid;
    if (userId && nombre && nivel) {
      try {
        await agregarHabito(userId, { nombre, nivel });
        Alert.alert('Éxito', 'Hábito agregado.');
        navigation.navigate('Inicio');
      } catch (error) {
        Alert.alert('Error', 'No se pudo agregar el hábito.');
        console.error(error);
      }
    } else {
      Alert.alert('Error', 'Completa todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Hábito</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del hábito"
        value={nombre}
        onChangeText={setNombre}/>

      <Text style={styles.label}>Nivel de prioridad</Text>
      <Picker selectedValue={nivel}
        style={styles.picker}
        onValueChange={(itemValue) => setNivel(itemValue)}>
        <Picker.Item label="Selecciona el nivel" value="" />
        <Picker.Item label="Alta" value="alta" />
        <Picker.Item label="Media" value="media" />
        <Picker.Item label="Baja" value="baja" />
      </Picker>

      {/* Contenedor para centrar el botón */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAgregar}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5f6368',
  },
  label: {
    fontSize: 16,
    color: '#5f6368',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#b0bec5',
    marginBottom: 15,
    padding: 12,
    borderRadius: 45,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#b0bec5',
    borderRadius: 45,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#8e44ad',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 45,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AgregarHabito;

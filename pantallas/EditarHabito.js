import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { editarHabito, getHabito } from '../habitoCrud';
import { auth } from '../credencial';
import { Picker } from '@react-native-picker/picker'; // Importar desde el nuevo paquete

const PantallaEditarHabito = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { habitId } = route.params;

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    const fetchHabito = async () => {
      try {
        const userId = auth.currentUser.uid;
        const habito = await getHabito(userId, habitId);
        setNombre(habito.nombre);
        setCategoria(habito.nivel);
      } catch (error) {
        console.log('Error al obtener hábito:', error);
      }
    };

    if (habitId) fetchHabito();
  }, [habitId]);

  const handleEditar = async () => {
    if (!nombre || !categoria) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const userId = auth.currentUser.uid;
      const actualizadoHabito = { nombre, nivel: categoria };
      await editarHabito(userId, habitId, actualizadoHabito);
      Alert.alert('Éxito', 'Hábito actualizado.');
      navigation.goBack();
    } catch (error) {
      console.log('Error al editar hábito:', error);
      Alert.alert('Error', 'No se pudo actualizar el hábito.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Hábito</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del hábito"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Nivel de prioridad</Text>
      
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Alta" value="Alta" />
        <Picker.Item label="Media" value="Media" />
        <Picker.Item label="Baja" value="Baja" />
      </Picker>

      {/* Botón de editar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditar}>
          <Text style={styles.buttonText}>Actualizar</Text>
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
    width: '100%',
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#b0bec5',
    backgroundColor: '#ffffff',
    marginBottom: 15,
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

export default PantallaEditarHabito;

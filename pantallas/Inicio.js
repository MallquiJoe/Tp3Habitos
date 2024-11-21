import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, IconButton } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getHabitos, eliminarHabito, editarHabito } from '../habitoCrud';
import { auth } from '../credencial';

const PantallaInicio = () => {
  const [habitos, setHabitos] = useState([]);
  const navigation = useNavigation();

  // Recargar los hábitos al enfocarse en la pantalla
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserHabits = async () => {
        try {
          if (auth.currentUser) {
            const habitosData = await getHabitos(auth.currentUser.uid);
            setHabitos(habitosData);
          }
        } catch (error) {
          console.error('Error al obtener los hábitos: ', error);
        }
      };

      fetchUserHabits();
    }, [])
  );

  // Función para eliminar un hábito
  const handleEliminar = async (habitId) => {
    try {
      await eliminarHabito(auth.currentUser.uid, habitId);
      // Recargar hábitos después de eliminar uno
      const updatedHabits = await getHabitos(auth.currentUser.uid);
      setHabitos(updatedHabits); 
    } catch (error) {
      console.error('Error al eliminar el hábito: ', error);
    }
  };

  // Función para cambiar el estado de completado
  const handleCompletado = async (habitId, completada) => {
    try {
      // Actualiza el estado de "completada"
      await editarHabito(auth.currentUser.uid, habitId, { completada: !completada });
      // Recargar hábitos después de actualizar el estado
      const updatedHabits = await getHabitos(auth.currentUser.uid);
      setHabitos(updatedHabits); 
    } catch (error) {
      console.error('Error al actualizar el estado de completada:', error);
    }
  };

  const handleCerrarSesion = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Hábitos</Text>
        <Button 
          icon="exit-to-app" 
          mode="text" 
          onPress={handleCerrarSesion} 
          style={styles.logoutButton} />
      </View>

      <ScrollView style={styles.habitosContainer}>
        {habitos.length > 0 ? (
          habitos.map(habito => (
            <Card key={habito.id} style={styles.card}>
              <Card.Content>
                <Text style={styles.cardTitle}>{habito.nombre}</Text>
                <Text style={styles.cardText}>Prioridad: {habito.nivel}</Text>
                <Text style={styles.cardStatus}>
                  {habito.completada ? 'Completada' : 'No completada'}
                </Text>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <IconButton 
                  icon="pencil" 
                  size={24} 
                  onPress={() => navigation.navigate('EditarHabito', { habitId: habito.id })} 
                  style={styles.editButton} />
                <IconButton 
                  icon={habito.completada ? "checkbox-marked" : "checkbox-blank-outline"}
                  size={24}
                  onPress={() => handleCompletado(habito.id, habito.completada)} 
                  style={styles.completadoButton} />
                <IconButton 
                  icon="delete" 
                  size={24} 
                  onPress={() => handleEliminar(habito.id)} 
                  style={styles.deleteButton} />
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Text>No tienes hábitos registrados.</Text>
        )}
      </ScrollView>

      <Button
        icon="plus"
        mode="contained"
        style={styles.addButton}
        onPress={() => navigation.navigate('AgregarHabito')}>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: 'transparent',
  },
  habitosContainer: {
    marginBottom: 80,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    marginTop: 4,
    color: '#777',
  },
  cardStatus: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#777',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  editButton: {
    borderColor: '#8e44ad',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 10,
  },
  completadoButton: {
    borderColor: '#8e44ad',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 10,
  },
  deleteButton: {
    borderColor: '#8e44ad',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 50,
    backgroundColor: '#8e44ad',
  },
});

export default PantallaInicio;

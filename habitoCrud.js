import { firestore } from './credencial';  // Asegúrate de que 'firestore' esté importado correctamente
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

// Función para obtener todos los hábitos de un usuario
export const getHabitos = async (userId) => {
  const habitosRef = collection(firestore, `usuarios/${userId}/habitos`);
  const querySnapshot = await getDocs(habitosRef);
  const habitos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return habitos;
};

// Función para obtener un hábito por su ID
export const getHabito = async (userId, habitId) => {
  const habitoRef = doc(firestore, `usuarios/${userId}/habitos/${habitId}`);
  const habitoSnapshot = await getDoc(habitoRef);

  if (habitoSnapshot.exists()) {
    return { id: habitId, ...habitoSnapshot.data() };  // Devuelve el ID junto con los datos
  } else {
    throw new Error('Hábito no encontrado');
  }
};

// Función para agregar un hábito
export const agregarHabito = async (userId, nuevoHabito) => {
  const habitosRef = collection(firestore, `usuarios/${userId}/habitos`);
  await addDoc(habitosRef, nuevoHabito);
};

// Función para eliminar un hábito
export const eliminarHabito = async (userId, habitId) => {
  const habitDocRef = doc(firestore, `usuarios/${userId}/habitos/${habitId}`);
  await deleteDoc(habitDocRef);
};

// Función para editar un hábito
export const editarHabito = async (userId, habitId, actualizadoHabito) => {
  const habitDocRef = doc(firestore, `usuarios/${userId}/habitos/${habitId}`);
  await updateDoc(habitDocRef, actualizadoHabito);  // Actualiza el hábito en Firestore
};

// Función para actualizar el estado de completado de un hábito
export const actualizarCompletado = async (userId, habitId, completada) => {
  const habitDocRef = doc(firestore, `usuarios/${userId}/habitos/${habitId}`);
  await updateDoc(habitDocRef, {
    completada: completada,
  });
};

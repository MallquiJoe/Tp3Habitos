import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBY6UKB0EzxF2r4nFpwr3lI7h3-4D5PFFY",
  authDomain: "habitos-tp3.firebaseapp.com",
  projectId: "habitos-tp3",
  storageBucket: "habitos-tp3.appspot.com",
  messagingSenderId: "539629256311",
  appId: "1:539629256311:web:7849d2171b16bdfa79d072"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const auth = getAuth(app);
const firestore = getFirestore(app);

// Exportar los servicios que necesitas
export { auth, firestore };

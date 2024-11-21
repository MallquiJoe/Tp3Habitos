import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaLogin from './pantallas/Login';
import PantallaInicio from './pantallas/Inicio';
import PantallaAgregarHabito from './pantallas/AgregarHabito';
import PantallaEditarHabito from './pantallas/EditarHabito';
import PantallaCrearCuenta from './pantallas/CrearCuenta';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={PantallaLogin} />
        <Stack.Screen name="Inicio" component={PantallaInicio} />
        <Stack.Screen name="AgregarHabito" component={PantallaAgregarHabito} />
        <Stack.Screen name="EditarHabito" component={PantallaEditarHabito} />
        <Stack.Screen name="CrearCuenta" component={PantallaCrearCuenta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

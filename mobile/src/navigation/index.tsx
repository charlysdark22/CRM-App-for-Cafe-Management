import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LocalesScreen from '../screens/LocalesScreen';
import AlmacenCentralScreen from '../screens/AlmacenCentralScreen';
import AlmacenLocalScreen from '../screens/AlmacenLocalScreen';
import CocinaScreen from '../screens/CocinaScreen';
import CantinaScreen from '../screens/CantinaScreen';
import MesasPedidosScreen from '../screens/MesasPedidosScreen';
import InformesScreen from '../screens/InformesScreen';
import ConfiguracionRespaldoScreen from '../screens/ConfiguracionRespaldoScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Almacén Central" component={AlmacenCentralScreen} />
      <Drawer.Screen name="Almacén Local" component={AlmacenLocalScreen} />
      <Drawer.Screen name="Locales" component={LocalesScreen} />
      <Drawer.Screen name="Mesas y Pedidos" component={MesasPedidosScreen} />
      <Drawer.Screen name="Cocina" component={CocinaScreen} />
      <Drawer.Screen name="Cantina" component={CantinaScreen} />
      <Drawer.Screen name="Informes" component={InformesScreen} />
      <Drawer.Screen name="Configuración/Respaldo" component={ConfiguracionRespaldoScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

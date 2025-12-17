import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={{ marginBottom: 8 }}>Accesos rápidos</Text>
      <Button title="Locales" onPress={() => navigation.navigate('Locales')} />
      <View style={{ height: 8 }} />
      <Button title="Almacén Central" onPress={() => navigation.navigate('Almacén Central')} />
      <View style={{ height: 8 }} />
      <Button title="Mesas y Pedidos" onPress={() => navigation.navigate('Mesas y Pedidos')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 }
});
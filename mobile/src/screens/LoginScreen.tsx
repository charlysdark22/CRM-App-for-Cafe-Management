import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { autenticarUsuario, guardarUsuarioActual } from '../utils/storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');

  const onLogin = async () => {
    const user = await autenticarUsuario(nombre, contraseña);
    if (user) {
      await guardarUsuarioActual(user);
      // navegar a la app principal (drawer)
      // @ts-ignore
      navigation.replace('Main');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput value={nombre} onChangeText={setNombre} placeholder="Usuario" style={styles.input} />
      <TextInput value={contraseña} onChangeText={setContraseña} placeholder="Contraseña" secureTextEntry style={styles.input} />
      <View style={{ width: '60%', marginTop: 12 }}>
        <Button title="Entrar" onPress={onLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 }
});
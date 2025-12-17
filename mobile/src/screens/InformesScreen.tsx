import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InformesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informes (placeholder)</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center' }, title: { fontSize: 18, fontWeight: '700' } });
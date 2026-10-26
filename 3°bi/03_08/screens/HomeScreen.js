import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.emoji}>📱</Text>

      <Text style={styles.title}>
        Minha Rotina
      </Text>

      <Text style={styles.subtitle}>
        Organize seu dia de forma simples.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Rotina')}
      >
        <Text style={styles.buttonText}>
          Ver minha rotina
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Sobre')}
      >
        <Text style={styles.buttonSecondaryText}>
          Sobre o aplicativo
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  emoji: {
    fontSize: 60,
    marginBottom: 15,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 35,
  },

  button: {
    width: '100%',
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  buttonSecondary: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2563eb',
  },

  buttonSecondaryText: {
    color: '#2563eb',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
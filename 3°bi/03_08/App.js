import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function SobreScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.icon}>ℹ️</Text>

      <Text style={styles.title}>
        Sobre o aplicativo
      </Text>

      <Text style={styles.text}>
        O Minha Rotina é um aplicativo simples
        criado para ajudar na organização das
        atividades do dia a dia.
      </Text>

      <Text style={styles.text}>
        Este aplicativo foi desenvolvido utilizando
        React Native e React Navigation.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>
          Voltar para o início
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Rotina')}
      >
        <Text style={styles.secondaryText}>
          Ver rotina
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

  icon: {
    fontSize: 55,
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },

  text: {
    fontSize: 17,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 15,
  },

  button: {
    width: '100%',
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },

  secondaryText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
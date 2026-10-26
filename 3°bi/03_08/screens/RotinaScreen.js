import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function RotinaScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        📅 Minha rotina
      </Text>

      <View style={styles.card}>
        <Text style={styles.time}>07:00</Text>
        <Text style={styles.activity}>Acordar</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.time}>08:00</Text>
        <Text style={styles.activity}>Estudar</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.time}>12:00</Text>
        <Text style={styles.activity}>Almoço</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.time}>18:00</Text>
        <Text style={styles.activity}>Fazer atividades</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Sobre')}
      >
        <Text style={styles.buttonText}>
          Ir para Sobre
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backText}>
          Voltar para o início
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    width: 80,
  },

  activity: {
    fontSize: 17,
    color: '#334155',
  },

  button: {
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

  backButton: {
    padding: 16,
    alignItems: 'center',
  },

  backText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

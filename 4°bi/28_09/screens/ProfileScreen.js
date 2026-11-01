
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function ProfileScreen({
  gamesCount,
  favoritesCount,
  onBack,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>👤</Text>
      <Text style={styles.heading}>Meu perfil</Text>
      <Text style={styles.subtitle}>Jogador do GameHub</Text>

      <View style={styles.stat}>
        <Text style={styles.number}>{gamesCount}</Text>
        <Text style={styles.label}>Jogos na coleção</Text>
      </View>

      <View style={styles.stat}>
        <Text style={styles.number}>{favoritesCount}</Text>
        <Text style={styles.label}>Jogos favoritos</Text>
      </View>

      <Text style={styles.note}>
        Continue explorando e montando sua coleção!
      </Text>

      <Pressable style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Voltar ao início</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
    padding: 25,
    paddingTop: 60,
    alignItems: 'center',
  },
  avatar: {
    fontSize: 65,
    marginBottom: 12,
  },
  heading: {
    color: '#a78bfa',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#d4d4d8',
    marginTop: 8,
    marginBottom: 30,
  },
  stat: {
    backgroundColor: '#27272a',
    width: '100%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  number: {
    color: '#c4b5fd',
    fontSize: 30,
    fontWeight: 'bold',
  },
  label: {
    color: '#ffffff',
    marginTop: 5,
  },
  note: {
    color: '#d4d4d8',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6d28d9',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});


import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function DetailsScreen({
  game,
  isFavorite,
  onFavorite,
  onBack,
}) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.emoji}>{game.emoji}</Text>
      <Text style={styles.heading}>{game.name}</Text>

      <View style={styles.info}>
        <Text style={styles.label}>Categoria</Text>
        <Text style={styles.value}>{game.category}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Ano de lançamento</Text>
        <Text style={styles.value}>{game.year}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.value}>{game.description}</Text>
      </View>

      <Pressable style={styles.primary} onPress={onFavorite}>
        <Text style={styles.buttonText}>
          {isFavorite
            ? '❤️ Remover dos favoritos'
            : '🤍 Adicionar aos favoritos'}
        </Text>
      </Pressable>

      <Pressable style={styles.secondary} onPress={onBack}>
        <Text style={styles.buttonText}>Voltar à coleção</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
    padding: 24,
    paddingTop: 50,
  },
  emoji: {
    fontSize: 70,
    textAlign: 'center',
    marginBottom: 12,
  },
  heading: {
    color: '#a78bfa',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  info: {
    backgroundColor: '#27272a',
    padding: 17,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: {
    color: '#c4b5fd',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  value: {
    color: '#ffffff',
    fontSize: 16,
  },
  primary: {
    backgroundColor: '#6d28d9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  secondary: {
    backgroundColor: '#3f3f46',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

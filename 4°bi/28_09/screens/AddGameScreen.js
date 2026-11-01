
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

export default function AddGameScreen({ onAdd, onBack }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  function saveGame() {
    const currentYear = new Date().getFullYear();
    const numericYear = Number(year);

    if (!name.trim() || !category.trim() || !year.trim()) {
      Alert.alert('Atenção', 'Preencha nome, categoria e ano.');
      return;
    }

    if (
      !Number.isInteger(numericYear) ||
      numericYear < 1950 ||
      numericYear > currentYear
    ) {
      Alert.alert('Ano inválido', 'Digite um ano válido.');
      return;
    }

    onAdd({
      id: Date.now().toString(),
      name: name.trim(),
      category: category.trim(),
      year: numericYear,
      description: description.trim() || 'Sem descrição.',
      emoji: '🎮',
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>＋ Novo jogo</Text>
      <Text style={styles.subtitle}>
        Adicione um jogo à sua coleção.
      </Text>

      <Text style={styles.label}>Nome do jogo *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Elden Ring"
        placeholderTextColor="#a1a1aa"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Categoria *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: RPG"
        placeholderTextColor="#a1a1aa"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Ano de lançamento *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 2022"
        placeholderTextColor="#a1a1aa"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Conte um pouco sobre o jogo..."
        placeholderTextColor="#a1a1aa"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Pressable style={styles.primaryButton} onPress={saveGame}>
        <Text style={styles.buttonText}>Salvar jogo</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={onBack}>
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
    padding: 22,
    paddingTop: 45,
  },
  heading: {
    color: '#a78bfa',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#d4d4d8',
    marginTop: 8,
    marginBottom: 22,
  },
  label: {
    color: '#ffffff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#27272a',
    color: '#ffffff',
    padding: 13,
    borderRadius: 9,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#52525b',
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#3f3f46',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

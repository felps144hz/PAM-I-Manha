import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import styles from './Estilo';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [lista, setLista] = useState([]);

  function adicionarTarefa() {
    if (tarefa.trim() === '') {
      return;
    }

    setLista([...lista, tarefa]);
    setTarefa('');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Minha Lista de Tarefas
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa"
        value={tarefa}
        onChangeText={setTarefa}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={adicionarTarefa}
      >
        <Text style={styles.textoBotao}>
          Adicionar tarefa
        </Text>
      </TouchableOpacity>

      <FlatList
        data={lista}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tarefa}>
            <Text style={styles.textoTarefa}>
              ✓ {item}
            </Text>
          </View>
        )}
      />

    </View>
  );
}

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import { useState, useEffect } from 'react';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase/firebase';

import estilos from './estilo';

export default function Editar({ navigation }) {

  const [nome, setNome] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {

    try {

      const usuario = auth.currentUser;

      if (usuario) {

        const documento = await getDoc(
          doc(db, 'usuarios', usuario.uid)
        );

        if (documento.exists()) {
          setNome(documento.data().nome);
        }

      }

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    }
  }

  async function salvar() {

    if (!nome.trim()) {
      Alert.alert('Atenção', 'Digite seu nome.');
      return;
    }

    try {

      const usuario = auth.currentUser;

      await updateDoc(
        doc(db, 'usuarios', usuario.uid),
        {
          nome: nome.trim()
        }
      );

      Alert.alert('Sucesso', 'Perfil atualizado!');

      navigation.goBack();

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  }

  return (
    <View style={estilos.container}>

      <Text style={estilos.logo}>RIOT GAMES</Text>

      <Text style={estilos.titulo}>Editar Perfil</Text>

      <Text style={estilos.texto}>Novo nome</Text>

      <TextInput
        style={estilos.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity
        style={estilos.botao}
        onPress={salvar}
      >
        <Text style={estilos.botaoTexto}>SALVAR ALTERAÇÕES</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={estilos.botaoTexto}>CANCELAR</Text>
      </TouchableOpacity>

    </View>
  );
}

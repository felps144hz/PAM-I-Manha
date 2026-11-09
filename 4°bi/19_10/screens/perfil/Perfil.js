
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import { useState, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase/firebase';

import estilos from './estilo';

export default function Perfil({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  async function carregarPerfil() {

    try {

      const usuario = auth.currentUser;

      if (usuario) {

        const documento = await getDoc(
          doc(db, 'usuarios', usuario.uid)
        );

        if (documento.exists()) {
          setNome(documento.data().nome);
          setEmail(documento.data().email);
        }

      }

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o perfil.');
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarPerfil);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={estilos.container}>

      <Text style={estilos.logo}>RIOT GAMES</Text>

      <Text style={estilos.titulo}>Meu Perfil</Text>

      <View style={estilos.card}>

        <Text style={estilos.label}>Nome</Text>
        <Text style={estilos.valor}>{nome}</Text>

        <Text style={estilos.label}>E-mail</Text>
        <Text style={estilos.valor}>{email}</Text>

      </View>

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.navigate('Editar')}
      >
        <Text style={estilos.botaoTexto}>EDITAR PERFIL</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={estilos.botaoTexto}>VOLTAR</Text>
      </TouchableOpacity>

    </View>
  );
}


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

import { useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase/firebase';

import estilos from './estilo';

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  async function cadastrar() {

    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }

    try {

      const usuarioCriado =
        await createUserWithEmailAndPassword(auth, email, senha);

      const uid = usuarioCriado.user.uid;

      await setDoc(doc(db, 'usuarios', uid), {
        nome: nome,
        email: email,
      });

      Alert.alert('Sucesso', 'Cadastro realizado!');

      navigation.replace('Home');

    } catch (error) {

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este e-mail já está cadastrado.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'Digite um e-mail válido.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Erro', 'A senha precisa ter pelo menos 6 caracteres.');
      } else {
        Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
      }

    }
  }

  return (
    <ScrollView
      contentContainerStyle={estilos.container}
      keyboardShouldPersistTaps="handled"
    >

      <View style={estilos.conteudo}>

        <Text style={estilos.logo}>RIOT GAMES</Text>

        <Text style={estilos.titulo}>Criar uma conta</Text>

        <Text style={estilos.subtitulo}>
          Faça parte do universo Riot!
        </Text>

        <Text style={estilos.texto}>Nome</Text>

        <TextInput
          style={estilos.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={estilos.texto}>E-mail</Text>

        <TextInput
          style={estilos.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={estilos.texto}>Senha</Text>

        <TextInput
          style={estilos.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={estilos.texto}>Confirmar senha</Text>

        <TextInput
          style={estilos.input}
          placeholder="Digite sua senha novamente"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity
          style={estilos.botao}
          onPress={cadastrar}
        >
          <Text style={estilos.botaoTexto}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={estilos.link}>
            Já possui uma conta? Entrar
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

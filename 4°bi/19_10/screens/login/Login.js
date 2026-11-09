
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import estilos from './estilo';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  async function fazerLogin() {
    setMensagemErro('');

    if (!email || !senha) {
      setMensagemErro('Preencha todos os campos!');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);

      navigation.replace('Home');

    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password'
      ) {
        setMensagemErro(
          'E-mail ou senha incorretos. Confira seus dados ou faça seu cadastro!'
        );
      } else if (error.code === 'auth/invalid-email') {
        setMensagemErro('Digite um e-mail válido!');
      } else {
        setMensagemErro(
          'Não foi possível entrar. Tente novamente.'
        );
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={estilos.conteudo}>

        <Text style={estilos.logo}>RIOT GAMES</Text>

        <Text style={estilos.titulo}>Bem-vindo!</Text>

        <Text style={estilos.subtitulo}>
          Entre na sua conta para continuar
        </Text>

        <TextInput
          style={estilos.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(texto) => {
            setEmail(texto);
            setMensagemErro('');
          }}
        />

        <TextInput
          style={estilos.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={(texto) => {
            setSenha(texto);
            setMensagemErro('');
          }}
        />

        {mensagemErro !== '' && (
          <Text style={estilos.erro}>
            {mensagemErro}
          </Text>
        )}

        <TouchableOpacity
          style={estilos.botao}
          onPress={fazerLogin}
        >
          <Text style={estilos.textoBotao}>ENTRAR</Text>
        </TouchableOpacity>

        <View style={estilos.areaCadastro}>
          <Text style={estilos.texto}>
            Não tem uma conta?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={estilos.link}> Cadastre-se</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}


import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import estilos from './estilo';

export default function Sobre({ navigation }) {

  return (
    <View style={estilos.container}>

      <Text style={estilos.logo}>RIOT GAMES</Text>

      <Text style={estilos.titulo}>Sobre o aplicativo</Text>

      <Text style={estilos.texto}>
        Este aplicativo foi desenvolvido com o objetivo
        de apresentar alguns dos principais jogos da
        Riot Games.
      </Text>

      <Text style={estilos.texto}>
        Aqui os usuários podem conhecer os jogos,
        criar uma conta, acessar seu perfil e editar
        suas informações pessoais.
      </Text>

      <Text style={estilos.tecnologias}>
        Tecnologias utilizadas:
      </Text>

      <Text style={estilos.lista}>
        • React Native
      </Text>

      <Text style={estilos.lista}>
        • Expo
      </Text>

      <Text style={estilos.lista}>
        • Firebase Authentication
      </Text>

      <Text style={estilos.lista}>
        • Cloud Firestore
      </Text>

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.goBack()}
      >
        <Text style={estilos.botaoTexto}>VOLTAR</Text>
      </TouchableOpacity>

    </View>
  );
}

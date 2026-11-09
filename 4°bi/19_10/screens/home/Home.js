
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { signOut } from 'firebase/auth';

import { auth } from '../../firebase/firebase';

import estilos from './estilo';

const jogos = [
  {
    nome: 'League of Legends',
    categoria: 'MOBA',
    descricao: 'Entre no Rift e participe de batalhas estratégicas.'
  },
  {
    nome: 'VALORANT',
    categoria: 'FPS',
    descricao: 'Um jogo competitivo de tiro com agentes e habilidades.'
  },
  {
    nome: 'Teamfight Tactics',
    categoria: 'Estratégia',
    descricao: 'Monte sua equipe e enfrente outros jogadores.'
  },
  {
    nome: 'Legends of Runeterra',
    categoria: 'Cartas',
    descricao: 'Explore Runeterra através de batalhas com cartas.'
  }
];

export default function Home({ navigation }) {

  async function sair() {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      alert('Não foi possível sair da conta.');
    }
  }

  return (
    <ScrollView style={estilos.container}>

      <View style={estilos.topo}>

        <Text style={estilos.logo}>RIOT GAMES</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={estilos.menu}>MEU PERFIL</Text>
        </TouchableOpacity>

      </View>

      <View style={estilos.banner}>
        <Text style={estilos.titulo}>
          UNIVERSO RIOT
        </Text>

        <Text style={estilos.subtitulo}>
          Conheça os jogos que conquistaram o mundo.
        </Text>
      </View>

      <Text style={estilos.tituloSecao}>
        NOSSOS JOGOS
      </Text>

      {jogos.map((jogo, index) => (

        <View style={estilos.card} key={index}>

          <Text style={estilos.nomeJogo}>
            {jogo.nome}
          </Text>

          <Text style={estilos.categoria}>
            {jogo.categoria}
          </Text>

          <Text style={estilos.descricao}>
            {jogo.descricao}
          </Text>

        </View>

      ))}

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.navigate('Sobre')}
      >
        <Text style={estilos.botaoTexto}>SOBRE O APLICATIVO</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botaoSair}
        onPress={sair}
      >
        <Text style={estilos.botaoTexto}>SAIR DA CONTA</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

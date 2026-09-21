import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [pesquisa, setPesquisa] = useState('');

  const filmes = [
    {
      id: 1,
      nome: 'Interestelar',
      genero: 'Ficção Científica',
      nota: '9.0',
      imagem:
        'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      descricao:
        'Uma equipe de astronautas viaja pelo espaço em busca de um novo planeta para a humanidade.',
    },
    {
      id: 2,
      nome: 'O Rei Leão',
      genero: 'Animação',
      nota: '8.5',
      imagem:
        'https://image.tmdb.org/t/p/w500/2e853FDVSIso6000T4uN7u3g6X.jpg',
      descricao:
        'Simba precisa enfrentar desafios e descobrir seu verdadeiro lugar como rei.',
    },
    {
      id: 3,
      nome: 'Vingadores: Ultimato',
      genero: 'Ação',
      nota: '8.4',
      imagem:
        'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      descricao:
        'Os Vingadores enfrentam uma última batalha para tentar salvar o universo.',
    },
    {
      id: 4,
      nome: 'Harry Potter',
      genero: 'Fantasia',
      nota: '8.1',
      imagem:
        'https://image.tmdb.org/t/p/w500/1BDkElk5B9ZVqk1FqQkN7eY9F.jpg',
      descricao:
        'Um jovem bruxo descobre seus poderes e começa sua jornada em Hogwarts.',
    },
    {
      id: 5,
      nome: 'Toy Story',
      genero: 'Animação',
      nota: '8.3',
      imagem:
        'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
      descricao:
        'Brinquedos ganham vida quando seus donos não estão por perto.',
    },
    {
      id: 6,
      nome: 'Jurassic Park',
      genero: 'Aventura',
      nota: '8.2',
      imagem:
        'https://image.tmdb.org/t/p/w500/fjTU1Bgh3KJu4xT.jpg',
      descricao:
        'Um parque cheio de dinossauros geneticamente recriados se transforma em uma ameaça.',
    },
  ];

  const filmesFiltrados = filmes.filter((filme) =>
    filme.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.logo}>CINEFLIX</Text>

          <Text style={styles.titulo}>
            Encontre seu próximo filme 🍿
          </Text>

          <Text style={styles.subtitulo}>
            Filmes que você precisa assistir
          </Text>
        </View>

        {/* PESQUISA */}
        <View style={styles.pesquisaArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome de um filme..."
            placeholderTextColor="#888"
            value={pesquisa}
            onChangeText={setPesquisa}
          />

          <View style={styles.botao}>
            <Button
              title="Pesquisar"
              onPress={() => {}}
              color="#E50914"
            />
          </View>
        </View>

        {/* DESTAQUE */}
        <View style={styles.destaque}>
          <Image
            source={{
              uri: filmes[0].imagem,
            }}
            style={styles.imagemDestaque}
          />

          <View style={styles.destaqueInfo}>
            <Text style={styles.destaqueTitulo}>
              {filmes[0].nome}
            </Text>

            <Text style={styles.destaqueGenero}>
              {filmes[0].genero}
            </Text>

            <Text style={styles.destaqueNota}>
              ⭐ {filmes[0].nota}
            </Text>

            <Text style={styles.destaqueDescricao}>
              {filmes[0].descricao}
            </Text>
          </View>
        </View>

        {/* LISTA */}
        <Text style={styles.secaoTitulo}>
          Filmes populares
        </Text>

        <View style={styles.lista}>
          {filmesFiltrados.map((filme) => (
            <View style={styles.card} key={filme.id}>

              <Image
                source={{ uri: filme.imagem }}
                style={styles.imagem}
              />

              <View style={styles.info}>
                <Text style={styles.nome}>
                  {filme.nome}
                </Text>

                <Text style={styles.genero}>
                  {filme.genero}
                </Text>

                <Text style={styles.nota}>
                  ⭐ {filme.nota}
                </Text>

                <Text style={styles.descricao}>
                  {filme.descricao}
                </Text>
              </View>

            </View>
          ))}

          {filmesFiltrados.length === 0 && (
            <Text style={styles.naoEncontrado}>
              Nenhum filme encontrado 😕
            </Text>
          )}
        </View>

        {/* RODAPÉ */}
        <View style={styles.footer}>
          <Text style={styles.footerTexto}>
            🎬 CINEFLIX
          </Text>

          <Text style={styles.footerSubtexto}>
            Seu catálogo de filmes
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
  },

  header: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },

  logo: {
    color: '#E50914',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 25,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitulo: {
    color: '#999999',
    fontSize: 15,
  },

  pesquisaArea: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#1A1A21',
    borderWidth: 1,
    borderColor: '#30303A',
    borderRadius: 12,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 12,
  },

  botao: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  destaque: {
    marginHorizontal: 20,
    backgroundColor: '#181820',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 30,
  },

  imagemDestaque: {
    width: '100%',
    height: 220,
  },

  destaqueInfo: {
    padding: 20,
  },

  destaqueTitulo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  destaqueGenero: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 8,
  },

  destaqueNota: {
    color: '#FFD166',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  destaqueDescricao: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 21,
  },

  secaoTitulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
  },

  lista: {
    paddingHorizontal: 20,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#181820',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },

  imagem: {
    width: 110,
    height: 165,
  },

  info: {
    flex: 1,
    padding: 15,
  },

  nome: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  genero: {
    color: '#999999',
    fontSize: 13,
    marginBottom: 7,
  },

  nota: {
    color: '#FFD166',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  descricao: {
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 17,
  },

  naoEncontrado: {
    color: '#AAAAAA',
    textAlign: 'center',
    fontSize: 16,
    padding: 30,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 35,
    marginTop: 10,
  },

  footerTexto: {
    color: '#E50914',
    fontSize: 20,
    fontWeight: 'bold',
  },

  footerSubtexto: {
    color: '#777777',
    fontSize: 13,
    marginTop: 5,
  },
});
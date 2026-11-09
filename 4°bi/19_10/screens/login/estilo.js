
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  conteudo: {
    width: '100%',
    maxWidth: 420,
  },

  logo: {
    color: '#E52B2B',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 45,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitulo: {
    color: '#AAAAAA',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 35,
  },

  input: {
    backgroundColor: '#242424',
    color: '#FFFFFF',
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
  },

  erro: {
    color: '#FF5555',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 19,
  },

  botao: {
    backgroundColor: '#D92332',
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  areaCadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  texto: {
    color: '#AAAAAA',
    fontSize: 14,
  },

  link: {
    color: '#E52B2B',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default estilos;

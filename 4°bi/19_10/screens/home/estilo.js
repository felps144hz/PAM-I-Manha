
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 20,
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 30,
  },

  logo: {
    color: '#E52B2B',
    fontSize: 22,
    fontWeight: 'bold',
  },

  menu: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  banner: {
    backgroundColor: '#292020',
    padding: 30,
    borderRadius: 12,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: '#D92332',
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitulo: {
    color: '#CCCCCC',
    marginTop: 10,
    fontSize: 14,
  },

  tituloSecao: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#242424',
    padding: 22,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#383838',
  },

  nomeJogo: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },

  categoria: {
    color: '#E52B2B',
    marginTop: 8,
    fontWeight: 'bold',
  },

  descricao: {
    color: '#BBBBBB',
    marginTop: 10,
    lineHeight: 21,
  },

  botao: {
    backgroundColor: '#333333',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },

  botaoSair: {
    backgroundColor: '#D92332',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 35,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

});

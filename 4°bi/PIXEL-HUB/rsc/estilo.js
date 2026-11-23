import { StyleSheet } from 'react-native';


// ---------------------------------------------------------
// ESTILIZAÇÃO DO PIXEL HUB
// ---------------------------------------------------------

export default StyleSheet.create({

  // -------------------------------------------------------
  // ESTRUTURA GERAL
  // -------------------------------------------------------

  container: {
    flex: 1,
    backgroundColor: '#090B16',
  },

  tela: {
    flex: 1,
    backgroundColor: '#090B16',
  },

  header: {
    minHeight: 74,
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: '#0D1020',
    borderBottomWidth: 1,
    borderBottomColor: '#20263A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  // -------------------------------------------------------
  // LOGO E CABEÇALHO
  // -------------------------------------------------------

  logoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoIcone: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  logoIconeTexto: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },

  logoTexto: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },

  logoDestaque: {
    color: '#22D3EE',
  },

  logoSubtexto: {
    color: '#858BA4',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 2,
  },

  statusOnline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161D2D',
    borderWidth: 1,
    borderColor: '#28374A',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  statusPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A3E635',
    marginRight: 6,
  },

  statusTexto: {
    color: '#B7C3D2',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },


  // -------------------------------------------------------
  // TELA INICIAL
  // -------------------------------------------------------

  conteudoInicio: {
    paddingBottom: 25,
  },

  hero: {
    marginHorizontal: 16,
    marginTop: 17,
    marginBottom: 9,
    borderRadius: 22,
    paddingHorizontal: 19,
    paddingTop: 21,
    paddingBottom: 17,
    backgroundColor: '#17162D',
    borderWidth: 1,
    borderColor: '#39305F',
    overflow: 'hidden',
  },

  heroTag: {
    color: '#D8CCFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 15,
  },

  heroTitulo: {
    color: '#FFFFFF',
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '900',
    maxWidth: 330,
  },

  heroDestaque: {
    color: '#22D3EE',
  },

  heroDescricao: {
    color: '#B4B5C8',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 11,
    marginBottom: 20,
  },

  heroAtalho: {
    color: '#D8CCFF',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 15,
    alignSelf: 'flex-end',
  },


  // -------------------------------------------------------
  // CAMPO DE PESQUISA
  // -------------------------------------------------------

  pesquisaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0C1020',
    borderWidth: 1,
    borderColor: '#51417B',
    borderRadius: 13,
    paddingLeft: 12,
    paddingRight: 5,
    height: 52,
  },

  pesquisaInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    height: '100%',
  },

  botaoPesquisar: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoPesquisarTexto: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },


  // -------------------------------------------------------
  // SEÇÕES DA TELA INICIAL
  // -------------------------------------------------------

  secao: {
    marginTop: 23,
  },

  secaoCabecalho: {
    paddingHorizontal: 19,
    marginBottom: 13,
  },

  secaoTitulo: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },

  secaoDescricao: {
    color: '#A1A1AA',
    fontSize: 11,
    marginTop: 5,
  },

  listaHorizontal: {
    paddingHorizontal: 16,
    paddingBottom: 5,
  },

  jogoHorizontal: {
    width: 155,
    backgroundColor: '#151A2B',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#272D43',
    padding: 8,
    marginRight: 12,
    overflow: 'hidden',
  },

  capaHorizontal: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#22283C',
  },

  nomeHorizontal: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 9,
    minHeight: 34,
  },

  notaHorizontal: {
    color: '#FACC15',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 5,
  },

  coracaoHorizontal: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#090B16',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoSecaoVazia: {
    color: '#A1A1AA',
    fontSize: 12,
    marginHorizontal: 19,
    marginTop: 8,
  },


  // -------------------------------------------------------
  // IMAGENS SEM CAPA
  // -------------------------------------------------------

  capaSemImagem: {
    backgroundColor: '#242039',
    alignItems: 'center',
    justifyContent: 'center',
  },

  capaSemImagemTexto: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },


  // -------------------------------------------------------
  // CHAMADA DA BIBLIOTECA
  // -------------------------------------------------------

  chamadaBiblioteca: {
    backgroundColor: '#17162D',
    marginHorizontal: 16,
    marginTop: 27,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#46376C',
    padding: 18,
  },

  chamadaTitulo: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },

  chamadaDescricao: {
    color: '#B0B0C2',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 9,
  },

  chamadaBotao: {
    backgroundColor: '#8B5CF6',
    padding: 13,
    borderRadius: 10,
    marginTop: 17,
    alignItems: 'center',
  },

  chamadaBotaoTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },


  // -------------------------------------------------------
  // TELA EXPLORAR
  // -------------------------------------------------------

  explorarCabecalho: {
    paddingHorizontal: 17,
    paddingTop: 20,
    paddingBottom: 15,
  },

  tituloPagina: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 7,
  },

  subtituloPagina: {
    color: '#A1A1AA',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 17,
  },

  tituloFiltro: {
    color: '#22D3EE',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 22,
    marginBottom: 11,
  },

  textoAjudaFiltro: {
    color: '#A1A1AA',
    fontSize: 11,
    marginTop: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#151A2B',
    borderWidth: 1,
    borderColor: '#30364D',
    marginRight: 8,
    marginBottom: 5,
  },

  chipAtivo: {
    backgroundColor: '#493078',
    borderColor: '#8B5CF6',
  },

  chipAtivoAzul: {
    backgroundColor: '#124052',
    borderColor: '#22D3EE',
  },

  chipTexto: {
    color: '#C2C4D0',
    fontSize: 11,
    fontWeight: '700',
  },

  chipTextoAtivo: {
    color: '#FFFFFF',
  },

  resultadosTitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 25,
    marginBottom: 5,
  },


  // -------------------------------------------------------
  // LISTAGEM DE RESULTADOS
  // -------------------------------------------------------

  listaVerticalConteudo: {
    paddingBottom: 23,
    flexGrow: 1,
  },

  resultadoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151A2B',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#272D43',
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 10,
  },

  resultadoPrincipal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  capaResultado: {
    width: 86,
    height: 105,
    borderRadius: 10,
    backgroundColor: '#22283C',
  },

  resultadoInfo: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 3,
  },

  nomeJogo: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },

  generoJogo: {
    color: '#22D3EE',
    fontSize: 10,
    marginTop: 7,
  },

  dataJogo: {
    color: '#A1A1AA',
    fontSize: 10,
    marginTop: 8,
  },

  notaRawgTexto: {
    color: '#FACC15',
    fontSize: 11,
    fontWeight: '900',
    marginTop: 8,
  },

  botaoCoracao: {
    width: 36,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
  },

  coracaoTexto: {
    color: '#A1A1AA',
    fontSize: 27,
    fontWeight: 'bold',
  },

  coracaoAtivo: {
    color: '#F43F5E',
  },


  // -------------------------------------------------------
  // CARREGAMENTO
  // -------------------------------------------------------

  carregandoInicio: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  carregandoLista: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  carregandoDetalhes: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carregandoTexto: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 10,
    marginLeft: 9,
  },

  botaoDesabilitado: {
    opacity: 0.5,
  },


  // -------------------------------------------------------
  // ERROS E MENSAGENS
  // -------------------------------------------------------

  erroBox: {
    backgroundColor: '#321C2B',
    borderWidth: 1,
    borderColor: '#713047',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 12,
  },

  erroTexto: {
    color: '#FDA4AF',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 8,
  },

  tentarNovamente: {
    color: '#22D3EE',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 8,
  },


  // -------------------------------------------------------
  // ESTADOS VAZIOS
  // -------------------------------------------------------

  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
    paddingVertical: 45,
  },

  vazioIcone: {
    color: '#8B5CF6',
    fontSize: 43,
    marginBottom: 13,
  },

  vazioTitulo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
  },

  vazioDescricao: {
    color: '#A1A1AA',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 9,
  },


  // -------------------------------------------------------
  // CABEÇALHOS DE LISTAS
  // -------------------------------------------------------

  cabecalhoLista: {
    paddingHorizontal: 17,
    paddingTop: 22,
    paddingBottom: 15,
  },

  contadorBiblioteca: {
    color: '#22D3EE',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 12,
  },


  // -------------------------------------------------------
  // AVALIAÇÕES
  // -------------------------------------------------------

  avaliacaoCard: {
    backgroundColor: '#151A2B',
    borderWidth: 1,
    borderColor: '#33304B',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 15,
    marginVertical: 7,
  },

  avaliacaoNome: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  avaliacaoNota: {
    color: '#FACC15',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 12,
  },

  avaliacaoComentario: {
    color: '#C0C1CD',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 10,
  },

  botaoRemoverAvaliacao: {
    alignSelf: 'flex-start',
    marginTop: 15,
    paddingVertical: 8,
  },

  botaoRemoverTexto: {
    color: '#FB7185',
    fontSize: 11,
    fontWeight: '800',
  },


  // -------------------------------------------------------
  // TELA DE DETALHES
  // -------------------------------------------------------

  detalhesTela: {
    flex: 1,
    backgroundColor: '#090B16',
  },

  detalhesBarraTopo: {
    height: 58,
    backgroundColor: '#0D1020',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#252A3E',
  },

  botaoVoltar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#222039',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoVoltarTexto: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
  },

  detalhesBarraTitulo: {
    color: '#B8B1CD',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginLeft: 14,
  },

  detalhesConteudo: {
    paddingBottom: 30,
  },

  imagemDetalhes: {
    width: '100%',
    height: 235,
    backgroundColor: '#22283C',
  },

  tagDetalhe: {
    color: '#22D3EE',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginHorizontal: 18,
    marginTop: 20,
  },

  detalhesNome: {
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '900',
    marginHorizontal: 18,
    marginTop: 10,
  },

  detalhesGeneros: {
    color: '#A1A1AA',
    fontSize: 12,
    marginHorizontal: 18,
    marginTop: 9,
  },

  linhaNotas: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 20,
  },

  notaRawgBox: {
    backgroundColor: '#28213E',
    borderWidth: 1,
    borderColor: '#55417B',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },

  notaRawgLabel: {
    color: '#C4B5FD',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },

  notaRawgValor: {
    color: '#FACC15',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 3,
  },

  botaoFavoritarDetalhe: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    backgroundColor: '#241C39',
    padding: 13,
    borderRadius: 12,
    alignItems: 'center',
  },

  botaoFavoritarAtivo: {
    borderColor: '#F43F5E',
    backgroundColor: '#351D2A',
  },

  botaoFavoritarTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },


  // -------------------------------------------------------
  // INFORMAÇÕES DO JOGO
  // -------------------------------------------------------

  blocoDetalhe: {
    marginHorizontal: 18,
    marginTop: 25,
    backgroundColor: '#151A2B',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#292F46',
  },

  tituloBlocoDetalhe: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },

  descricaoDetalhe: {
    color: '#B8BBC9',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 12,
  },

  informacoesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 13,
    marginTop: 17,
  },

  informacaoItem: {
    width: '50%',
    padding: 7,
  },

  informacaoItemLargo: {
    width: '100%',
    padding: 7,
  },

  informacaoLabel: {
    color: '#22D3EE',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },

  informacaoValor: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 18,
  },


  // -------------------------------------------------------
  // ÁREA DE AVALIAÇÃO PESSOAL
  // -------------------------------------------------------

  avaliarBloco: {
    marginHorizontal: 16,
    marginTop: 25,
    backgroundColor: '#151A2B',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#43336B',
    padding: 17,
  },

  avaliarSubtitulo: {
    color: '#A1A1AA',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 7,
  },

  avaliacaoSalva: {
    backgroundColor: '#20263A',
    borderWidth: 1,
    borderColor: '#3A4262',
    borderRadius: 12,
    padding: 12,
    marginTop: 15,
  },

  avaliacaoSalvaTitulo: {
    color: '#22D3EE',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  avaliacaoSalvaTexto: {
    color: '#FACC15',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },

  estrelasEscolha: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },

  estrelaEscolha: {
    color: '#777D92',
    fontSize: 37,
    paddingHorizontal: 6,
  },

  estrelaEscolhida: {
    color: '#FACC15',
  },

  ajudaEstrelas: {
    textAlign: 'center',
    color: '#A1A1AA',
    fontSize: 11,
    marginTop: 7,
    marginBottom: 17,
  },

  comentarioInput: {
    backgroundColor: '#0C1020',
    borderWidth: 1,
    borderColor: '#353B53',
    borderRadius: 11,
    color: '#FFFFFF',
    fontSize: 12,
    padding: 13,
    height: 105,
  },

  botaoSalvarAvaliacao: {
    backgroundColor: '#8B5CF6',
    borderRadius: 11,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },

  botaoSalvarTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  erroAvaliacao: {
    color: '#FB7185',
    fontSize: 11,
    marginTop: 9,
  },

  linkRemoverAvaliacao: {
    alignItems: 'center',
    padding: 12,
    marginTop: 5,
  },

  linkRemoverTexto: {
    color: '#FB7185',
    fontSize: 11,
    fontWeight: '800',
  },


  // -------------------------------------------------------
  // NAVEGAÇÃO INFERIOR
  // -------------------------------------------------------

  navegacao: {
    minHeight: 66,
    backgroundColor: '#101426',
    borderTopWidth: 1,
    borderTopColor: '#292F46',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 4,
  },

  itemNavegacao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
  },

  iconeNavegacao: {
    color: '#777D92',
    fontSize: 23,
    fontWeight: '900',
  },

  iconeNavegacaoAtivo: {
    color: '#8B5CF6',
  },

  textoNavegacao: {
    color: '#858BA4',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 3,
  },

  textoNavegacaoAtivo: {
    color: '#FFFFFF',
  },

  navegacaoIndicador: {
    width: 17,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#22D3EE',
    marginTop: 3,
  },


  // -------------------------------------------------------
  // ATRIBUIÇÃO E CRÉDITOS
  // -------------------------------------------------------

  atribuicao: {
    alignItems: 'center',
    paddingVertical: 19,
    marginHorizontal: 15,
  },

  atribuicaoTexto: {
    color: '#858BA4',
    fontSize: 10,
    textAlign: 'center',
  },

});
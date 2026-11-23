import React, { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  Linking,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


// ---------------------------------------------------------
// IMPORTAÇÃO DA API
// ---------------------------------------------------------

import {
  apiConfigurada,
  jogoApropriado,
  buscarJogos,
  listarJogos,
  consultarJogo,
  buscarGeneros,
  buscarPlataformas,
  traduzirDescricao,
} from './rsc/api';


// ---------------------------------------------------------
// IMPORTAÇÃO DAS FUNÇÕES LOCAIS
// ---------------------------------------------------------

import {
  consultarFavoritos,
  salvarFavorito,
  removerFavorito,
  consultarAvaliacoes,
  salvarAvaliacao,
  editarAvaliacao,
  removerAvaliacao,
} from './rsc/funcoes';


// ---------------------------------------------------------
// IMPORTAÇÃO DOS ESTILOS
// ---------------------------------------------------------

import styles from './rsc/estilo';


// ---------------------------------------------------------
// FUNÇÕES AUXILIARES
// ---------------------------------------------------------

function formatarData(data) {
  if (!data) return 'Não informado';

  const partes = String(data).split('-');

  if (partes.length !== 3) return String(data);

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


function textoGeneros(jogo) {
  if (!jogo?.genres?.length) {
    return 'Gênero não informado';
  }

  return jogo.genres
    .map((genero) => genero.name)
    .filter(Boolean)
    .join(' • ');
}


function textoPlataformas(jogo) {
  if (!jogo?.platforms?.length) {
    return 'Não informado';
  }

  return jogo.platforms
    .map((item) => item.platform?.name || item.name)
    .filter(Boolean)
    .join(', ');
}


function textoNomes(lista) {
  if (!lista?.length) return 'Não informado';

  return lista
    .map((item) => item.name)
    .filter(Boolean)
    .join(', ') || 'Não informado';
}


function limparDescricao(descricao) {
  if (!descricao) {
    return 'Descrição não informada pela RAWG.';
  }

  return String(descricao)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}


function dataLocalISO(data) {
  const ano = data.getFullYear();

  const mes = String(data.getMonth() + 1).padStart(2, '0');

  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}


// ---------------------------------------------------------
// COMPONENTE PRINCIPAL
// ---------------------------------------------------------

export default function App() {

  // -------------------------------------------------------
  // ESTADOS DO APLICATIVO
  // -------------------------------------------------------

  const [pagina, setPagina] = useState('inicio');

  const [consulta, setConsulta] = useState('');

  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);

  const [temConsulta, setTemConsulta] = useState(false);

  const [jogosPopulares, setJogosPopulares] = useState([]);

  const [jogosBemAvaliados, setJogosBemAvaliados] = useState([]);

  const [jogosLancamentos, setJogosLancamentos] = useState([]);

  const [generos, setGeneros] = useState([]);

  const [plataformas, setPlataformas] = useState([]);

  const [generoSelecionado, setGeneroSelecionado] = useState('');

  const [plataformaSelecionada, setPlataformaSelecionada] = useState('');

  const [favoritos, setFavoritos] = useState([]);

  const [avaliacoes, setAvaliacoes] = useState([]);

  const [jogoSelecionado, setJogoSelecionado] = useState(null);

  const [notaUsuario, setNotaUsuario] = useState(0);

  const [comentarioUsuario, setComentarioUsuario] = useState('');


  // Estados de carregamento.

  const [carregandoInicio, setCarregandoInicio] = useState(false);

  const [carregandoPesquisa, setCarregandoPesquisa] = useState(false);

  const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);

  const [carregandoFiltros, setCarregandoFiltros] = useState(false);

  const [salvandoAvaliacao, setSalvandoAvaliacao] = useState(false);

  // Estados específicos da tradução.

  const [descricaoTraduzida, setDescricaoTraduzida] = useState('');

  const [carregandoTraducao, setCarregandoTraducao] = useState(false);

  const [erroTraducao, setErroTraducao] = useState('');


  // Estados de mensagens.

  const [erroInicio, setErroInicio] = useState('');

  const [erroPesquisa, setErroPesquisa] = useState('');

  const [erroDetalhes, setErroDetalhes] = useState('');

  const [erroAvaliacao, setErroAvaliacao] = useState('');


  // Identifica a consulta de detalhes atual.
  // Impede que uma tradução antiga sobrescreva a atual.

  const requisicaoDetalhes = useRef(0);


  // -------------------------------------------------------
  // CARREGAMENTO INICIAL
  // -------------------------------------------------------

  useEffect(() => {
    inicializarAplicativo();
  }, []);


  async function inicializarAplicativo() {

    try {

      const [listaFavoritos, listaAvaliacoes] = await Promise.all([
        consultarFavoritos(),
        consultarAvaliacoes(),
      ]);

      // Filtra os favoritos já armazenados.

      setFavoritos(
        listaFavoritos.filter(jogoApropriado)
      );

      // Filtra as avaliações já armazenadas.

      setAvaliacoes(
        listaAvaliacoes.filter(
          (item) => jogoApropriado(item.jogo)
        )
      );

    } catch (erro) {

      Alert.alert(
        'PIXEL HUB',
        erro.message || 'Não foi possível carregar os dados salvos.'
      );

    }

    if (apiConfigurada()) {

      await Promise.allSettled([
        carregarInicio(),
        carregarFiltros(),
      ]);

    } else {

      setErroInicio(
        'Configure sua chave RAWG no arquivo rsc/api.js.'
      );

    }
  }


  // -------------------------------------------------------
  // CARREGAMENTO DOS JOGOS DA TELA INICIAL
  // -------------------------------------------------------

  async function carregarInicio() {

    if (!apiConfigurada()) return;

    setCarregandoInicio(true);

    setErroInicio('');

    const hoje = new Date();

    const futuro = new Date();

    futuro.setFullYear(futuro.getFullYear() + 1);

    const periodoLancamentos =
      `${dataLocalISO(hoje)},${dataLocalISO(futuro)}`;

    const respostas = await Promise.allSettled([

      listarJogos({
        ordering: '-added',
        page_size: 12,
      }),

      listarJogos({
        ordering: '-rating',
        page_size: 12,
      }),

      listarJogos({
        dates: periodoLancamentos,
        ordering: '-released',
        page_size: 12,
      }),

    ]);

    if (respostas[0].status === 'fulfilled') {
      setJogosPopulares(respostas[0].value);
    }

    if (respostas[1].status === 'fulfilled') {
      setJogosBemAvaliados(respostas[1].value);
    }

    if (respostas[2].status === 'fulfilled') {
      setJogosLancamentos(respostas[2].value);
    }

    const falhas = respostas.filter(
      (resposta) => resposta.status === 'rejected'
    );

    if (falhas.length === 3) {

      setErroInicio(
        falhas[0].reason?.message ||
        'Não foi possível carregar os jogos.'
      );

    } else if (falhas.length > 0) {

      setErroInicio(
        'Algumas seções não puderam ser carregadas.'
      );

    }

    setCarregandoInicio(false);
  }


  // -------------------------------------------------------
  // CARREGAMENTO DE GÊNEROS E PLATAFORMAS
  // -------------------------------------------------------

  async function carregarFiltros() {

    if (!apiConfigurada()) return;

    setCarregandoFiltros(true);

    const respostas = await Promise.allSettled([
      buscarGeneros(),
      buscarPlataformas(),
    ]);

    if (respostas[0].status === 'fulfilled') {
      setGeneros(respostas[0].value);
    }

    if (respostas[1].status === 'fulfilled') {
      setPlataformas(respostas[1].value);
    }

    setCarregandoFiltros(false);
  }


  // -------------------------------------------------------
  // PESQUISA DE JOGOS
  // -------------------------------------------------------

  async function pesquisarJogos(texto = consulta) {

    const termo = String(texto || '').trim();

    Keyboard.dismiss();

    if (!termo) {

      setErroPesquisa(
        'Digite o nome de um jogo para pesquisar.'
      );

      setPagina('explorar');

      setTemConsulta(false);

      return;
    }

    setPagina('explorar');

    setErroPesquisa('');

    setGeneroSelecionado('');

    setPlataformaSelecionada('');

    setCarregandoPesquisa(true);

    setTemConsulta(true);

    try {

      const dados = await buscarJogos(termo);

      const aprovados = dados.filter(jogoApropriado);

      setResultadosPesquisa(aprovados);

      if (aprovados.length === 0) {

        setErroPesquisa(
          'Nenhum jogo encontrado. Tente outro nome.'
        );

      }

    } catch (erro) {

      setResultadosPesquisa([]);

      setErroPesquisa(
        erro.message || 'Não foi possível pesquisar os jogos.'
      );

    } finally {

      setCarregandoPesquisa(false);

    }
  }


  // -------------------------------------------------------
  // PESQUISA POR GÊNERO E PLATAFORMA
  // -------------------------------------------------------

  async function pesquisarComFiltros(novoGenero, novaPlataforma) {

    Keyboard.dismiss();

    setPagina('explorar');

    setConsulta('');

    setErroPesquisa('');

    setGeneroSelecionado(novoGenero);

    setPlataformaSelecionada(novaPlataforma);

    if (!novoGenero && !novaPlataforma) {

      setResultadosPesquisa([]);

      setTemConsulta(false);

      return;
    }

    setTemConsulta(true);

    setCarregandoPesquisa(true);

    try {

      const filtros = {};

      if (novoGenero) {
        filtros.genres = novoGenero;
      }

      if (novaPlataforma) {
        filtros.platforms = novaPlataforma;
      }

      const dados = await buscarJogos('', filtros);

      const aprovados = dados.filter(jogoApropriado);

      setResultadosPesquisa(aprovados);

      if (aprovados.length === 0) {

        setErroPesquisa(
          'Nenhum jogo encontrado com esses filtros.'
        );

      }

    } catch (erro) {

      setResultadosPesquisa([]);

      setErroPesquisa(
        erro.message || 'Não foi possível aplicar os filtros.'
      );

    } finally {

      setCarregandoPesquisa(false);

    }
  }


  // -------------------------------------------------------
  // DETALHES E TRADUÇÃO DOS JOGOS
  // -------------------------------------------------------

  async function abrirJogo(jogo) {

    if (!jogo) return;

    if (!jogoApropriado(jogo)) {

      Alert.alert(
        'Conteúdo não disponível',
        'Este jogo foi ocultado pelo filtro de conteúdo do PIXEL HUB.'
      );

      return;
    }

    // Cria um identificador para a abertura atual.

    const numeroRequisicao = ++requisicaoDetalhes.current;

    setJogoSelecionado(jogo);

    setCarregandoDetalhes(true);

    setCarregandoTraducao(false);

    setDescricaoTraduzida('');

    setErroTraducao('');

    setErroDetalhes('');

    setErroAvaliacao('');


    // Recupera a avaliação pessoal do jogo.

    const avaliacaoExistente = avaliacoes.find(
      (item) => String(item.gameId) === String(jogo.id)
    );

    setNotaUsuario(
      avaliacaoExistente?.rating || 0
    );

    setComentarioUsuario(
      avaliacaoExistente?.comment || ''
    );


    try {

      // Consulta as informações completas do jogo.

      const detalhes = await consultarJogo(jogo.id);

      // Verifica se o usuário ainda está nesse jogo.

      if (numeroRequisicao !== requisicaoDetalhes.current) {
        return;
      }

      if (!jogoApropriado(detalhes)) {

        setJogoSelecionado(null);

        Alert.alert(
          'Conteúdo não disponível',
          'Este jogo foi bloqueado pelo filtro do PIXEL HUB.'
        );

        return;
      }

      setJogoSelecionado(detalhes);

      setCarregandoDetalhes(false);


      // Recupera a descrição original da RAWG.

      const descricaoOriginal = limparDescricao(
        detalhes.description_raw ||
        detalhes.description ||
        ''
      );

      // Exibe imediatamente a descrição original.
      // Ela será substituída pela tradução quando estiver pronta.

      setDescricaoTraduzida(descricaoOriginal);


      // Traduz a descrição para português.

      if (descricaoOriginal) {

        setCarregandoTraducao(true);

        setErroTraducao('');

        try {

          const traducao = await traduzirDescricao(
            descricaoOriginal
          );

          // Evita exibir a tradução de outro jogo.

          if (numeroRequisicao !== requisicaoDetalhes.current) {
            return;
          }

          if (traducao && traducao.trim()) {

            setDescricaoTraduzida(
              limparDescricao(traducao)
            );

          } else {

            setErroTraducao(
              'A tradução não retornou um resultado. Exibindo o texto original.'
            );

          }

        } catch (erro) {

          if (numeroRequisicao === requisicaoDetalhes.current) {

            setErroTraducao(
              'Não foi possível traduzir agora. Exibindo a descrição original.'
            );

          }

        } finally {

          if (numeroRequisicao === requisicaoDetalhes.current) {
            setCarregandoTraducao(false);
          }

        }

      }

    } catch (erro) {

      if (numeroRequisicao === requisicaoDetalhes.current) {

        setErroDetalhes(
          erro.message || 'Não foi possível carregar os detalhes.'
        );

      }

    } finally {

      if (numeroRequisicao === requisicaoDetalhes.current) {

        setCarregandoDetalhes(false);

      }

    }
  }


  // Fecha os detalhes e invalida traduções anteriores.

  function fecharDetalhes() {

    requisicaoDetalhes.current += 1;

    setJogoSelecionado(null);

    setDescricaoTraduzida('');

    setCarregandoTraducao(false);

    setCarregandoDetalhes(false);

    setErroDetalhes('');

    setErroTraducao('');

    setErroAvaliacao('');

  }


  // -------------------------------------------------------
  // FAVORITOS
  // -------------------------------------------------------

  async function alternarFavorito(jogo) {

    const jaExiste = favoritos.some(
      (item) => String(item.id) === String(jogo.id)
    );

    if (!jaExiste && !jogoApropriado(jogo)) {

      Alert.alert(
        'Conteúdo não disponível',
        'Este jogo não pode ser adicionado à biblioteca.'
      );

      return;
    }

    try {

      const atualizados = jaExiste
        ? await removerFavorito(jogo.id)
        : await salvarFavorito(jogo);

      setFavoritos(
        atualizados.filter(jogoApropriado)
      );

    } catch (erro) {

      Alert.alert(
        'Favoritos',
        erro.message || 'Não foi possível atualizar seus favoritos.'
      );

    }
  }


  // -------------------------------------------------------
  // AVALIAÇÕES
  // -------------------------------------------------------

  async function registrarAvaliacao() {

    if (!jogoSelecionado) return;

    if (!jogoApropriado(jogoSelecionado)) {

      setErroAvaliacao(
        'Este jogo não pode receber avaliações.'
      );

      return;
    }

    if (notaUsuario < 1 || notaUsuario > 5) {

      setErroAvaliacao(
        'Escolha de 1 a 5 estrelas antes de salvar.'
      );

      return;
    }

    setSalvandoAvaliacao(true);

    setErroAvaliacao('');

    const dadosAvaliacao = {

      gameId: jogoSelecionado.id,

      gameName: jogoSelecionado.name,

      rating: notaUsuario,

      comment: comentarioUsuario,

      jogo: {

        id: jogoSelecionado.id,

        name: jogoSelecionado.name,

        background_image: jogoSelecionado.background_image,

        genres: jogoSelecionado.genres || [],

        released: jogoSelecionado.released,

        rating: jogoSelecionado.rating,

        platforms: jogoSelecionado.platforms || [],

        esrb_rating: jogoSelecionado.esrb_rating,

      },

    };

    try {

      const jaExiste = avaliacoes.some(
        (item) => String(item.gameId) === String(jogoSelecionado.id)
      );

      const atualizadas = jaExiste
        ? await editarAvaliacao(dadosAvaliacao)
        : await salvarAvaliacao(dadosAvaliacao);

      setAvaliacoes(
        atualizadas.filter(
          (item) => jogoApropriado(item.jogo)
        )
      );

      Alert.alert(
        'PIXEL HUB',
        jaExiste
          ? 'Sua avaliação foi atualizada!'
          : 'Sua avaliação foi salva!'
      );

    } catch (erro) {

      setErroAvaliacao(
        erro.message || 'Não foi possível salvar sua avaliação.'
      );

    } finally {

      setSalvandoAvaliacao(false);

    }
  }


  // -------------------------------------------------------
  // REMOÇÃO DE AVALIAÇÕES
  // -------------------------------------------------------

  async function excluirAvaliacao(idJogo) {

    try {

      const atualizadas = await removerAvaliacao(idJogo);

      setAvaliacoes(atualizadas);

      if (
        jogoSelecionado &&
        String(jogoSelecionado.id) === String(idJogo)
      ) {

        setNotaUsuario(0);

        setComentarioUsuario('');

      }

    } catch (erro) {

      Alert.alert(
        'Avaliações',
        erro.message || 'Não foi possível remover a avaliação.'
      );

    }
  }


  // -------------------------------------------------------
  // CARD DE JOGO
  // -------------------------------------------------------

  function renderItem({ item }) {

    const favorito = favoritos.some(
      (jogo) => String(jogo.id) === String(item.id)
    );

    return (

      <View style={styles.resultadoCard}>

        <TouchableOpacity
          style={styles.resultadoPrincipal}
          activeOpacity={0.85}
          onPress={() => abrirJogo(item)}
        >

          {item.background_image ? (

            <Image
              source={{ uri: item.background_image }}
              style={styles.capaResultado}
            />

          ) : (

            <View
              style={[
                styles.capaResultado,
                styles.capaSemImagem,
              ]}
            >

              <Text style={styles.capaSemImagemTexto}>
                PIXEL
              </Text>

            </View>

          )}

          <View style={styles.resultadoInfo}>

            <Text style={styles.nomeJogo} numberOfLines={2}>
              {item.name || 'Jogo sem nome'}
            </Text>

            <Text style={styles.generoJogo} numberOfLines={2}>
              {textoGeneros(item)}
            </Text>

            <Text style={styles.dataJogo}>
              Lançamento: {formatarData(item.released)}
            </Text>

            <Text style={styles.notaRawgTexto}>
              ★ RAWG: {
                item.rating
                  ? Number(item.rating).toFixed(1)
                  : 'N/D'
              }
            </Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCoracao}
          onPress={() => alternarFavorito(item)}
        >

          <Text
            style={[
              styles.coracaoTexto,
              favorito && styles.coracaoAtivo,
            ]}
          >

            {favorito ? '♥' : '♡'}

          </Text>

        </TouchableOpacity>

      </View>

    );
  }


  // -------------------------------------------------------
  // CARD HORIZONTAL
  // -------------------------------------------------------

  function renderJogoHorizontal({ item }) {

    const favorito = favoritos.some(
      (jogo) => String(jogo.id) === String(item.id)
    );

    return (

      <TouchableOpacity
        style={styles.jogoHorizontal}
        activeOpacity={0.85}
        onPress={() => abrirJogo(item)}
      >

        {item.background_image ? (

          <Image
            source={{ uri: item.background_image }}
            style={styles.capaHorizontal}
          />

        ) : (

          <View
            style={[
              styles.capaHorizontal,
              styles.capaSemImagem,
            ]}
          >

            <Text style={styles.capaSemImagemTexto}>
              PIXEL
            </Text>

          </View>

        )}

        <Text style={styles.nomeHorizontal} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.notaHorizontal}>
          ★ {item.rating ? Number(item.rating).toFixed(1) : 'N/D'}
        </Text>

        <TouchableOpacity
          style={styles.coracaoHorizontal}
          onPress={() => alternarFavorito(item)}
        >

          <Text
            style={[
              styles.coracaoTexto,
              favorito && styles.coracaoAtivo,
            ]}
          >

            {favorito ? '♥' : '♡'}

          </Text>

        </TouchableOpacity>

      </TouchableOpacity>

    );
  }


  // -------------------------------------------------------
  // CARD DE AVALIAÇÃO
  // -------------------------------------------------------

  function renderAvaliacaoItem({ item }) {

    if (!jogoApropriado(item.jogo)) {
      return null;
    }

    return (

      <View style={styles.avaliacaoCard}>

        <Text style={styles.avaliacaoNome}>
          {item.jogo?.name || item.gameName}
        </Text>

        <Text style={styles.avaliacaoNota}>
          Sua nota: {'★'.repeat(item.rating)}
          {'☆'.repeat(5 - item.rating)}
        </Text>

        <Text style={styles.avaliacaoComentario}>
          {item.comment || 'Nenhum comentário registrado.'}
        </Text>

        <TouchableOpacity
          style={styles.botaoRemoverAvaliacao}
          onPress={() => excluirAvaliacao(item.gameId)}
        >

          <Text style={styles.botaoRemoverTexto}>
            Remover avaliação
          </Text>

        </TouchableOpacity>

      </View>

    );
  }


  // -------------------------------------------------------
  // SEÇÃO HORIZONTAL DE JOGOS
  // -------------------------------------------------------

  function renderSecaoJogos(titulo, descricao, dados) {

    return (

      <View style={styles.secao}>

        <View style={styles.secaoCabecalho}>

          <View>

            <Text style={styles.secaoTitulo}>
              {titulo}
            </Text>

            <Text style={styles.secaoDescricao}>
              {descricao}
            </Text>

          </View>

        </View>

        {dados.length > 0 ? (

          <FlatList
            data={dados.filter(jogoApropriado)}
            horizontal
            renderItem={renderJogoHorizontal}
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaHorizontal}
          />

        ) : (

          <Text style={styles.textoSecaoVazia}>
            Nenhum jogo disponível nesta seção.
          </Text>

        )}

      </View>

    );
  }


  // -------------------------------------------------------
  // CAMPO DE PESQUISA
  // -------------------------------------------------------

  function renderCampoPesquisa() {

    return (

      <View style={styles.pesquisaLinha}>

        <TextInput
          style={styles.pesquisaInput}
          placeholder="Pesquise jogos, ex: GTA V..."
          placeholderTextColor="#777D92"
          value={consulta}
          onChangeText={setConsulta}
          returnKeyType="search"
          autoCapitalize="none"
          onSubmitEditing={() => pesquisarJogos(consulta)}
        />

        <TouchableOpacity
          style={styles.botaoPesquisar}
          onPress={() => pesquisarJogos(consulta)}
        >

          <Text style={styles.botaoPesquisarTexto}>
            ⌕
          </Text>

        </TouchableOpacity>

      </View>

    );
  }


  // -------------------------------------------------------
  // ATRIBUIÇÃO DA RAWG
  // -------------------------------------------------------

  function renderAtribuicao() {

    return (

      <TouchableOpacity
        style={styles.atribuicao}
        onPress={() => Linking.openURL('https://rawg.io/')}
      >

        <Text style={styles.atribuicaoTexto}>
          Dados e imagens de jogos fornecidos pela RAWG ↗
        </Text>

      </TouchableOpacity>

    );
  }


  // -------------------------------------------------------
  // ESTADO VAZIO
  // -------------------------------------------------------

  function renderEstadoVazio(titulo, descricao) {

    return (

      <View style={styles.vazioContainer}>

        <Text style={styles.vazioIcone}>
          ◈
        </Text>

        <Text style={styles.vazioTitulo}>
          {titulo}
        </Text>

        <Text style={styles.vazioDescricao}>
          {descricao}
        </Text>

      </View>

    );
  }


  // -------------------------------------------------------
  // TELA INICIAL
  // -------------------------------------------------------

  function renderInicio() {

    return (

      <ScrollView
        style={styles.tela}
        contentContainerStyle={styles.conteudoInicio}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={carregandoInicio}
            onRefresh={carregarInicio}
            tintColor="#8B5CF6"
          />
        }
      >

        <View style={styles.hero}>

          <Text style={styles.heroTag}>
            ● SEU UNIVERSO GAMER
          </Text>

          <Text style={styles.heroTitulo}>
            Descubra seu próximo{' '}
            <Text style={styles.heroDestaque}>
              jogo favorito.
            </Text>
          </Text>

          <Text style={styles.heroDescricao}>
            Explore jogos, monte sua biblioteca e registre
            suas próprias avaliações.
          </Text>

          {renderCampoPesquisa()}

          <TouchableOpacity
            onPress={() => setPagina('favoritos')}
          >

            <Text style={styles.heroAtalho}>
              ♥ Minha biblioteca
            </Text>

          </TouchableOpacity>

        </View>

        {erroInicio !== '' && (

          <View style={styles.erroBox}>

            <Text style={styles.erroTexto}>
              {erroInicio}
            </Text>

            <TouchableOpacity onPress={carregarInicio}>

              <Text style={styles.tentarNovamente}>
                Tentar novamente
              </Text>

            </TouchableOpacity>

          </View>

        )}

        {carregandoInicio && jogosPopulares.length === 0 && (

          <View style={styles.carregandoInicio}>

            <ActivityIndicator
              size="large"
              color="#8B5CF6"
            />

            <Text style={styles.carregandoTexto}>
              Carregando jogos...
            </Text>

          </View>

        )}

        {renderSecaoJogos(
          'Em alta',
          'Jogos populares na comunidade',
          jogosPopulares
        )}

        {renderSecaoJogos(
          'Mais bem avaliados',
          'Destaques pela nota da RAWG',
          jogosBemAvaliados
        )}

        {renderSecaoJogos(
          'Próximos lançamentos',
          'Jogos com lançamento previsto',
          jogosLancamentos
        )}

        <View style={styles.chamadaBiblioteca}>

          <Text style={styles.chamadaTitulo}>
            Sua coleção, do seu jeito.
          </Text>

          <Text style={styles.chamadaDescricao}>
            Salve seus jogos favoritos e acompanhe suas avaliações.
          </Text>

          <TouchableOpacity
            style={styles.chamadaBotao}
            onPress={() => setPagina('favoritos')}
          >

            <Text style={styles.chamadaBotaoTexto}>
              Abrir biblioteca ›
            </Text>

          </TouchableOpacity>

        </View>

        {renderAtribuicao()}

      </ScrollView>

    );
  }


  // -------------------------------------------------------
  // CABEÇALHO DE EXPLORAR
  // -------------------------------------------------------

  function renderExplorarCabecalho() {

    return (

      <View style={styles.explorarCabecalho}>

        <Text style={styles.tituloPagina}>
          Explorar
        </Text>

        <Text style={styles.subtituloPagina}>
          Encontre jogos por nome, gênero ou plataforma.
        </Text>

        {renderCampoPesquisa()}

        <Text style={styles.tituloFiltro}>
          GÊNEROS
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          <TouchableOpacity
            style={[
              styles.chip,
              !generoSelecionado && styles.chipAtivo,
            ]}
            onPress={() =>
              pesquisarComFiltros('', plataformaSelecionada)
            }
          >

            <Text style={styles.chipTexto}>
              Todos
            </Text>

          </TouchableOpacity>

          {generos.map((genero) => (

            <TouchableOpacity
              key={String(genero.id)}
              style={[
                styles.chip,
                generoSelecionado === genero.slug && styles.chipAtivo,
              ]}
              onPress={() =>
                pesquisarComFiltros(
                  genero.slug,
                  plataformaSelecionada
                )
              }
            >

              <Text style={styles.chipTexto}>
                {genero.name}
              </Text>

            </TouchableOpacity>

          ))}

        </ScrollView>

        <Text style={styles.tituloFiltro}>
          PLATAFORMAS
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          <TouchableOpacity
            style={[
              styles.chip,
              !plataformaSelecionada && styles.chipAtivoAzul,
            ]}
            onPress={() =>
              pesquisarComFiltros(generoSelecionado, '')
            }
          >

            <Text style={styles.chipTexto}>
              Todas
            </Text>

          </TouchableOpacity>

          {plataformas.map((plataforma) => (

            <TouchableOpacity
              key={String(plataforma.id)}
              style={[
                styles.chip,
                plataformaSelecionada === String(plataforma.id) &&
                  styles.chipAtivoAzul,
              ]}
              onPress={() =>
                pesquisarComFiltros(
                  generoSelecionado,
                  String(plataforma.id)
                )
              }
            >

              <Text style={styles.chipTexto}>
                {plataforma.name}
              </Text>

            </TouchableOpacity>

          ))}

        </ScrollView>

        {carregandoFiltros && (

          <Text style={styles.textoAjudaFiltro}>
            Carregando gêneros e plataformas...
          </Text>

        )}

        {erroPesquisa !== '' && (

          <Text style={styles.erroTexto}>
            {erroPesquisa}
          </Text>

        )}

        <Text style={styles.resultadosTitulo}>
          {temConsulta ? 'Resultados da pesquisa' : 'Descubra jogos'}
        </Text>

      </View>

    );
  }


  // -------------------------------------------------------
  // TELA EXPLORAR
  // -------------------------------------------------------

  function renderExplorar() {

    return (

      <FlatList
        style={styles.tela}
        contentContainerStyle={styles.listaVerticalConteudo}
        data={resultadosPesquisa.filter(jogoApropriado)}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}

        // Mantém o cabeçalho como elemento renderizado.
        // Evita remontar o campo de pesquisa a cada tecla.

        ListHeaderComponent={renderExplorarCabecalho()}

        ListEmptyComponent={

          carregandoPesquisa ? (

            <View style={styles.carregandoLista}>

              <ActivityIndicator
                size="large"
                color="#8B5CF6"
              />

              <Text style={styles.carregandoTexto}>
                Buscando jogos...
              </Text>

            </View>

          ) : temConsulta ? (

            renderEstadoVazio(
              'Nenhum resultado',
              'Tente outro nome ou escolha outros filtros.'
            )

          ) : (

            renderEstadoVazio(
              'Explore sem limites',
              'Pesquise um jogo ou selecione um gênero ou plataforma.'
            )

          )

        }

        ListFooterComponent={renderAtribuicao()}

        keyboardShouldPersistTaps="handled"

        keyboardDismissMode="none"

        showsVerticalScrollIndicator={false}
      />

    );
  }


  // -------------------------------------------------------
  // TELA FAVORITOS
  // -------------------------------------------------------

  function renderFavoritos() {

    const favoritosAprovados = favoritos.filter(
      jogoApropriado
    );

    return (

      <FlatList
        style={styles.tela}
        contentContainerStyle={styles.listaVerticalConteudo}
        data={favoritosAprovados}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}

        ListHeaderComponent={

          <View style={styles.cabecalhoLista}>

            <Text style={styles.tituloPagina}>
              Minha biblioteca
            </Text>

            <Text style={styles.subtituloPagina}>
              Seus jogos salvos em um só lugar.
            </Text>

            <Text style={styles.contadorBiblioteca}>
              {favoritosAprovados.length} jogos favoritados
            </Text>

          </View>

        }

        ListEmptyComponent={renderEstadoVazio(
          'Sua biblioteca está vazia',
          'Toque no coração de um jogo para adicioná-lo aos favoritos.'
        )}

        ListFooterComponent={renderAtribuicao()}

        showsVerticalScrollIndicator={false}
      />

    );
  }


  // -------------------------------------------------------
  // TELA MINHAS AVALIAÇÕES
  // -------------------------------------------------------

  function renderAvaliacoes() {

    const avaliacoesAprovadas = avaliacoes.filter(
      (item) => jogoApropriado(item.jogo)
    );

    return (

      <FlatList
        style={styles.tela}
        contentContainerStyle={styles.listaVerticalConteudo}
        data={avaliacoesAprovadas}
        renderItem={renderAvaliacaoItem}
        keyExtractor={(item) => String(item.gameId)}

        ListHeaderComponent={

          <View style={styles.cabecalhoLista}>

            <Text style={styles.tituloPagina}>
              Minhas avaliações
            </Text>

            <Text style={styles.subtituloPagina}>
              Notas e comentários registrados por você.
            </Text>

            <Text style={styles.contadorBiblioteca}>
              {avaliacoesAprovadas.length} avaliações registradas
            </Text>

          </View>

        }

        ListEmptyComponent={renderEstadoVazio(
          'Nenhuma avaliação por enquanto',
          'Abra os detalhes de um jogo e dê sua nota de 1 a 5 estrelas.'
        )}

        ListFooterComponent={renderAtribuicao()}

        showsVerticalScrollIndicator={false}
      />

    );
  }


  // -------------------------------------------------------
  // TELA DE DETALHES DO JOGO
  // -------------------------------------------------------

  function renderDetalhes() {

    if (!jogoSelecionado) return null;

    const jaAvaliou = avaliacoes.some(
      (item) => String(item.gameId) === String(jogoSelecionado.id)
    );

    const favorito = favoritos.some(
      (item) => String(item.id) === String(jogoSelecionado.id)
    );

    const descricao =
      descricaoTraduzida ||
      limparDescricao(
        jogoSelecionado.description_raw ||
        jogoSelecionado.description
      );

    return (

      <View style={styles.detalhesTela}>

        <View style={styles.detalhesBarraTopo}>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={fecharDetalhes}
          >

            <Text style={styles.botaoVoltarTexto}>
              ‹
            </Text>

          </TouchableOpacity>

          <Text style={styles.detalhesBarraTitulo}>
            DETALHES DO JOGO
          </Text>

        </View>

        <ScrollView
          style={styles.tela}
          contentContainerStyle={styles.detalhesConteudo}
          showsVerticalScrollIndicator={false}
        >

          {jogoSelecionado.background_image ? (

            <Image
              source={{ uri: jogoSelecionado.background_image }}
              style={styles.imagemDetalhes}
            />

          ) : (

            <View
              style={[
                styles.imagemDetalhes,
                styles.capaSemImagem,
              ]}
            >

              <Text style={styles.capaSemImagemTexto}>
                PIXEL HUB
              </Text>

            </View>

          )}

          <Text style={styles.tagDetalhe}>
            GAME PROFILE
          </Text>

          <Text style={styles.detalhesNome}>
            {jogoSelecionado.name}
          </Text>

          <Text style={styles.detalhesGeneros}>
            {textoGeneros(jogoSelecionado)}
          </Text>

          <View style={styles.linhaNotas}>

            <View style={styles.notaRawgBox}>

              <Text style={styles.notaRawgLabel}>
                NOTA RAWG
              </Text>

              <Text style={styles.notaRawgValor}>
                ★ {
                  jogoSelecionado.rating
                    ? Number(jogoSelecionado.rating).toFixed(1)
                    : 'N/D'
                }
              </Text>

            </View>

            <TouchableOpacity
              style={[
                styles.botaoFavoritarDetalhe,
                favorito && styles.botaoFavoritarAtivo,
              ]}
              onPress={() => alternarFavorito(jogoSelecionado)}
            >

              <Text style={styles.botaoFavoritarTexto}>
                {favorito ? '♥  Salvo' : '♡  Favoritar'}
              </Text>

            </TouchableOpacity>

          </View>

          {carregandoDetalhes && (

            <View style={styles.carregandoDetalhes}>

              <ActivityIndicator color="#22D3EE" />

              <Text style={styles.carregandoTexto}>
                Carregando informações completas...
              </Text>

            </View>

          )}

          {erroDetalhes !== '' && (

            <Text style={styles.erroTexto}>
              {erroDetalhes}
            </Text>

          )}


          {/* DESCRIÇÃO DO JOGO EM PORTUGUÊS */}

          <View style={styles.blocoDetalhe}>

            <Text style={styles.tituloBlocoDetalhe}>
              Sobre o jogo
            </Text>

            {carregandoTraducao && (

              <View style={styles.carregandoDetalhes}>

                <ActivityIndicator color="#22D3EE" />

                <Text style={styles.carregandoTexto}>
                  Traduzindo descrição para português...
                </Text>

              </View>

            )}

            <Text style={styles.descricaoDetalhe}>
              {descricao}
            </Text>

            {erroTraducao !== '' && (

              <Text style={styles.carregandoTexto}>
                {erroTraducao}
              </Text>

            )}

            <Text style={styles.textoAjudaFiltro}>
              Tradução automática para português brasileiro.
            </Text>

          </View>


          {/* INFORMAÇÕES COMPLEMENTARES */}

          <View style={styles.informacoesGrid}>

            <View style={styles.informacaoItem}>

              <Text style={styles.informacaoLabel}>
                LANÇAMENTO
              </Text>

              <Text style={styles.informacaoValor}>
                {formatarData(jogoSelecionado.released)}
              </Text>

            </View>

            <View style={styles.informacaoItem}>

              <Text style={styles.informacaoLabel}>
                METACRITIC
              </Text>

              <Text style={styles.informacaoValor}>
                {jogoSelecionado.metacritic ?? 'Não informado'}
              </Text>

            </View>

            <View style={styles.informacaoItemLargo}>

              <Text style={styles.informacaoLabel}>
                PLATAFORMAS
              </Text>

              <Text style={styles.informacaoValor}>
                {textoPlataformas(jogoSelecionado)}
              </Text>

            </View>

            <View style={styles.informacaoItemLargo}>

              <Text style={styles.informacaoLabel}>
                DESENVOLVEDORA
              </Text>

              <Text style={styles.informacaoValor}>
                {textoNomes(jogoSelecionado.developers)}
              </Text>

            </View>

            <View style={styles.informacaoItemLargo}>

              <Text style={styles.informacaoLabel}>
                PUBLICADORA
              </Text>

              <Text style={styles.informacaoValor}>
                {textoNomes(jogoSelecionado.publishers)}
              </Text>

            </View>

          </View>


          {/* AVALIAÇÃO PESSOAL DO USUÁRIO */}

          <View style={styles.avaliarBloco}>

            <Text style={styles.tituloBlocoDetalhe}>
              Sua avaliação
            </Text>

            <Text style={styles.avaliarSubtitulo}>
              Sua opinião fica salva somente neste aparelho.
            </Text>

            {jaAvaliou && (

              <View style={styles.avaliacaoSalva}>

                <Text style={styles.avaliacaoSalvaTitulo}>
                  AVALIAÇÃO REGISTRADA
                </Text>

                <Text style={styles.avaliacaoSalvaTexto}>
                  Nota salva: {'★'.repeat(notaUsuario)}
                  {'☆'.repeat(5 - notaUsuario)}
                </Text>

                {comentarioUsuario ? (

                  <Text style={styles.avaliacaoSalvaTexto}>
                    “{comentarioUsuario}”
                  </Text>

                ) : null}

              </View>

            )}

            <View style={styles.estrelasEscolha}>

              {[1, 2, 3, 4, 5].map((estrela) => (

                <TouchableOpacity
                  key={estrela}
                  onPress={() => setNotaUsuario(estrela)}
                >

                  <Text
                    style={[
                      styles.estrelaEscolha,
                      estrela <= notaUsuario &&
                        styles.estrelaEscolhida,
                    ]}
                  >

                    {estrela <= notaUsuario ? '★' : '☆'}

                  </Text>

                </TouchableOpacity>

              ))}

            </View>

            <Text style={styles.ajudaEstrelas}>
              {notaUsuario
                ? `${notaUsuario} de 5 estrelas`
                : 'Selecione sua nota'}
            </Text>

            <TextInput
              style={styles.comentarioInput}
              placeholder="Escreva um comentário (opcional)..."
              placeholderTextColor="#777D92"
              multiline
              textAlignVertical="top"
              value={comentarioUsuario}
              onChangeText={setComentarioUsuario}
              maxLength={500}
            />

            {erroAvaliacao !== '' && (

              <Text style={styles.erroAvaliacao}>
                {erroAvaliacao}
              </Text>

            )}

            <TouchableOpacity
              style={[
                styles.botaoSalvarAvaliacao,
                salvandoAvaliacao && styles.botaoDesabilitado,
              ]}
              onPress={registrarAvaliacao}
              disabled={salvandoAvaliacao}
            >

              {salvandoAvaliacao ? (

                <ActivityIndicator color="#FFFFFF" />

              ) : (

                <Text style={styles.botaoSalvarTexto}>
                  {jaAvaliou
                    ? 'Atualizar minha avaliação'
                    : 'Salvar minha avaliação'}
                </Text>

              )}

            </TouchableOpacity>

            {jaAvaliou && (

              <TouchableOpacity
                style={styles.linkRemoverAvaliacao}
                onPress={() =>
                  excluirAvaliacao(jogoSelecionado.id)
                }
              >

                <Text style={styles.linkRemoverTexto}>
                  Remover minha avaliação
                </Text>

              </TouchableOpacity>

            )}

          </View>

          {renderAtribuicao()}

        </ScrollView>

      </View>

    );
  }


  // -------------------------------------------------------
  // MENU DE NAVEGAÇÃO
  // -------------------------------------------------------

  function renderNavegacao() {

    const itens = [
      { id: 'inicio', icone: '⌂', nome: 'Início' },
      { id: 'explorar', icone: '⌕', nome: 'Explorar' },
      { id: 'favoritos', icone: '♡', nome: 'Favoritos' },
      { id: 'avaliacoes', icone: '★', nome: 'Avaliações' },
    ];

    return (

      <View style={styles.navegacao}>

        {itens.map((item) => {

          const ativo = pagina === item.id;

          return (

            <TouchableOpacity
              key={item.id}
              style={styles.itemNavegacao}
              onPress={() => setPagina(item.id)}
            >

              <Text
                style={[
                  styles.iconeNavegacao,
                  ativo && styles.iconeNavegacaoAtivo,
                ]}
              >

                {item.icone}

              </Text>

              <Text
                style={[
                  styles.textoNavegacao,
                  ativo && styles.textoNavegacaoAtivo,
                ]}
              >

                {item.nome}

              </Text>

              {ativo && (
                <View style={styles.navegacaoIndicador} />
              )}

            </TouchableOpacity>

          );

        })}

      </View>

    );
  }


  // -------------------------------------------------------
  // ESTRUTURA PRINCIPAL DO APLICATIVO
  // -------------------------------------------------------

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#090B16"
      />

      {jogoSelecionado ? (

        renderDetalhes()

      ) : (

        <>

          <View style={styles.header}>

            <View style={styles.logoLinha}>

              <View style={styles.logoIcone}>

                <Text style={styles.logoIconeTexto}>
                  P
                </Text>

              </View>

              <View>

                <Text style={styles.logoTexto}>
                  PIXEL <Text style={styles.logoDestaque}>HUB</Text>
                </Text>

                <Text style={styles.logoSubtexto}>
                  DISCOVER • PLAY • RATE
                </Text>

              </View>

            </View>

            <View style={styles.statusOnline}>

              <View style={styles.statusPonto} />

              <Text style={styles.statusTexto}>
                GAMER SPACE
              </Text>

            </View>

          </View>

          {pagina === 'inicio' && renderInicio()}

          {pagina === 'explorar' && renderExplorar()}

          {pagina === 'favoritos' && renderFavoritos()}

          {pagina === 'avaliacoes' && renderAvaliacoes()}

          {renderNavegacao()}

        </>

      )}

    </SafeAreaView>

  );
}

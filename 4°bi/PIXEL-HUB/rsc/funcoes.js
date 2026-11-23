import AsyncStorage from '@react-native-async-storage/async-storage';


// ---------------------------------------------------------
// CONFIGURAÇÃO DO ARMAZENAMENTO LOCAL
// ---------------------------------------------------------

const CHAVE_FAVORITOS = '@pixel_hub:favoritos';

const CHAVE_AVALIACOES = '@pixel_hub:avaliacoes';


// ---------------------------------------------------------
// FUNÇÃO AUXILIAR PARA CARREGAR DADOS
// ---------------------------------------------------------

async function carregarDados(chave) {
  try {
    const texto = await AsyncStorage.getItem(chave);

    if (!texto) {
      return [];
    }

    const dados = JSON.parse(texto);

    if (!Array.isArray(dados)) {
      throw new Error('Formato de armazenamento inválido.');
    }

    return dados;

  } catch (erro) {
    throw new Error(
      erro.message ||
      'Não foi possível carregar os dados salvos.'
    );
  }
}


// ---------------------------------------------------------
// FUNÇÃO AUXILIAR PARA SALVAR DADOS
// ---------------------------------------------------------

async function guardarDados(chave, dados) {
  try {
    await AsyncStorage.setItem(
      chave,
      JSON.stringify(dados)
    );

    return dados;

  } catch (erro) {
    throw new Error(
      'Não foi possível salvar os dados no aparelho.'
    );
  }
}


// ---------------------------------------------------------
// FAVORITOS
// ---------------------------------------------------------


// Consulta todos os jogos favoritados.

export async function consultarFavoritos() {
  return carregarDados(CHAVE_FAVORITOS);
}


// Salva um jogo nos favoritos.

export async function salvarFavorito(jogo) {
  if (!jogo || jogo.id === undefined || jogo.id === null) {
    throw new Error(
      'Não foi possível identificar o jogo.'
    );
  }

  const favoritos = await consultarFavoritos();

  const jaExiste = favoritos.some(
    (item) => String(item.id) === String(jogo.id)
  );

  if (jaExiste) {
    return favoritos;
  }

  const atualizados = [jogo, ...favoritos];

  return guardarDados(
    CHAVE_FAVORITOS,
    atualizados
  );
}


// Remove um jogo dos favoritos.

export async function removerFavorito(idJogo) {
  if (idJogo === undefined || idJogo === null) {
    throw new Error(
      'Identificador do jogo inválido.'
    );
  }

  const favoritos = await consultarFavoritos();

  const atualizados = favoritos.filter(
    (item) => String(item.id) !== String(idJogo)
  );

  return guardarDados(
    CHAVE_FAVORITOS,
    atualizados
  );
}


// ---------------------------------------------------------
// AVALIAÇÕES
// ---------------------------------------------------------


// Consulta todas as avaliações registradas.

export async function consultarAvaliacoes() {
  return carregarDados(CHAVE_AVALIACOES);
}


// Consulta a avaliação de um jogo específico.

export async function consultarAvaliacao(idJogo) {
  if (idJogo === undefined || idJogo === null) {
    return null;
  }

  const avaliacoes = await consultarAvaliacoes();

  return (
    avaliacoes.find(
      (item) => String(item.gameId) === String(idJogo)
    ) || null
  );
}


// ---------------------------------------------------------
// VALIDAÇÃO DAS AVALIAÇÕES
// ---------------------------------------------------------

function validarAvaliacao(avaliacao) {
  if (
    !avaliacao ||
    avaliacao.gameId === undefined ||
    avaliacao.gameId === null
  ) {
    throw new Error(
      'Não foi possível identificar o jogo da avaliação.'
    );
  }

  if (
    !Number.isInteger(avaliacao.rating) ||
    avaliacao.rating < 1 ||
    avaliacao.rating > 5
  ) {
    throw new Error(
      'A avaliação deve possuir uma nota entre 1 e 5 estrelas.'
    );
  }

  if (
    typeof avaliacao.comment !== 'undefined' &&
    typeof avaliacao.comment !== 'string'
  ) {
    throw new Error(
      'O comentário precisa ser um texto válido.'
    );
  }
}


// ---------------------------------------------------------
// SALVAR UMA NOVA AVALIAÇÃO
// ---------------------------------------------------------

export async function salvarAvaliacao(avaliacao) {
  validarAvaliacao(avaliacao);

  const avaliacoes = await consultarAvaliacoes();

  const jaExiste = avaliacoes.some(
    (item) =>
      String(item.gameId) === String(avaliacao.gameId)
  );

  if (jaExiste) {
    throw new Error(
      'Este jogo já possui uma avaliação. Utilize a opção de editar.'
    );
  }

  const novaAvaliacao = {
    ...avaliacao,

    comment: String(
      avaliacao.comment || ''
    ).trim(),

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  const atualizadas = [
    novaAvaliacao,
    ...avaliacoes,
  ];

  return guardarDados(
    CHAVE_AVALIACOES,
    atualizadas
  );
}


// ---------------------------------------------------------
// EDITAR UMA AVALIAÇÃO EXISTENTE
// ---------------------------------------------------------

export async function editarAvaliacao(avaliacao) {
  validarAvaliacao(avaliacao);

  const avaliacoes = await consultarAvaliacoes();

  const indice = avaliacoes.findIndex(
    (item) =>
      String(item.gameId) === String(avaliacao.gameId)
  );

  if (indice === -1) {
    throw new Error(
      'Não existe uma avaliação anterior para editar.'
    );
  }

  const avaliacaoAnterior = avaliacoes[indice];

  const avaliacaoAtualizada = {
    ...avaliacaoAnterior,
    ...avaliacao,

    comment: String(
      avaliacao.comment || ''
    ).trim(),

    updatedAt: new Date().toISOString(),
  };

  const atualizadas = [...avaliacoes];

  atualizadas[indice] = avaliacaoAtualizada;

  return guardarDados(
    CHAVE_AVALIACOES,
    atualizadas
  );
}


// ---------------------------------------------------------
// REMOVER UMA AVALIAÇÃO
// ---------------------------------------------------------

export async function removerAvaliacao(idJogo) {
  if (idJogo === undefined || idJogo === null) {
    throw new Error(
      'Identificador da avaliação inválido.'
    );
  }

  const avaliacoes = await consultarAvaliacoes();

  const atualizadas = avaliacoes.filter(
    (item) =>
      String(item.gameId) !== String(idJogo)
  );

  return guardarDados(
    CHAVE_AVALIACOES,
    atualizadas
  );
}
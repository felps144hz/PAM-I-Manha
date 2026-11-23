// ---------------------------------------------------------
// CONFIGURAÇÃO DA API RAWG
// ---------------------------------------------------------

export const URL_BASE = 'https://api.rawg.io/api';

export const URL_DOCUMENTACAO = 'https://rawg.io/apidocs';

// Mantenha sua chave RAWG atual nesta linha.
export const CHAVE_RAWG = 'cd14595b294047f79db5a8d4830e7441';


// ---------------------------------------------------------
// CONFIGURAÇÕES DE CACHE
// ---------------------------------------------------------

const TEMPO_CACHE = 5 * 60 * 1000;

const cache = new Map();

const requisicoesEmAndamento = new Map();


// ---------------------------------------------------------
// VERIFICAÇÃO DA API
// ---------------------------------------------------------

export function apiConfigurada() {
  return Boolean(
    CHAVE_RAWG &&
    CHAVE_RAWG !== 'SUA_CHAVE_RAWG'
  );
}


// ---------------------------------------------------------
// FILTRO DE CONTEÚDO PORNOGRÁFICO
// ---------------------------------------------------------

export function jogoApropriado(jogo) {

  if (!jogo) return false;

  // Termos específicos de conteúdo pornográfico.
  // Não bloqueia jogos somente por serem classificados como Mature.

  const termosBloqueados = [
    /\bhentai\b/i,
    /\bporn(?:ography|ographic)?\b/i,
    /\bnsfw\b/i,
    /\beroge\b/i,
    /\badult[\s_-]+game\b/i,
    /\badults?[\s_-]+only\b/i,
    /\bsex[\s_-]+game\b/i,
    /\bsex[\s_-]+simulator\b/i,
    /\bporn[\s_-]+game\b/i,
    /\bporn[\s_-]+simulation\b/i,
    /\bexplicit[\s_-]+sexual\b/i,
  ];

  // Informações que serão verificadas.
  const textos = [
    jogo.name,
    jogo.slug,

    ...(jogo.tags || []).flatMap((tag) => [
      tag.name,
      tag.slug,
    ]),
  ];

  // Junta e normaliza os textos.
  const conteudo = textos
    .filter(Boolean)
    .join(' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  // Verifica se algum termo proibido está presente.
  const possuiConteudoBloqueado =
    termosBloqueados.some((termo) =>
      termo.test(conteudo)
    );

  return !possuiConteudoBloqueado;
}


// ---------------------------------------------------------
// MONTAGEM DAS URLS
// ---------------------------------------------------------

function montarUrl(endpoint, parametros = {}) {

  if (!apiConfigurada()) {
    throw new Error(
      'Configure sua chave RAWG no arquivo api.js.'
    );
  }

  const valores = {
    ...parametros,
    key: CHAVE_RAWG,
  };

  const consulta = Object.keys(valores)
    .filter(
      (chave) =>
        valores[chave] !== undefined &&
        valores[chave] !== null &&
        valores[chave] !== ''
    )
    .map(
      (chave) =>
        `${encodeURIComponent(chave)}=${encodeURIComponent(
          String(valores[chave])
        )}`
    )
    .join('&');

  return `${URL_BASE}/${endpoint}?${consulta}`;
}


// ---------------------------------------------------------
// REQUISIÇÕES HTTP
// ---------------------------------------------------------

async function requisitar(endpoint, parametros = {}) {

  const url = montarUrl(endpoint, parametros);

  const agora = Date.now();

  // Verifica se existe uma resposta no cache.
  const itemCache = cache.get(url);

  if (
    itemCache &&
    agora - itemCache.dataHora < TEMPO_CACHE
  ) {
    return itemCache.dados;
  }

  // Evita requisições duplicadas.
  if (requisicoesEmAndamento.has(url)) {
    return requisicoesEmAndamento.get(url);
  }

  const promessa = (async () => {

    try {

      const resposta = await fetch(url);

      let dados;

      try {
        dados = await resposta.json();
      } catch (erroJson) {
        throw new Error(
          'A API retornou uma resposta inválida.'
        );
      }

      if (!resposta.ok) {

        if (
          resposta.status === 401 ||
          resposta.status === 403
        ) {
          throw new Error(
            'Chave RAWG inválida ou sem permissão.'
          );
        }

        if (resposta.status === 429) {
          throw new Error(
            'Limite de consultas atingido. Aguarde um pouco.'
          );
        }

        throw new Error(
          dados?.detail ||
          `Erro na API RAWG: ${resposta.status}.`
        );
      }

      if (
        !dados ||
        typeof dados !== 'object' ||
        Array.isArray(dados)
      ) {
        throw new Error(
          'Resposta inválida recebida da API.'
        );
      }

      // Salva a resposta no cache.
      cache.set(url, {
        dados,
        dataHora: Date.now(),
      });

      return dados;

    } catch (erro) {

      if (erro instanceof TypeError) {
        throw new Error(
          'Erro de conexão. Verifique sua internet.'
        );
      }

      throw new Error(
        erro.message || 'Erro ao consultar a API.'
      );

    } finally {

      requisicoesEmAndamento.delete(url);

    }

  })();

  requisicoesEmAndamento.set(url, promessa);

  return promessa;
}


// ---------------------------------------------------------
// PESQUISA DE JOGOS
// ---------------------------------------------------------

export async function buscarJogos(termo = '', filtros = {}) {

  const pesquisa = String(termo || '').trim();

  if (
    !pesquisa &&
    !filtros.genres &&
    !filtros.platforms
  ) {
    throw new Error(
      'Digite um jogo ou selecione um filtro.'
    );
  }

  const parametros = {
    ...filtros,
    page_size: 40,
  };

  if (pesquisa) {
    parametros.search = pesquisa;
  }

  try {

    const dados = await requisitar(
      'games',
      parametros
    );

    if (!Array.isArray(dados.results)) {
      throw new Error(
        'Lista de jogos inválida.'
      );
    }

    // Remove apenas jogos identificados como pornográficos.
    return dados.results.filter(jogoApropriado);

  } catch (erro) {

    throw new Error(
      erro.message || 'Não foi possível pesquisar os jogos.'
    );

  }
}


// ---------------------------------------------------------
// LISTAGEM DE JOGOS
// ---------------------------------------------------------

export async function listarJogos(opcoes = {}) {

  const quantidade = opcoes.page_size || 12;

  const filtros = { ...opcoes };

  delete filtros.page_size;

  const parametros = {
    ...filtros,
    page_size: Math.min(40, quantidade * 3),
  };

  try {

    const dados = await requisitar(
      'games',
      parametros
    );

    if (!Array.isArray(dados.results)) {
      throw new Error(
        'Lista de jogos inválida.'
      );
    }

    return dados.results
      .filter(jogoApropriado)
      .slice(0, quantidade);

  } catch (erro) {

    throw new Error(
      erro.message || 'Não foi possível carregar os jogos.'
    );

  }
}


// ---------------------------------------------------------
// DETALHES DO JOGO
// ---------------------------------------------------------

export async function consultarJogo(id) {

  if (
    id === undefined ||
    id === null ||
    String(id).trim() === ''
  ) {
    throw new Error(
      'Identificador inválido.'
    );
  }

  try {

    const dados = await requisitar(
      `games/${encodeURIComponent(String(id))}`
    );

    if (!dados || !dados.id) {
      throw new Error('Jogo não encontrado.');
    }

    if (!jogoApropriado(dados)) {
      throw new Error(
        'Este jogo foi bloqueado pelo filtro de conteúdo.'
      );
    }

    return dados;

  } catch (erro) {

    throw new Error(
      erro.message || 'Erro ao consultar os detalhes.'
    );

  }
}


// ---------------------------------------------------------
// CONSULTA DE GÊNEROS
// ---------------------------------------------------------

export async function buscarGeneros() {

  try {

    const dados = await requisitar('genres', {
      page_size: 40,
    });

    if (!Array.isArray(dados.results)) {
      throw new Error(
        'Lista de gêneros inválida.'
      );
    }

    return dados.results;

  } catch (erro) {

    throw new Error(
      erro.message || 'Erro ao carregar os gêneros.'
    );

  }
}


// ---------------------------------------------------------
// CONSULTA DE PLATAFORMAS
// ---------------------------------------------------------

export async function buscarPlataformas() {

  try {

    const dados = await requisitar('platforms', {
      page_size: 40,
    });

    if (!Array.isArray(dados.results)) {
      throw new Error(
        'Lista de plataformas inválida.'
      );
    }

    return dados.results;

  } catch (erro) {

    throw new Error(
      erro.message || 'Erro ao carregar as plataformas.'
    );

  }
}


 
// ---------------------------------------------------------
// TRADUÇÃO DAS DESCRIÇÕES PARA PORTUGUÊS
// ---------------------------------------------------------

const URL_TRADUCAO =
  'https://api.mymemory.translated.net/get';

const cacheTraducao = new Map();


// Traduz a descrição de inglês para português brasileiro.

export async function traduzirDescricao(descricao) {

  if (!descricao || !descricao.trim()) {
    return '';
  }

  const texto = String(descricao).trim();

  // Verifica se já existe uma tradução armazenada.

  if (cacheTraducao.has(texto)) {
    return cacheTraducao.get(texto);
  }

  try {

    const partes = texto.match(/[\s\S]{1,450}/g) || [];

    const traducoes = [];

    // Traduz cada parte do texto.

    for (const parte of partes) {

      const url =
        `${URL_TRADUCAO}?q=${encodeURIComponent(parte)}` +
        `&langpair=en%7Cpt-BR`;

      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error('Erro ao acessar o serviço de tradução.');
      }

      const dados = await resposta.json();

      if (
        dados.responseStatus !== 200 ||
        !dados.responseData?.translatedText
      ) {
        throw new Error('Não foi possível traduzir a descrição.');
      }

      traducoes.push(dados.responseData.translatedText);
    }

    const resultado = traducoes.join(' ');

    // Armazena a tradução para evitar consultas repetidas.

    cacheTraducao.set(texto, resultado);

    return resultado;

  } catch (erro) {

    throw new Error(
      erro.message || 'Erro ao traduzir a descrição.'
    );

  }
}


// ---------------------------------------------------------
// LIMPEZA DO CACHE
// ---------------------------------------------------------

export function limparCache() {
  cache.clear();
}
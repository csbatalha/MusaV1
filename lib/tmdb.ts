const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB(endpoint: string, params: string = '') {
  if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY não está definida nas variáveis de ambiente.");
    return null;
  }

  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}&language=pt-BR${params}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`Erro na API do TMDB: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar dados do TMDB:", error);
    return null;
  }
}

export async function getPopularMovies() {
  const data = await fetchFromTMDB('/movie/popular');
  return data?.results || [];
}

export async function searchMedia(query: string) {
  if (!query) return [];
  const data = await fetchFromTMDB('/search/multi', `&query=${encodeURIComponent(query)}`);
  // Filtra apenas filmes e séries para evitar resultados de pessoas (atores/diretores) vazios
  return data?.results?.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv') || [];
}

// Função inteligente que aceita o tipo (movie ou tv) para buscar detalhes corretos
export async function getMediaDetails(id: string, mediaType: string = 'movie') {
  // Se o tipo não vier explícito, tenta adivinhar ou usa 'movie' por padrão
  const type = mediaType === 'tv' ? 'tv' : 'movie';
  const data = await fetchFromTMDB(`/${type}/${id}`);
  if (data) {
    data.media_type = type; // Garante que o tipo acompanha o objeto
  }
  return data;
}
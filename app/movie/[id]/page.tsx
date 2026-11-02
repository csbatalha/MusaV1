import { getMediaDetails } from "@/lib/tmdb";
import Navbar from "@/components/navbar";
import Link from "next/link";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function MediaDetailPage({ params, searchParams }: MoviePageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  
  const id = resolvedParams.id;
  const mediaType = resolvedSearch.type || 'movie'; // 'movie' ou 'tv'
  
  // Busca os detalhes completos usando a função inteligente
  const media = await getMediaDetails(id, mediaType);

  if (!media) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6">
        <p className="text-zinc-400 mb-4">Título não encontrado ou erro ao carregar dados.</p>
        <Link href="/" className="text-purple-400 hover:underline text-sm font-sans">
          Voltar para o início
        </Link>
      </main>
    );
  }

  const title = media.title || media.name;
  const releaseDate = media.release_date || media.first_air_date;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6 pb-32 relative">
      {/* Botão de Voltar */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link 
          href="/" 
          className="text-xs font-sans text-zinc-400 hover:text-zinc-100 transition-colors inline-flex items-center gap-1.5"
        >
          ← Voltar para o início
        </Link>
      </div>

      {/* Conteúdo Detalhado */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Pôster */}
        <div className="w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
          {media.poster_path ? (
            <img 
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`} 
              alt={title} 
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center text-zinc-500 text-xs">
              Sem Pôster
            </div>
          )}
        </div>

        {/* Informações e Sinopse */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide">
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-sans">
            <span>{releaseDate ? releaseDate.split('-')[0] : 'Data indisponível'}</span>
            <span>•</span>
            {mediaType === 'tv' ? (
              <span>{media.number_of_seasons ? `${media.number_of_seasons} Temporada(s)` : 'Temporadas N/A'}</span>
            ) : (
              <span>{media.runtime ? `${media.runtime} min` : 'Duração indisponível'}</span>
            )}
            <span>•</span>
            <span className="text-amber-400 font-medium">★ {media.vote_average ? media.vote_average.toFixed(1) : 'N/A'}</span>
            <span className="bg-purple-950 border border-purple-800/60 text-purple-300 px-2 py-0.5 rounded uppercase text-[10px] font-semibold">
              {mediaType === 'tv' ? 'Série' : 'Filme'}
            </span>
          </div>

          {/* Géneros */}
          <div className="flex flex-wrap gap-2 pt-1">
            {media.genres?.map((genre: any) => (
              <span 
                key={genre.id} 
                className="text-[10px] uppercase tracking-wider bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-300"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 space-y-2">
            <h2 className="font-sans text-sm font-semibold text-zinc-300 uppercase tracking-wider">Sinopse</h2>
            <p className="font-sans text-zinc-400 leading-relaxed text-sm sm:text-base">
              {media.overview || "Nenhuma sinopse disponível em português para este título."}
            </p>
          </div>
        </div>
      </div>

      {/* Barra de Navegação Flutuante */}
      <Navbar />
    </main>
  );
}
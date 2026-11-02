import Navbar from "@/components/navbar";
import { getPopularMovies, searchMedia } from "@/lib/tmdb";
import Link from "next/link";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  // Se houver termo de pesquisa, usa searchMedia; senão, carrega os populares
  const items = query ? await searchMedia(query) : await getPopularMovies();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 relative pb-32 bg-zinc-950 text-zinc-100">
      {/* Cabeçalho */}
      <div className="text-center space-y-4 my-8 w-full max-w-xl">
        <h1 className="font-serif text-6xl font-semibold tracking-wide flex items-center justify-center gap-2">
          Musa
          <span 
            style={{
              background: 'linear-gradient(to right, #8B5CF6, #F43F5E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ✦
          </span>
        </h1>
        <p className="font-sans text-zinc-400 text-lg">
          O que vamos assistir hoje?
        </p>

        {/* Barra de Pesquisa Integrada */}
        <form 
          method="GET" 
          action="/" 
          className="w-full flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2.5 focus-within:border-purple-500 transition-colors shadow-lg"
        >
          <svg className="w-5 h-5 text-zinc-500 mr-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            name="q" 
            defaultValue={query}
            placeholder="Pesquisar filmes ou séries..." 
            className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none font-sans"
          />
          {query && (
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 ml-2 whitespace-nowrap">
              Limpar
            </Link>
          )}
        </form>
      </div>

      {/* Secção de Resultados / Filmes Populares */}
      <div className="w-full max-w-5xl mb-12 mt-4">
        <div className="flex items-center justify-between mb-6 border-b border-zinc-800/80 pb-3">
          <h2 className="font-sans text-xl font-medium text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F43F5E]"></span>
            {query ? `Resultados para "${query}"` : "Em Alta no Cinema"}
          </h2>
          {query && (
            <Link href="/" className="text-xs text-purple-400 hover:underline">
              Ver populares
            </Link>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-12 text-center space-y-3">
            <p className="text-zinc-400 text-sm">
              {query ? `Nenhum título encontrado para "${query}".` : "Nenhum título disponível no momento."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {items.map((item: any) => {
              // Identifica se é série ou filme ( '/search/multi' retorna media_type )
              const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie');
              const title = item.title || item.name;
              const releaseDate = item.release_date || item.first_air_date;

              return (
                <Link 
                  key={item.id} 
                  href={`/movie/${item.id}?type=${mediaType}`}
                  className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden p-2.5 flex flex-col hover:border-zinc-700 hover:scale-[1.02] transition-all group block"
                >
                  {item.poster_path ? (
                    <div className="relative w-full h-64 rounded-xl overflow-hidden mb-3 bg-zinc-800">
                      <img 
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                        alt={title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 mb-3 text-xs">
                      Sem Pôster
                    </div>
                  )}
                  <h3 className="font-sans text-sm font-medium text-zinc-200 truncate px-1">
                    {title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-zinc-500 px-1 mt-0.5">
                    <span>{releaseDate ? releaseDate.split('-')[0] : 'N/A'}</span>
                    <span className="uppercase text-[9px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
                      {mediaType === 'tv' ? 'Série' : 'Filme'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Barra de Navegação Flutuante */}
      <Navbar />
    </main>
  );
}
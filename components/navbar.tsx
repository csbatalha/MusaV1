import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl z-50">
      {/* Início */}
      <Link href="/" className="flex flex-col items-center text-zinc-400 hover:text-zinc-100 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[10px] mt-1 font-sans">Início</span>
      </Link>

      {/* Diário */}
      <Link href="/diario" className="flex flex-col items-center text-zinc-400 hover:text-zinc-100 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span className="text-[10px] mt-1 font-sans">Diário</span>
      </Link>

      {/* Botão Central IA - Alinhado na mesma linha dos demais */}
      <Link 
        href="/ai" 
        className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F43F5E] text-white shadow-md shadow-purple-500/20 flex items-center justify-center hover:scale-105 transition-transform"
      >
        <span className="text-xl leading-none block">✦</span>
      </Link>

      {/* Listas */}
      <Link href="/listas" className="flex flex-col items-center text-zinc-400 hover:text-zinc-100 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span className="text-[10px] mt-1 font-sans">Listas</span>
      </Link>

      {/* Perfil */}
      <Link href="/perfil" className="flex flex-col items-center text-zinc-400 hover:text-zinc-100 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-[10px] mt-1 font-sans">Perfil</span>
      </Link>
    </nav>
  );
}
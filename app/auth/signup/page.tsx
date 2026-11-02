'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Por favor, preencha o e-mail e a palavra-passe.');
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password 
      });
      
      if (signUpError) {
        throw signUpError;
      }

      alert('Conta criada com sucesso! Faça login agora.');
      router.push('/auth/login');
    } catch (err) {
      const capturedError = err as Error;
      setError(capturedError.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/` },
      });
      
      if (googleError) {
        throw googleError;
      }
    } catch (err) {
      const capturedError = err as Error;
      setError(capturedError.message || 'Erro ao conectar com o Google.');
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 relative">
      <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center space-y-2 mb-8">
          <h1 className="font-serif text-4xl font-bold tracking-wide flex items-center justify-center gap-2">
            Musa
            <span style={{ background: 'linear-gradient(to right, #8B5CF6, #F43F5E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span>
          </h1>
          <p className="font-sans text-zinc-400 text-sm">Crie a sua conta para registar filmes</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-800/60 text-red-300 text-xs p-3 rounded-xl mb-6 text-center font-sans">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mb-6 flex items-center justify-center gap-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-medium py-3 rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.3 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.9 6.4C.7 8.8 0 10.3 0 12s.7 3.2 1.9 5.6l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.3L1.9 15.9C3.7 19.7 7.5 23 12 23z"/>
          </svg>
          Continuar com o Google
        </button>

        <div className="flex items-center my-6 text-zinc-700">
          <div className="flex-1 border-t border-zinc-800"></div>
          <span className="px-3 text-xs uppercase tracking-wider text-zinc-500 font-sans">ou com e-mail</span>
          <div className="flex-1 border-t border-zinc-800"></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 font-sans">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Palavra-passe</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-rose-600 text-zinc-100 font-medium py-3 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-purple-900/25 cursor-pointer"
          >
            {loading ? 'A processar...' : 'Criar Conta'}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-zinc-400 font-sans">
          Já possui uma conta?{' '}
          <Link href="/auth/login" className="text-purple-400 hover:underline font-medium ml-1">
            Fazer login
          </Link>
        </div>
      </div>
    </main>
  );
}
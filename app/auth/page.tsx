'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Fluxo de Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        // Fluxo de Cadastro
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Conta criada com sucesso! Verifique o seu e-mail se necessário ou faça login.');
      }

      // Redireciona para a home após o sucesso
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 relative">
      {/* Botão para voltar à home */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors font-sans">
          ← Voltar para o início
        </Link>
      </div>

      <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
        {/* Cabeçalho */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="font-serif text-4xl font-bold tracking-wide flex items-center justify-center gap-2">
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
          <p className="font-sans text-zinc-400 text-sm">
            {isLogin ? 'Entre na sua conta para continuar' : 'Crie a sua conta para registar filmes'}
          </p>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="bg-red-950/50 border border-red-800/60 text-red-300 text-xs p-3 rounded-xl mb-6 text-center font-sans">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleAuth} className="space-y-4 font-sans">
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
            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-rose-600 text-zinc-100 font-medium py-3 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-purple-900/20"
          >
            {loading ? 'A processar...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>
        </form>

        {/* Alternador entre Login e Registo */}
        <div className="text-center mt-6 text-xs text-zinc-400 font-sans">
          {isLogin ? 'Ainda não tem conta?' : 'Já possui uma conta?'}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:underline font-medium ml-1"
          >
            {isLogin ? 'Criar agora' : 'Fazer login'}
          </button>
        </div>
      </div>
    </main>
  );
}
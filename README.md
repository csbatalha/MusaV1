<div align="center">

# Musa ✦
O seu diário e comunidade cinematográfica de filmes e séries.

</div>

---

## 📌 Sobre o Projeto
O **Musa** é uma plataforma SaaS moderna desenvolvida para entusiastas de cinema e televisão. A aplicação combina a exploração rica de títulos globais (via TMDB API) com recursos interativos de diário pessoal, avaliações, resenhas e listas personalizadas, caminhando rumo a uma experiência de rede social para cinéfilos.

---

## 🚀 Tecnologias Utilizadas (Tech Stack)
* **Framework:** Next.js (App Router)
* **Linguagem:** TypeScript & JavaScript
* **Estilização:** Tailwind CSS
* **Autenticação & Banco de Dados:** Supabase Auth & PostgreSQL
* **API de Conteúdo:** TMDB (The Movie Database) API

---

## ✨ Funcionalidades do MVP (Versão 1)
1. **Busca Global Integrada:** Barra de pesquisa em tempo real na página inicial para encontrar filmes e séries simultaneamente.
2. **Explorador de Populares:** Listagem dinâmica dos títulos em alta no cinema e na televisão.
3. **Página de Detalhes Dinâmica:** Sinopse completa, géneros, duração/temporadas, nota média e cartazes em alta resolução.
4. **Sistema de Autenticação:** Fluxo seguro de login e registo (com suporte a e-mail/palavra-passe e integração com o Google OAuth via Supabase).
5. **Diário & Listas (Em desenvolvimento):** Registo de visualizações, notas de 0 a 10, críticas pessoais e criação de listas personalizadas estilo playlist.

---

## 📂 Estrutura do Projeto
```text
musa/
├── app/                  # Rotas e páginas do Next.js (App Router)
│   ├── auth/             # Página de autenticação (Login / Registo)
│   ├── movie/[id]/       # Página dinâmica de detalhes de filmes e séries
│   ├── page.tsx          # Página inicial com busca e destaques
│   └── layout.tsx        # Layout global da aplicação
├── components/           # Componentes reutilizáveis (ex: Navbar)
├── lib/                  # Serviços centralizados (Supabase e TMDB API)
├── public/               # Ativos estáticos e imagens
└── .env.local            # Variáveis de ambiente locais (não versionadas)
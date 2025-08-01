# EVENTRIX

## 1. Visão Geral

Eventrix é uma plataforma de gestão de eventos corporativos escrita em React e TypeScript. O projeto faz uso do Vite para o bundling, Tailwind CSS para estilos e Supabase para autenticação e banco de dados. Seus principais recursos incluem:

- Cadastro e gerenciamento de eventos
- Processos de onboarding de empresas (tenants)
- Dashboard com relatórios e análises
- Integrações com serviços externos por meio de APIs

O público‑alvo são desenvolvedores que desejam executar ou contribuir com a plataforma e usuários empresariais que irão operar o sistema.

## 2. Instruções de instalação

### Pré‑requisitos

- Node.js 18 ou superior
- npm 9 ou superior

### Passos básicos

```bash
# Clone o repositório
git clone <URL_DO_REPO>
cd app-eventrix

# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente
cp .env.development .env

# Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo ficará acessível em `http://localhost:5173` por padrão.

## 3. Opções de configuração

A configuração principal é feita por variáveis de ambiente. Os valores padrão estão em `.env.development` e `.env.production`.

- `VITE_SUPABASE_URL` – URL da instância Supabase
- `VITE_SUPABASE_ANON_KEY` – Chave anônima para acesso público

Edite o arquivo `.env` conforme seu ambiente. Além disso, é possível ajustar configurações do Vite em `vite.config.ts` e do Tailwind em `tailwind.config.ts`.

## 4. Referência da API

O projeto expõe algumas funções utilitárias por meio dos serviços em `src/services` e do `AuthContext`.

### Autenticação (`authService.ts`)

```ts
import {
  signUp,
  signIn,
  signOut,
  sendMagicLink,
  resetPassword,
  updatePassword,
} from '@/services/authService'
```

- `signUp(data)` &ndash; Cria um novo usuário no Supabase.
- `signIn(email, password)` &ndash; Efetua login com email e senha.
- `sendMagicLink(email)` &ndash; Envia link mágico para login.
- `resetPassword(email)` &ndash; Dispara fluxo de redefinição de senha.
- `updatePassword(password)` &ndash; Atualiza a senha do usuário autenticado.
- `signOut()` &ndash; Realiza logout.

### Contexto de Autenticação (`AuthContext.tsx`)

O `AuthProvider` disponibiliza informações de sessão, perfil e tenant, além de funções de login e logout. Utilize `useAuth()` para acessar o contexto nos componentes React.

## 5. Exemplos de uso

Login básico:

```ts
import { useAuth } from '@/context/AuthContext'

const LoginForm = () => {
  const { signIn } = useAuth()

  const handleSubmit = async () => {
    await signIn('user@example.com', 'senha123')
  }
}
```

Chamada de API via Supabase:

```ts
import supabase from '@/utils/supabase/client'

const { data, error } = await supabase.from('events').select('*')
```

## 6. Guia de solução de problemas

- **Erro de conexão com o Supabase**: verifique as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
- **Dependências não instaladas**: rode `npm install` e confira se a versão do Node está correta.
- **Porta já em uso**: altere a porta padrão do Vite ajustando o script de `dev` ou a configuração em `vite.config.ts`.

## 7. Perguntas frequentes

- **É possível integrar com outros sistemas?**
  Sim. A plataforma oferece APIs e integrações que podem ser acessadas no menu "Integrações" &gt; "Marketplace".
- **Como criar um novo evento?**
  Acesse "Eventos" &gt; "Novo Evento" ou clique em "+" no dashboard e siga o assistente de criação.
- **Onde encontro relatórios?**
  Em "Analytics & Relatórios" &gt; "Relatórios" você pode exportar dados em PDF, Excel ou CSV.

Para mais dúvidas consulte a página de ajuda dentro do aplicativo.

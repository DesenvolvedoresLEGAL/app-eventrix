# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c1b9b1d7-08e2-410c-b3c8-d7b4307f86d4

Para instruções detalhadas de uso do sistema, consulte o [Guia do Usuário](docs/guia_do_usuario_eventrix.md).

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c1b9b1d7-08e2-410c-b3c8-d7b4307f86d4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
=======
# Eventrix

![build](https://img.shields.io/badge/build-passing-brightgreen)
![license](https://img.shields.io/badge/license-MIT-blue)

Eventrix é uma plataforma B2B para gestão de eventos corporativos. Ela oferece recursos de cadastro de empresas, onboarding guiado, planos flexíveis e painéis administrativos para acompanhamento dos seus eventos.

## Índice
- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Exemplos de Uso](#exemplos-de-uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral
A aplicação utiliza React, TypeScript e Vite, integrando serviços do Supabase para autenticação e banco de dados. Entre os módulos disponíveis estão assistentes de onboarding, registro de empresas (tenants) e dashboards de acompanhamento.

## Instalação
1. Clone o repositório:
   ```bash
   git clone <URL-do-repositório>
   cd app-eventrix
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Para gerar build de produção:
   ```bash
   npm run build
   ```

## Exemplos de Uso
Após iniciar o servidor de desenvolvimento, acesse `http://localhost:5173` no navegador. Você pode reutilizar componentes da plataforma em outras aplicações:

```tsx
import TenantDashboard from "./src/features/tenantDashboard/TenantDashboard";

export default function App() {
  return <TenantDashboard tenantId="empresa123" />;
}
```

## Contribuição
Contribuições são bem-vindas!
1. Realize um fork deste repositório.
2. Crie uma branch com sua funcionalidade: `git checkout -b minha-feature`.
3. Commit suas alterações: `git commit -m "Minha feature"`.
4. Envie um pull request.

## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Documentação

Consulte [docs/EVENTRIX.md](docs/EVENTRIX.md) para uma visão geral completa, instruções de instalação e guia de uso.

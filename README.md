# Eventrix

![build](https://img.shields.io/badge/build-passing-brightgreen)
![license](https://img.shields.io/badge/license-MIT-blue)

Eventrix é uma plataforma B2B para gestão de eventos corporativos. Ela oferece recursos de cadastro de empresas, onboarding guiado, planos flexíveis e painéis administrativos para acompanhamento dos seus eventos.

## Índice
- [Eventrix](#eventrix)
  - [Índice](#índice)
  - [Visão Geral](#visão-geral)
  - [Instalação](#instalação)
  - [Exemplos de Uso](#exemplos-de-uso)
  - [Contribuição](#contribuição)
  - [Licença](#licença)
  - [Documentação](#documentação)

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

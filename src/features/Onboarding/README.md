# Onboarding de Usuários e Tenants

Este diretório contém a implementação do fluxo de cadastro inicial (onboarding) da plataforma. O objetivo é registrar um novo usuário administrador e os dados da empresa (tenant), guiando o visitante em etapas consecutivas.

## Visão Geral

```
src/features/Onboarding/
├─ context/
│  └─ OnboardingContext.tsx  # Provider e hook `useOnboarding`
├─ hooks/
│  ├─ useBrazilianStates.ts  # Busca de estados brasileiros via Supabase
│  └─ useBusinessSegments.ts # Busca de segmentos de atuação
├─ pages/
│  └─ EnterpriseOnboardWizard.tsx # Página principal do wizard de cadastro
└─ types/
   └─ types.ts               # Tipagens auxiliares
```

- **OnboardingContext** centraliza o estado do formulário e oferece funções para avançar/retroceder etapas e submeter os dados.
- **Hooks** consultam a API do Supabase e fornecem listas para os campos de seleção.
- **EnterpriseOnboardWizard** exibe o passo a passo do cadastro, utilizando o contexto para armazenar as informações digitadas.

## Instruções de Instalação

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Copie os arquivos `.env.development` ou `.env.production` e ajuste as variáveis conforme seu projeto no Supabase. As principais variáveis são:

```bash
VITE_SUPABASE_URL=<url-do-supabase>
VITE_SUPABASE_ANON_KEY=<chave-anon>
```

3. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173` por padrão.

## Opções de Configuração

Alguns comportamentos podem ser customizados editando `OnboardingContext.tsx`:

- **Plano e status padrão:** os ids `defaultPlanId` e `defaultStatusId` são obtidos a partir das tabelas `subscription_plans` e `tenant_statuses`. Altere a lógica caso utilize outros valores.
- **Etapas do wizard:** a função `nextStep` limita o fluxo a quatro passos. Adicione ou remova etapas modificando `currentStep` e o componente `EnterpriseOnboardWizard`.
- **Gerar slug personalizado:** o método `generateSlug` define como o slug da empresa é criado a partir da razão social.

## Referência da API

O contexto disponibiliza os seguintes campos e funções:

```ts
interface OnboardingContextValue {
  currentStep: number
  isSubmitting: boolean
  states: BrazilianState[]
  segments: BusinessSegment[]
  organizerTypes: OrganizerType[]
  plans: SubscriptionPlan[]
  formData: FormData
  nextStep(): void
  prevStep(): void
  updateFormData(field: keyof FormData, value: string): void
  submit(): Promise<void>
}
```

Utilize o hook `useOnboarding()` para acessar esse objeto dentro de componentes filhos do `OnboardingProvider`.

## Exemplos de Uso

Para incorporar o wizard em uma página:

```tsx
import EnterpriseOnboardWizard from '@/features/Onboarding/pages/EnterpriseOnboardWizard'

export default function Cadastro() {
  return <EnterpriseOnboardWizard />
}
```

Caso deseje consumir somente o contexto em outro componente:

```tsx
import { useOnboarding } from '@/features/Onboarding/context/OnboardingContext'

const BotaoAvancar = () => {
  const { nextStep } = useOnboarding()
  return <button onClick={nextStep}>Próximo</button>
}
```

## Guia de Solução de Problemas

- **Erro ao cadastrar:** verifique se as variáveis do Supabase estão corretas e se o usuário já não possui conta cadastrada.
- **Listas vazias (estados ou segmentos):** confirme se as tabelas correspondentes estão populadas e com a coluna `is_active` marcada como `true`.
- **Redirecionamento incorreto:** ajuste a URL utilizada em `signUp` e `sendMagicLink` (arquivo `authService.ts`) para coincidir com o domínio da aplicação.

## Perguntas Frequentes

**Como adiciono novos campos ao formulário?**

Adicione o campo na interface `FormData`, atualize o estado inicial dentro de `OnboardingProvider` e insira o componente correspondente no passo desejado do wizard.

**É possível pular etapas?**

Sim. Modifique a lógica de `nextStep` ou utilize `currentStep` diretamente para exibir apenas as telas necessárias.

**Posso substituir o Supabase por outra API?**

Sim. Basta reescrever as funções de busca e de submissão (`useBrazilianStates`, `useBusinessSegments` e a função `submit`) para consumir sua API preferida.


# Visualizando tokens do Tailwind no Storybook

Esta página explica como utilizar o Storybook para inspecionar as cores e demais tokens definidos em [`tailwind.config.ts`](../../tailwind.config.ts).

## Addons recomendados

Para alternar entre modo claro/escuro e exibir as tabelas de cores do tema, é possível usar os addons [`storybook-addon-themes`](https://github.com/tonai/storybook-addon-themes) e [`storybook-addon-tailwindcss`](https://github.com/garrettleblanc/storybook-addon-tailwindcss).

Adicione-os em `.storybook/main.ts`:

```ts
addons: [
  '@chromatic-com/storybook',
  '@storybook/addon-docs',
  '@storybook/addon-a11y',
  '@storybook/addon-vitest',
  'storybook-addon-themes',
  'storybook-addon-tailwindcss'
]
```

Em seguida configure os temas no `preview.ts`:

```ts
export const parameters = {
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: 'light', color: '#ffffff' },
      { name: 'dark', class: 'dark', color: '#000000' }
    ]
  }
};
```

## Exemplo de página MDX

O snippet abaixo demonstra como importar o arquivo de configuração do Tailwind para gerar uma tabela com as cores disponíveis:

```mdx
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.ts';
import { TailwindColorPalette } from 'storybook-addon-tailwindcss';

const full = resolveConfig(tailwindConfig);
const colors = full.theme.extend.colors;

<TailwindColorPalette colors={colors} />
```

Ao atualizar `tailwind.config.ts`, o Storybook exibirá automaticamente os novos valores. Assim é possível validar visualmente todos os tokens de cor definidos para a aplicação.

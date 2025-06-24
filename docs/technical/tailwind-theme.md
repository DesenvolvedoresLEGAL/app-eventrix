# Temas do Tailwind

Este documento descreve como o projeto define suas cores e estilos principais utilizando `tailwind.config.ts` e variáveis CSS. Essas definições permitem alterar a aparência da aplicação de forma centralizada.

## Estrutura de cores

O arquivo [`tailwind.config.ts`](../../tailwind.config.ts) estende o tema padrão do Tailwind com um conjunto de cores baseadas em variáveis CSS. As cores ficam disponíveis nos utilitários do Tailwind com nomes como `bg-primary` ou `text-secondary`.

```ts
extend: {
  colors: {
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      light: 'hsl(var(--primary-light))',
      dark: 'hsl(var(--primary-dark))',
      foreground: 'hsl(var(--primary-foreground))',
    },
    /* ...demais cores omitidas */
  }
}
```

Cada cor é mapeada para uma variável CSS definida em [`src/index.css`](../../src/index.css). Essas variáveis possuem valores diferentes para os modos claro e escuro. Por exemplo:

```css
:root {
  --primary: 254 79% 58%;
  --primary-foreground: 0 0% 100%;
}
.dark {
  --primary: 254 79% 58%;
  --primary-foreground: 0 0% 100%;
}
```

Alterando os valores das variáveis é possível mudar todo o tema sem modificar o `tailwind.config.ts`.

## Outros ajustes

Além das cores, o tema define valores para `borderRadius`, animações e sombras personalizadas. Esses utilitários também utilizam as variáveis CSS para manter a consistência entre temas.

## Como utilizar

Use as classes do Tailwind normalmente. Por exemplo, `bg-primary` aplicará a cor `--primary` definida no CSS. Caso queira personalizar o tema, edite apenas as variáveis em `src/index.css`.


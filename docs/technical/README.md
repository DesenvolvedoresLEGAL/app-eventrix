# Documentação Técnica do Eventrix

Esta seção reúne informações essenciais para desenvolvedores e demais profissionais técnicos que desejam entender, integrar e manter a plataforma Eventrix.

## Documentação API

O backend utiliza [Supabase](https://supabase.com) como serviço de banco de dados e autenticação. A comunicação é feita pelo cliente oficial `@supabase/supabase-js`.

- Exemplo de função HTTP: `notify-webhook` disponível em `/functions/v1/notify-webhook`. O código desta função pode ser encontrado em [`supabase/functions/notify-webhook/index.ts`](../../supabase/functions/notify-webhook/index.ts).
- Para operações com eventos, use o serviço `EventsService` localizado em [`src/services/eventsService.ts`](../../src/services/eventsService.ts), que encapsula as chamadas ao Supabase.

## Comentários de código e explicações de algoritmos

O projeto é escrito em TypeScript e contém comentários que explicam a lógica de cada método. Exemplo retirado do serviço de eventos:

```ts
/**
 * Service centralizado para operações relacionadas a eventos
 * Implementa filtro multi-tenant manual usando tenant_id
 */
export class EventsService {
  /**
   * Busca eventos por tenant (usuário logado)
   * @param tenantId - ID do tenant (user.id do usuário autenticado)
   * @param filters - Filtros opcionais para busca
   */
  static async getEvents(tenantId: string, filters?: EventFilters): Promise<EventListItem[]> {
    // ...
  }
}
```

## Guia de migração e integração

As migrações do banco estão em [`supabase/migrations`](../../supabase/migrations). Para aplicá-las localmente:

1. Instale a [CLI do Supabase](https://supabase.com/docs/guides/cli).
2. Execute `supabase start` para subir os serviços em contêiner localmente.
3. Rode `supabase db reset` para aplicar as migrações e popular dados de exemplo do arquivo [`supabase/seed.sql`](../../supabase/seed.sql).

A função `notify-webhook` pode ser usada para integrar sistemas externos via HTTP Webhook.

## Guia de implantação e instalação

Para rodar o projeto localmente:

```bash
npm install
npm run dev
```

Para gerar uma build de produção:

```bash
npm run build
npm run preview
```

O arquivo [`tailwind.config.ts`](../../tailwind.config.ts) define os caminhos de fontes do Tailwind e a família padrão utilizada pela aplicação.
Atualmente, a fonte **Inter** é configurada em `fontFamily.sans`, permitindo o uso das classes `font-sans` em todo o projeto.
Mais detalhes sobre as cores e variáveis utilizadas estão em [`tailwind-theme.md`](./tailwind-theme.md).

## Notas da versão (Changelog)

O histórico completo de commits está disponível em [`docs/commits`](../commits). Consulte esses arquivos para acompanhar as mudanças por data.

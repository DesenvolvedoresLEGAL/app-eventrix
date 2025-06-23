
# Documentação Técnica do Eventrix

Esta seção reúne informações essenciais para desenvolvedores e demais profissionais técnicos que desejam entender, integrar e manter a plataforma Eventrix.

## Documentação API

O backend utiliza [Supabase](https://supabase.com) como serviço de banco de dados e autenticação. A comunicação é feita pelo cliente oficial `@supabase/supabase-js`.

- Exemplo de função HTTP: `notify-webhook` disponível em `/functions/v1/notify-webhook`. O código desta função pode ser encontrado em [`supabase/functions/notify-webhook/index.ts`](../../supabase/functions/notify-webhook/index.ts).

### Serviços de Dados

#### EventsService
Para operações com eventos, use o serviço `EventsService` localizado em [`src/services/eventsService.ts`](../../src/services/eventsService.ts), que encapsula as chamadas ao Supabase.

Exemplo de uso:
```ts
import { EventsService } from '@/services/eventsService';

// Buscar eventos do usuário
const events = await EventsService.getEvents(userId);

// Criar novo evento
const newEvent = await EventsService.createEvent(eventData, userId);
```

#### StaffService
Para operações com equipe de eventos, use o serviço `StaffService` localizado em [`src/services/staffService.ts`](../../src/services/staffService.ts).

Características:
- Staff sempre vinculado a um evento específico (`event_id`)
- Filtro automático por tenant através do relacionamento com eventos
- Validação de acesso via `tenant_id` do evento

Exemplo de uso:
```ts
import { StaffService } from '@/services/staffService';

// Buscar staff de um evento
const staff = await StaffService.getStaff(eventId, tenantId);

// Adicionar membro à equipe
const newMember = await StaffService.createStaff({
  name: 'João Silva',
  email: 'joao@example.com',
  role: 'Coordenador',
  event_id: eventId
}, tenantId);
```

### Hooks React Query

#### useEvents
Hook para gerenciar operações com eventos usando React Query.

```ts
import { useEvents } from '@/hooks/useEvents';

const { events, createEvent, isLoading } = useEvents();
```

#### useStaff
Hook para gerenciar operações com staff/equipe usando React Query.

```ts
import { useStaff } from '@/hooks/useStaff';

const { 
  staff, 
  createStaff, 
  deleteStaff, 
  isLoading 
} = useStaff(eventId);
```

Características:
- Cache com chave `['staff', eventId]`
- Invalidação automática após mutações
- Estados de loading/error integrados
- Toast notifications automáticas

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

O arquivo [`tailwind.config.ts`](../../tailwind.config.ts) define os caminhos de fontes do Tailwind.

## Notas da versão (Changelog)

O histórico completo de commits está disponível em [`docs/commits`](../commits). Consulte esses arquivos para acompanhar as mudanças por data.

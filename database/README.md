# Banco de dados

O banco usa PostgreSQL. A migration `003_operational_data.sql` amplia as tabelas de autenticação existentes; ela não substitui nem modifica `auth_users` ou `auth_sessions`.

## Tabelas e atributos

`PK` identifica a chave primária, `FK` identifica uma chave estrangeira, `NN` indica `NOT NULL`, `UQ` indica `UNIQUE`, `CK` indica `CHECK`, e `DF` indica `DEFAULT`.

| Tabela          | Atributos e tipos                                                                                                                                                            | Restrições principais                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auth_users`    | `id UUID`, `name TEXT`, `email TEXT`, `phone TEXT`, `password_hash TEXT`, `role TEXT`, `created_at TIMESTAMPTZ`                                                              | `id` PK; `name`, `email`, `password_hash`, `role`, `created_at` NN; `email` UQ; `role` CK: `corporate`, `customer`, `administrative`; `id` DF `gen_random_uuid()`; `created_at` DF `NOW()`                                                                                                                                                                                                                                                                                                 |
| `auth_sessions` | `token_hash TEXT`, `user_id UUID`, `expires_at TIMESTAMPTZ`, `created_at TIMESTAMPTZ`                                                                                        | `token_hash` PK; demais campos NN; `user_id` FK para `auth_users.id` com `ON DELETE CASCADE`; `created_at` DF `NOW()`                                                                                                                                                                                                                                                                                                                                                                      |
| `clientes`      | `id UUID`, `user_id UUID`, `nome_empresa TEXT`, `cnpj TEXT`, `email TEXT`, `telefone TEXT`, `created_at TIMESTAMPTZ`                                                         | `id` PK; `user_id` FK para `auth_users.id`, UQ e opcional; `cnpj` UQ; `nome_empresa`, `cnpj`, `email`, `created_at` NN; `user_id` ON DELETE SET NULL; `id` DF `gen_random_uuid()`; `created_at` DF `NOW()`                                                                                                                                                                                                                                                                                 |
| `contratos`     | `id UUID`, `cliente_id UUID`, `data_inicio DATE`, `data_fim DATE`, `status TEXT`, `created_at TIMESTAMPTZ`                                                                   | `id` PK; `cliente_id` FK para `clientes.id` e NN; `data_inicio` NN, DF `CURRENT_DATE`; `status` NN, CK: `active`, `pending`, `finished`, `cancelled`, DF `pending`; CK: `data_fim` nula ou maior/igual a `data_inicio`; `created_at` NN, DF `NOW()`                                                                                                                                                                                                                                        |
| `locais`        | `id UUID`, `contrato_id UUID`, `nome TEXT`, `endereco TEXT`, `cidade TEXT`, `estado TEXT`, `status TEXT`, `created_at TIMESTAMPTZ`                                           | `id` PK; `contrato_id` FK para `contratos.id` e NN; `nome`, `endereco`, `cidade`, `estado`, `status`, `created_at` NN; `status` CK: `active`, `inactive`, DF `active`; `id` DF `gen_random_uuid()`; `created_at` DF `NOW()`                                                                                                                                                                                                                                                                |
| `cameras`       | `id UUID`, `local_id UUID`, `identificacao TEXT`, `modelo TEXT`, `status TEXT`, `data_instalacao DATE`, `created_at TIMESTAMPTZ`                                             | `id` PK; `local_id` FK para `locais.id` e NN; `identificacao` NN; UQ em `(local_id, identificacao)`; `status` NN, CK: `active`, `inactive`, `maintenance`, DF `active`; `id` DF `gen_random_uuid()`; `created_at` NN, DF `NOW()`                                                                                                                                                                                                                                                           |
| `eventos`       | `id UUID`, `camera_id UUID`, `tipo TEXT`, `descricao TEXT`, `severidade TEXT`, `status TEXT`, `ocorrido_em TIMESTAMPTZ`, `created_at TIMESTAMPTZ`                            | `id` PK; `camera_id` FK para `cameras.id` e NN; `tipo`, `descricao`, `severidade`, `status`, `ocorrido_em`, `created_at` NN; `severidade` CK: `low`, `medium`, `high`, `critical`, DF `medium`; `status` CK: `pending`, `acknowledged`, `resolved`, DF `pending`; `ocorrido_em` e `created_at` DF `NOW()`                                                                                                                                                                                  |
| `chamados`      | `id UUID`, `cliente_id UUID`, `local_id UUID`, `evento_id UUID`, `user_id UUID`, `titulo TEXT`, `descricao TEXT`, `prioridade TEXT`, `status TEXT`, `created_at TIMESTAMPTZ` | `id` PK; `cliente_id` FK para `clientes.id` e NN; `local_id` FK para `locais.id`, opcional; `evento_id` FK para `eventos.id`, opcional, ON DELETE SET NULL; `user_id` FK para `auth_users.id`, opcional, ON DELETE SET NULL; `titulo`, `descricao`, `prioridade`, `status`, `created_at` NN; `prioridade` CK: `low`, `medium`, `high`, `urgent`, DF `medium`; `status` CK: `open`, `in_progress`, `resolved`, `cancelled`, DF `open`; `id` DF `gen_random_uuid()`; `created_at` DF `NOW()` |

As FKs sem ação de exclusão especificada usam o comportamento padrão do PostgreSQL (`NO ACTION`); nenhuma FK define `ON UPDATE`, portanto também usa `NO ACTION`. Em particular, excluir um cliente, contrato, local ou câmera que ainda tenha registros dependentes é impedido. Já a exclusão do evento ou usuário ligado a um chamado mantém o chamado e limpa a FK correspondente.

## Índices

- PKs e constraints `UNIQUE` criam índices únicos no PostgreSQL.
- `auth_sessions`: `auth_sessions_user_id_idx`, `auth_sessions_expires_at_idx`.
- `contratos`: `contratos_cliente_id_idx`.
- `locais`: `locais_contrato_id_idx`.
- `cameras`: `cameras_local_id_idx`.
- `eventos`: `eventos_camera_id_idx`, `eventos_ocorrido_em_idx`.
- `chamados`: `chamados_cliente_id_idx`, `chamados_local_id_idx`, `chamados_evento_id_idx`, `chamados_user_id_idx`.

## Função das tabelas e cardinalidades

- `auth_users` guarda contas e papéis utilizados pelo login; `auth_sessions` guarda sessões associadas a cada conta. Um usuário pode ter zero ou várias sessões (1:N).
- `clientes` representa a empresa contratante. A conta autenticada que a representa é opcional: no máximo um cliente por usuário e no máximo um usuário por cliente (1:1 opcional).
- `contratos` registra cada contrato de um cliente. Um cliente pode ter zero ou vários contratos; cada contrato pertence a um cliente (1:N).
- `locais` registra os endereços atendidos em cada contrato. Um contrato pode ter zero ou vários locais; cada local pertence a um contrato (1:N).
- `cameras` registra dispositivos instalados. Um local pode ter zero ou várias câmeras; cada câmera pertence a um local (1:N).
- `eventos` registra detecções por câmera. Uma câmera pode gerar zero ou vários eventos; cada evento pertence a uma câmera (1:N).
- `chamados` registra solicitações de atendimento de um cliente. Um cliente pode ter zero ou vários chamados; cada chamado pertence a um cliente (1:N). Local, evento e usuário associados são opcionais; cada chamado aponta para no máximo um de cada, e cada registro relacionado pode estar associado a vários chamados.

Não há relacionamentos N:N explícitos no modelo atual. As cardinalidades acima descrevem as FKs e constraints declaradas no SQL.

## Integridade e demonstração

PKs identificam linhas; FKs impedem referências inexistentes; `NOT NULL` exige os dados necessários; `UNIQUE` evita repetição de e-mail de login, CNPJ, associação usuário-cliente e identificação de câmera dentro do local; `CHECK` limita estados, prioridades e intervalo de datas; `DEFAULT` preenche UUIDs, datas e estados iniciais.

A migration `003_operational_data.sql` define a estrutura necessária para mostrar as tabelas e suas constraints em PostgreSQL ou Beekeeper Studio. A existência de registros operacionais na instância não é garantida por migrations; o seed existente (`npm run db:seed`) cria somente contas de autenticação.

## Aplicar as migrations

Configure `DATABASE_URL` no ambiente e execute:

```sh
npm run db:migrate
```

O comando aplica as migrations existentes de autenticação e, em seguida, a migration operacional.

`003_operational_data.sql` usa `CREATE TABLE IF NOT EXISTS` e `CREATE INDEX IF NOT EXISTS`, sem apagar nem atualizar linhas existentes. O runner reaplica também as migrations de autenticação: em particular, `002_administrative_role.sql` remove e recria `auth_users_role_check` com a lista de papéis atual. Essa migration não foi alterada nesta auditoria; considere esse efeito ao reaplicar o runner em ambientes existentes.

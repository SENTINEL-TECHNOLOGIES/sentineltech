## Contas de demonstração

Após configurar `DATABASE_URL` no arquivo `.env` e aplicar as migrations, execute `npm run db:seed` para criar/atualizar as contas de demonstração no banco:

| Acesso         | E-mail                      | Senha                 |
| -------------- | --------------------------- | --------------------- |
| Corporativo    | `empresa@sentinel-demo.com` | `Sentinel2026!`       |
| Cliente        | `cliente@sentinel-demo.com` | `SentinelClient2026!` |
| Administrativo | `admin@sentinel-demo.com`   | `SentinelAdmin2026!`  |

As credenciais são exibidas na tela de login correspondente. Essas contas são públicas e devem ser usadas apenas em ambientes de demonstração, nunca em produção.

No primeiro login demonstrativo, o aplicativo preenche exemplos fictícios de perfil, dispositivos, serviços e solicitações no armazenamento local do navegador. Os painéis operacionais e administrativos também exibem dados estáticos de demonstração. Esses exemplos não são gravados nas tabelas do banco e não representam clientes, pessoas, eventos ou equipamentos reais.

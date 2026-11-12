## Gestão de acessos e provisionamento

Configure `DATABASE_URL` e aplique as migrations com `npm run db:migrate`. Em bancos já existentes, quando a migration operacional legada `003` não corresponder ao schema instalado, aplique isoladamente esta migration aditiva com `npm run db:migrate:access`; não altere tabelas operacionais para contornar essa incompatibilidade. Defina `SENTINEL_ADMIN_EMAIL` e `SENTINEL_ADMIN_PASSWORD` (mínimo de 12 caracteres) no ambiente protegido. Em seguida, execute `npm run db:seed` uma única vez para provisionar o primeiro superadministrador. O comando não redefine senhas de contas existentes e falha se já houver um superadministrador.

Defina também `SENTINEL_MFA_ENCRYPTION_KEY` como uma chave aleatória de 32 bytes codificada em hexadecimal (64 caracteres). Armazene-a em um gerenciador de segredos, fora do repositório, e mantenha uma cópia segura: a chave é necessária para descriptografar os segredos TOTP administrativos. No primeiro acesso, o superadministrador deve configurar um aplicativo autenticador; as operações administrativas ficam bloqueadas até a validação do MFA.

Novos usuários recebem um nome de usuário único automaticamente. Convites administrativos expiram após 24 horas e podem ser aceitos na área **Meus Convites** do perfil. O painel **Gestão de Acessos** oferece atribuição explícita de permissões e auditoria das alterações.

O cadastro público não concede função administrativa. A senha e o e-mail iniciais são fornecidos somente por variáveis de ambiente no provisionamento, nunca por credenciais fixas na aplicação.

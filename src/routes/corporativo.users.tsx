import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Users } from "lucide-react";
import { Badge, Card, CardHeader } from "@/components/ui-bits";
import { RoleShell } from "@/components/role-shell";

export const Route = createFileRoute("/corporativo/users")({
  head: () => ({ meta: [{ title: "Usuários da Empresa — Sentinel" }] }),
  component: CorporateUsers,
});

function CorporateUsers() {
  return (
    <RoleShell role="corporate">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold">Usuários autorizados</h1><Badge variant="success">Empresa</Badge></div>
        <p className="-mt-5 text-sm text-muted-foreground">Gestão de acesso dos usuários vinculados ao ambiente corporativo.</p>
        <Card>
          <CardHeader title="Acesso corporativo" description="Permissões restritas à organização autenticada" action={<Users className="h-4 w-4 text-primary" />} />
          <div className="flex items-start gap-3 p-5"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" /><div><div className="text-sm font-semibold">Vínculo de empresas ainda não disponível</div><p className="mt-1 text-sm text-muted-foreground">O modelo atual armazena usuários e sessões, mas ainda não associa usuários a uma empresa nem oferece API de permissões. Nenhum usuário de outra organização é listado ou alterável.</p></div></div>
        </Card>
      </div>
    </RoleShell>
  );
}
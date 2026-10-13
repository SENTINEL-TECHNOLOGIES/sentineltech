import { AlertCircle, LockKeyhole } from "lucide-react";
import { Badge, Card, CardHeader } from "@/components/ui-bits";

export function AdminWorkspace({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold">{title}</h1><Badge variant="info">Área administrativa</Badge></div>
      <p className="-mt-5 text-sm text-muted-foreground">{description}</p>
      <Card>
        <CardHeader title="Recurso administrativo" description="Acesso restrito a administradores da Sentinel" action={<LockKeyhole className="h-4 w-4 text-primary" />} />
        <div className="flex items-start gap-3 p-5">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
          <div><div className="text-sm font-semibold">Este recurso ainda não possui integração de dados</div><p className="mt-1 text-sm text-muted-foreground">O backend atual autentica usuários e sessões, mas ainda não oferece operações persistidas para este módulo. Nenhum registro ou ação fictícia foi criado.</p></div>
        </div>
      </Card>
    </div>
  );
}
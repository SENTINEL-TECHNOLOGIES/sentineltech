import { createFileRoute } from "@tanstack/react-router";
import { AdminModule } from "@/components/admin-module";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({ meta: [{ title: "Logs e Auditoria — Administração Sentinel" }] }),
  component: () => <AdminModule title="Logs e Auditoria" description="Histórico de acessos, alterações de configuração e eventos administrativos." />,
});
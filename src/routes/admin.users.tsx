import { createFileRoute } from "@tanstack/react-router";
import { AdminModule } from "@/components/admin-module";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Usuários — Administração Sentinel" }] }),
  component: () => <AdminModule title="Usuários" description="Contas globais, permissões e estado de acesso à plataforma." />,
});
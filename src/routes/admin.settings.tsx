import { createFileRoute } from "@tanstack/react-router";
import { AdminModule } from "@/components/admin-module";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Configurações — Administração Sentinel" }] }),
  component: () => <AdminModule title="Configurações" description="Parâmetros gerais, permissões e integrações da plataforma." />,
});
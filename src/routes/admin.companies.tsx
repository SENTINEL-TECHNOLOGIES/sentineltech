import { createFileRoute } from "@tanstack/react-router";
import { AdminModule } from "@/components/admin-module";

export const Route = createFileRoute("/admin/companies")({
  head: () => ({ meta: [{ title: "Empresas — Administração Sentinel" }] }),
  component: () => <AdminModule title="Empresas" description="Cadastro de empresas, contratos e ambientes vinculados." />,
});
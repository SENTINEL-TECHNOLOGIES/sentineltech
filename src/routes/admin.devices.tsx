import { createFileRoute } from "@tanstack/react-router";
import { AdminModule } from "@/components/admin-module";

export const Route = createFileRoute("/admin/devices")({
  head: () => ({ meta: [{ title: "Câmeras e Dispositivos — Administração Sentinel" }] }),
  component: () => <AdminModule title="Câmeras e Dispositivos" description="Inventário global, configuração e associação de equipamentos a empresas." />,
});
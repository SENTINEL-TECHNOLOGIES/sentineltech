import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  Clock3,
  KeyRound,
  Loader2,
  RefreshCw,
  ShieldAlert,
  UserPlus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/hooks/use-session";
import type { Permission } from "@/lib/auth";

type Invite = {
  id: string;
  access_role: "admin" | "collaborator";
  department: string;
  permissions: Permission[];
  message: string | null;
  status: string;
  created_at: string;
  expires_at: string;
  sender_name: string;
  sender_username?: string;
  recipient_name?: string;
  recipient_username?: string;
  history?: Array<{
    operation: string;
    result: string;
    created_at: string;
    actor_name: string | null;
  }>;
};

type AccessUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  suspended_at: string | null;
  role: "superadmin" | "admin" | "collaborator";
  department: string | null;
  permissions: Permission[];
};

type ManagementData = {
  stats: {
    admins: number;
    collaborators: number;
    pending: number;
    accepted: number;
    expired: number;
  };
  invites: Invite[];
  users: AccessUser[];
  recentGrants: Array<{
    created_at: string;
    actor_name: string | null;
    subject_name: string | null;
  }>;
};

type AuditEvent = {
  id: number;
  operation: string;
  result: string;
  details: Record<string, unknown>;
  created_at: string;
  actor_name: string | null;
  subject_name: string | null;
};

const moduleLabels: Record<string, string> = {
  access: "Gestão de acessos",
  operations: "Operações",
  "command-center": "Centro de Comando",
  "ai-cctv": "CFTV com IA",
  "access-control": "Controle de Acesso",
  "building-automation": "Automação Predial",
  "remote-monitoring": "Monitoramento Remoto",
  installations: "Instalações",
  projects: "Projetos",
  reports: "Relatórios",
  tickets: "Chamados",
  finance: "Financeiro",
  settings: "Configurações",
};
const permissionActions: Permission["action"][] = [
  "view",
  "create",
  "edit",
  "delete",
  "administer",
];
const actionLabels: Record<Permission["action"], string> = {
  view: "Visualizar",
  create: "Criar",
  edit: "Editar",
  delete: "Excluir",
  administer: "Administrar",
};

async function api<T>(path: string, data?: Record<string, unknown>): Promise<T> {
  const response = await fetch(path, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: data ? { "content-type": "application/json" } : undefined,
    body: data ? JSON.stringify(data) : undefined,
  });
  const result = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(result.error ?? "Não foi possível concluir a operação.");
  return result;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(
    new Date(value),
  );
}

function roleName(role: string) {
  return role === "superadmin"
    ? "Superadministrador"
    : role === "admin"
      ? "Administrador"
      : "Colaborador";
}

function statusName(status: string) {
  return (
    {
      pending: "Pendente",
      accepted: "Aceito",
      declined: "Recusado",
      cancelled: "Cancelado",
      expired: "Expirado",
    }[status] ?? status
  );
}

function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
}) {
  const color =
    variant === "danger"
      ? "bg-destructive/15 text-destructive hover:bg-destructive/25"
      : variant === "secondary"
        ? "bg-secondary text-foreground hover:bg-secondary/70"
        : "bg-primary text-primary-foreground hover:bg-primary/90";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${color}`}
    >
      {children}
    </button>
  );
}

export function MyInvites() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [invites, setInvites] = useState<Invite[]>([]);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!session) return;
    try {
      const result = await api<{ invites: Invite[] }>("/api/access/invites");
      setInvites(result.invites);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Não foi possível carregar os convites.",
      );
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function respond(invite: Invite, action: "accept" | "decline") {
    if (
      !window.confirm(
        action === "accept"
          ? "Confirma o aceite deste convite?"
          : "Confirma a recusa deste convite?",
      )
    )
      return;
    try {
      const result = await api<{ mfaSetupRequired?: boolean }>(
        `/api/access/invites/${invite.id}/${action}`,
        { password },
      );
      setPassword("");
      toast.success(
        action === "accept"
          ? "Convite aceito. Configure o segundo fator para liberar o acesso."
          : "Convite recusado.",
      );
      await reload();
      if (action === "accept") {
        window.dispatchEvent(new Event("sentinel-auth-change"));
        navigate({ to: "/admin/users" });
      }
      return result;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Não foi possível responder ao convite.",
      );
    }
  }

  return (
    <section className="space-y-4 rounded-xl border border-border bg-card/60 p-5">
      <div>
        <h2 className="font-semibold">Meus Convites</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Convites de acesso enviados à sua conta Sentinel.
        </p>
      </div>
      <label className="block max-w-sm space-y-1 text-xs text-muted-foreground">
        Senha atual para confirmar a ação
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground"
        />
      </label>
      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando convites...</p>
      ) : invites.length === 0 ? (
        <p className="text-sm text-muted-foreground">Você não possui convites pendentes.</p>
      ) : (
        invites.map((invite) => (
          <article key={invite.id} className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-medium">
                  {roleName(invite.access_role)} · {invite.department}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Enviado por {invite.sender_name} (@{invite.sender_username}) · expira{" "}
                  {formatDate(invite.expires_at)}
                </div>
              </div>
              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] text-primary">
                Pendente
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {invite.permissions.map((permission) => (
                <span
                  key={`${permission.module}-${permission.action}`}
                  className="rounded bg-secondary px-2 py-1 text-[10px] text-muted-foreground"
                >
                  {moduleLabels[permission.module] ?? permission.module}:{" "}
                  {actionLabels[permission.action]}
                </span>
              ))}
            </div>
            {invite.message ? (
              <p className="mt-3 border-l-2 border-primary/40 pl-3 text-sm text-muted-foreground">
                {invite.message}
              </p>
            ) : null}
            <div className="mt-4 flex gap-2">
              <Button onClick={() => void respond(invite, "accept")} disabled={!password}>
                <Check className="h-3.5 w-3.5" /> Aceitar convite
              </Button>
              <Button
                variant="secondary"
                onClick={() => void respond(invite, "decline")}
                disabled={!password}
              >
                <X className="h-3.5 w-3.5" /> Recusar
              </Button>
            </div>
          </article>
        ))
      )}
    </section>
  );
}

export function AccessManagement() {
  const { session } = useSession();
  const [data, setData] = useState<ManagementData | null>(null);
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState("overview");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState<"admin" | "collaborator">("collaborator");
  const [message, setMessage] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaSecret, setMfaSecret] = useState("");
  const [mfaPassword, setMfaPassword] = useState("");
  const [mfaSetupStarted, setMfaSetupStarted] = useState(false);
  const [permissionTarget, setPermissionTarget] = useState<AccessUser | null>(null);
  const [editPermissions, setEditPermissions] = useState<Permission[]>([]);

  const isSuperadmin = session?.accessRole === "superadmin";
  const canView =
    isSuperadmin ||
    Boolean(
      session?.permissions?.some(
        (p) => p.module === "access" && ["view", "administer"].includes(p.action),
      ),
    );
  const availableModules = useMemo(() => Object.keys(moduleLabels), []);

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await api<ManagementData>("/api/access/management");
      setData(result);
      if (session?.accessRole === "superadmin") {
        const auditResult = await api<{ events: AuditEvent[] }>("/api/access/audit");
        setEvents(auditResult.events);
      }
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Não foi possível carregar a gestão de acessos.";
      setError(message);
      if (canView) toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [canView, session?.accessRole]);

  useEffect(() => {
    if (session?.accessRole && session.mfaVerified) void reload();
    else setLoading(false);
  }, [reload, session?.accessRole, session?.mfaVerified]);

  function togglePermission(module: string, action: Permission["action"]) {
    setPermissions((current) =>
      current.some((item) => item.module === module && item.action === action)
        ? current.filter((item) => item.module !== module || item.action !== action)
        : [...current, { module, action }],
    );
  }

  async function submitInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await api("/api/access/invites", {
        username,
        role,
        department,
        permissions,
        message,
        password,
      });
      toast.success("Convite criado e disponível para o destinatário.");
      setUsername("");
      setDepartment("");
      setMessage("");
      setPermissions([]);
      setPassword("");
      await reload();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Não foi possível criar o convite.");
    }
  }

  async function userOperation(user: AccessUser, operation: "suspend" | "restore" | "revoke") {
    const text =
      operation === "revoke"
        ? "Revogar privilégios administrativos"
        : operation === "suspend"
          ? "Suspender este usuário"
          : "Restaurar o acesso deste usuário";
    if (!window.confirm(`${text}: ${user.name}?`)) return;
    const reason = window.prompt("Informe o motivo para o registro de auditoria.") ?? "";
    if (reason.trim().length < 3) {
      toast.error("Informe um motivo com pelo menos 3 caracteres.");
      return;
    }
    try {
      await api(`/api/access/users/${user.id}/${operation}`, { password, reason });
      toast.success("Acesso atualizado.");
      await reload();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Não foi possível atualizar o acesso.");
    }
  }

  function editUserPermissions(user: AccessUser) {
    setPermissionTarget(user);
    setEditPermissions(user.permissions.map((permission) => ({ ...permission })));
  }

  function toggleEditedPermission(module: string, action: Permission["action"]) {
    setEditPermissions((current) =>
      current.some((item) => item.module === module && item.action === action)
        ? current.filter((item) => item.module !== module || item.action !== action)
        : [...current, { module, action }],
    );
  }

  async function saveUserPermissions(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!permissionTarget) return;
    try {
      await api(`/api/access/users/${permissionTarget.id}/permissions`, {
        permissions: editPermissions,
        password,
      });
      toast.success("Permissões atualizadas.");
      setPermissionTarget(null);
      await reload();
    } catch (cause) {
      toast.error(
        cause instanceof Error ? cause.message : "Não foi possível atualizar as permissões.",
      );
    }
  }

  async function inviteOperation(invite: Invite, action: "cancel" | "resend") {
    if (
      !window.confirm(
        action === "cancel"
          ? "Cancelar este convite?"
          : "Criar um novo convite para este destinatário?",
      )
    )
      return;
    try {
      await api(`/api/access/invites/${invite.id}/${action}`, { password });
      toast.success(action === "cancel" ? "Convite cancelado." : "Novo convite criado.");
      await reload();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Não foi possível atualizar o convite.");
    }
  }

  async function startMfa(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const result = await api<{ secret: string }>("/api/access/mfa/setup", {
        password: mfaPassword,
      });
      setMfaSecret(result.secret);
      setMfaSetupStarted(true);
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Não foi possível iniciar o MFA.");
    }
  }

  async function confirmMfa(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (session?.mfaEnabled) {
        await api("/api/access/mfa/verify", { code: mfaCode, password: mfaPassword });
      } else {
        await api("/api/access/mfa/confirm", { code: mfaCode, password: mfaPassword });
      }
      toast.success("Autenticação de dois fatores habilitada.");
      setMfaCode("");
      setMfaSecret("");
      setMfaPassword("");
      setMfaSetupStarted(false);
      window.dispatchEvent(new Event("sentinel-auth-change"));
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Código de autenticação inválido.");
    }
  }

  const invites = (data?.invites ?? []).filter(
    (invite) => filter === "all" || invite.status === filter,
  );
  const statusClass = (status: string) =>
    status === "accepted"
      ? "text-success"
      : status === "pending"
        ? "text-warning"
        : "text-muted-foreground";

  if (!session?.accessRole) {
    return (
      <Notice
        title="Gestão de Acessos"
        text="Esta área está disponível somente para usuários com privilégios administrativos concedidos."
      />
    );
  }

  if (!session.mfaVerified) {
    return (
      <div className="mx-auto max-w-xl space-y-5">
        <Header />
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-5">
          <div className="flex items-start gap-3">
            <KeyRound className="mt-0.5 h-5 w-5 text-warning" />
            <div>
              <h2 className="font-semibold">Autenticação de dois fatores obrigatória</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Configure um aplicativo autenticador para habilitar as operações administrativas.
              </p>
            </div>
          </div>
          {!mfaSetupStarted && !session.mfaEnabled ? (
            <form onSubmit={startMfa} className="mt-4 space-y-3">
              <input
                required
                type="password"
                autoComplete="current-password"
                value={mfaPassword}
                onChange={(e) => setMfaPassword(e.target.value)}
                placeholder="Confirme sua senha"
                className="w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm"
              />
              <Button type="submit">Iniciar configuração MFA</Button>
            </form>
          ) : null}
          {mfaSetupStarted ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm">
                Adicione manualmente este segredo ao aplicativo autenticador:
              </p>
              <code className="block break-all rounded-lg bg-background p-3 text-sm text-primary">
                {mfaSecret}
              </code>
              <p className="text-xs text-muted-foreground">
                O segredo é exibido somente durante esta configuração e fica criptografado no banco.
              </p>
            </div>
          ) : null}
          {session.mfaEnabled || mfaSetupStarted ? (
            <form onSubmit={confirmMfa} className="mt-4 flex flex-wrap gap-2">
              {session.mfaEnabled ? (
                <input
                  required
                  type="password"
                  value={mfaPassword}
                  onChange={(e) => setMfaPassword(e.target.value)}
                  placeholder="Confirme sua senha"
                  className="min-w-40 flex-1 rounded-lg border border-border bg-input/60 px-3 py-2 text-sm"
                />
              ) : null}
              <input
                required
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Código de 6 dígitos"
                className="min-w-40 flex-1 rounded-lg border border-border bg-input/60 px-3 py-2 text-sm"
              />
              <Button type="submit">Confirmar código</Button>
            </form>
          ) : null}
        </div>
      </div>
    );
  }

  if (!canView) {
    return (
      <Notice
        title="Gestão de Acessos"
        text="Sua conta precisa da permissão Gestão de acessos · Visualizar para acessar este painel."
      />
    );
  }

  const tabs = ["overview", "invites", "users", "permissions", ...(isSuperadmin ? ["audit"] : [])];
  const tabLabels: Record<string, string> = {
    overview: "Visão Geral",
    invites: "Central de Convites",
    users: "Usuários Administrativos",
    permissions: "Gerenciamento de Permissões",
    audit: "Histórico de Atividades",
  };

  return (
    <div className="space-y-6">
      <Header />
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${tab === item ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary"}`}
          >
            {tabLabels[item]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Usuário: @{session.username ?? session.email} · {roleName(session.accessRole)}
        </p>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Senha para operações críticas
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-44 rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground"
          />
        </label>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando dados persistidos...
        </div>
      ) : error ? (
        <Notice title="Falha ao carregar" text={error} />
      ) : tab === "overview" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ["Administradores", data?.stats.admins ?? 0],
            ["Colaboradores", data?.stats.collaborators ?? 0],
            ["Convites pendentes", data?.stats.pending ?? 0],
            ["Convites aceitos", data?.stats.accepted ?? 0],
            ["Convites expirados", data?.stats.expired ?? 0],
          ].map(([label, amount]) => (
            <div key={label} className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-2 text-3xl font-bold">{amount}</p>
            </div>
          ))}
          <div className="rounded-xl border border-border bg-card p-5 sm:col-span-2 xl:col-span-5">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Acessos recentemente concedidos</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {data?.recentGrants
                .map(
                  (grant) =>
                    `${grant.subject_name ?? "Usuário"} — ${grant.actor_name ?? "Sistema"} · ${formatDate(grant.created_at)}`,
                )
                .join(" · ") || "Nenhum acesso concedido recentemente."}
            </p>
          </div>
        </div>
      ) : tab === "invites" ? (
        <section className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "accepted", "declined", "expired", "cancelled"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-3 py-1.5 text-xs ${filter === item ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
              >
                {item === "all" ? "Todos" : statusName(item)}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead className="bg-secondary/60 text-muted-foreground">
                <tr>
                  {[
                    "Destinatário",
                    "Remetente",
                    "Nível",
                    "Envio",
                    "Expiração",
                    "Status",
                    "Ações",
                  ].map((label) => (
                    <th key={label} className="px-4 py-3">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invites.map((invite) => (
                  <tr key={invite.id}>
                    <td className="px-4 py-3">
                      {invite.recipient_name}{" "}
                      <span className="text-muted-foreground">@{invite.recipient_username}</span>
                    </td>
                    <td className="px-4 py-3">{invite.sender_name}</td>
                    <td className="px-4 py-3">{roleName(invite.access_role)}</td>
                    <td className="px-4 py-3">{formatDate(invite.created_at)}</td>
                    <td className="px-4 py-3">{formatDate(invite.expires_at)}</td>
                    <td className={`px-4 py-3 ${statusClass(invite.status)}`}>
                      {statusName(invite.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-start gap-2">
                        <details className="max-w-56">
                          <summary className="cursor-pointer text-primary">Detalhes</summary>
                          <div className="mt-2 space-y-2 rounded-lg border border-border bg-background p-3">
                            <p className="text-muted-foreground">
                              {invite.message || "Sem mensagem personalizada."}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {invite.permissions.map((permission) => (
                                <span
                                  key={`${permission.module}-${permission.action}`}
                                  className="rounded bg-secondary px-1.5 py-1 text-[10px]"
                                >
                                  {moduleLabels[permission.module] ?? permission.module}:{" "}
                                  {actionLabels[permission.action]}
                                </span>
                              ))}
                            </div>
                            <div className="border-t border-border pt-2">
                              {invite.history?.map((event) => (
                                <p
                                  key={`${event.operation}-${event.created_at}`}
                                  className="text-[10px] text-muted-foreground"
                                >
                                  {event.operation} · {event.actor_name ?? "Sistema"} ·{" "}
                                  {formatDate(event.created_at)}
                                </p>
                              ))}
                            </div>
                          </div>
                        </details>
                        {invite.status === "pending" ? (
                          <Button
                            variant="secondary"
                            onClick={() => void inviteOperation(invite, "cancel")}
                            disabled={!password}
                          >
                            Cancelar
                          </Button>
                        ) : invite.status !== "accepted" ? (
                          <Button
                            variant="secondary"
                            onClick={() => void inviteOperation(invite, "resend")}
                            disabled={!password}
                          >
                            <RefreshCw className="h-3 w-3" /> Reenviar
                          </Button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {invites.length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">Nenhum convite neste filtro.</p>
            ) : null}
          </div>
          {isSuperadmin ||
          session.permissions?.some(
            (p) => p.module === "access" && ["create", "administer"].includes(p.action),
          ) ? (
            <form
              onSubmit={submitInvite}
              className="space-y-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary" />
                <h2 className="font-semibold">Novo convite interno</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  minLength={3}
                  maxLength={64}
                  pattern="[a-zA-Z0-9._-]+"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nome de usuário do destinatário"
                  className="rounded-lg border border-border bg-input/60 px-3 py-2 text-sm"
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "admin" | "collaborator")}
                  disabled={!isSuperadmin}
                  className="rounded-lg border border-border bg-input/60 px-3 py-2 text-sm"
                >
                  {isSuperadmin ? <option value="admin">Administrador</option> : null}
                  <option value="collaborator">Colaborador</option>
                </select>
                <input
                  required
                  minLength={2}
                  maxLength={120}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Departamento ou setor"
                  className="rounded-lg border border-border bg-input/60 px-3 py-2 text-sm"
                />
                <input
                  value={message}
                  maxLength={1000}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mensagem opcional"
                  className="rounded-lg border border-border bg-input/60 px-3 py-2 text-sm"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                O convite expira automaticamente em 24 horas. Selecione somente permissões
                necessárias.
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[640px] text-left text-xs">
                  <thead>
                    <tr>
                      <th className="p-2">Módulo</th>
                      {permissionActions.map((action) => (
                        <th key={action} className="p-2">
                          {actionLabels[action]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {availableModules
                      .filter((module) => module !== "access" || isSuperadmin)
                      .map((module) => (
                        <tr key={module} className="border-t border-border">
                          <th className="p-2 font-medium">{moduleLabels[module]}</th>
                          {permissionActions.map((action) => (
                            <td key={action} className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={permissions.some(
                                  (p) => p.module === module && p.action === action,
                                )}
                                onChange={() => togglePermission(module, action)}
                                aria-label={`${moduleLabels[module]} ${actionLabels[action]}`}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <Button type="submit" disabled={!password || !username || !department}>
                <UserPlus className="h-3.5 w-3.5" /> Enviar convite
              </Button>
            </form>
          ) : null}
        </section>
      ) : tab === "users" ? (
        <>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead className="bg-secondary/60 text-muted-foreground">
                <tr>
                  {[
                    "Usuário",
                    "E-mail",
                    "Nível",
                    "Departamento",
                    "Permissões",
                    "Estado",
                    "Ações",
                  ].map((label) => (
                    <th key={label} className="px-4 py-3">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(data?.users ?? []).map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3">
                      {user.name} <span className="text-muted-foreground">@{user.username}</span>
                    </td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{roleName(user.role)}</td>
                    <td className="px-4 py-3">{user.department ?? "—"}</td>
                    <td className="px-4 py-3">{user.permissions.length}</td>
                    <td className="px-4 py-3">{user.suspended_at ? "Suspenso" : "Ativo"}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {isSuperadmin && user.id !== session.id ? (
                          <>
                            <Button
                              variant="secondary"
                              disabled={!password}
                              onClick={() => editUserPermissions(user)}
                            >
                              Permissões
                            </Button>
                            <Button
                              variant="secondary"
                              disabled={!password}
                              onClick={() =>
                                void userOperation(user, user.suspended_at ? "restore" : "suspend")
                              }
                            >
                              {user.suspended_at ? "Restaurar" : "Suspender"}
                            </Button>
                            {user.role !== "superadmin" ? (
                              <Button
                                variant="danger"
                                disabled={!password}
                                onClick={() => void userOperation(user, "revoke")}
                              >
                                Revogar
                              </Button>
                            ) : null}
                          </>
                        ) : (
                          "—"
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {permissionTarget ? (
            <form
              onSubmit={saveUserPermissions}
              className="space-y-4 rounded-xl border border-primary/30 bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">Permissões de {permissionTarget.name}</h2>
                  <p className="text-xs text-muted-foreground">@{permissionTarget.username}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPermissionTarget(null)}
                  aria-label="Fechar"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[640px] text-left text-xs">
                  <thead>
                    <tr>
                      <th className="p-2">Módulo</th>
                      {permissionActions.map((action) => (
                        <th key={action} className="p-2">
                          {actionLabels[action]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {availableModules.map((module) => (
                      <tr key={module} className="border-t border-border">
                        <th className="p-2 font-medium">{moduleLabels[module]}</th>
                        {permissionActions.map((action) => (
                          <td key={action} className="p-2 text-center">
                            <input
                              type="checkbox"
                              checked={editPermissions.some(
                                (item) => item.module === module && item.action === action,
                              )}
                              onChange={() => toggleEditedPermission(module, action)}
                              aria-label={`${moduleLabels[module]} ${actionLabels[action]}`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button type="submit" disabled={!password}>
                Salvar permissões
              </Button>
            </form>
          ) : null}
        </>
      ) : tab === "permissions" ? (
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Modelo de permissões</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Cada concessão é explícita por módulo e ação; funções administrativas não recebem acesso
            global automaticamente. Somente o superadministrador pode editar permissões de contas já
            ativas.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Ações: Visualizar · Criar · Editar · Excluir · Administrar. Admins podem convidar
            colaboradores apenas com permissões que já possuem.
          </p>
        </section>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[700px] text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground">
              <tr>
                {[
                  "Data",
                  "Responsável",
                  "Usuário afetado",
                  "Operação",
                  "Resultado",
                  "Detalhes",
                ].map((label) => (
                  <th key={label} className="px-4 py-3">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-4 py-3">{formatDate(event.created_at)}</td>
                  <td className="px-4 py-3">{event.actor_name ?? "Sistema"}</td>
                  <td className="px-4 py-3">{event.subject_name ?? "—"}</td>
                  <td className="px-4 py-3">{event.operation}</td>
                  <td className="px-4 py-3">{event.result}</td>
                  <td className="max-w-64 truncate px-4 py-3">{JSON.stringify(event.details)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-bold">Gestão de Acessos</h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Identidades administrativas, convites, permissões e rastreabilidade.
      </p>
    </div>
  );
}

function Notice({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-warning/30 bg-warning/5 p-5">
      <div className="flex gap-3">
        <ShieldAlert className="h-4 w-4 text-warning" />
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{text}</p>
        </div>
      </div>
    </div>
  );
}

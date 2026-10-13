import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { login, CREDENTIALS, dashboardForRole, isEmailValid, type Role } from "@/lib/auth";
import { AuthShell, Field, inputClass } from "./auth-shell";

export function LoginForm({
  title = "Entrar na sua conta",
  subtitle = "Acesse o portal de monitoramento da Sentinel Technologies.",
  redirectTo,
  demoRole = "corporate",
  showDemoCredentials = true,
}: {
  title?: string;
  subtitle?: string;
  redirectTo?: string;
  demoRole?: Exclude<Role, "administrative">;
  showDemoCredentials?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const emailValid = isEmailValid(email);
  const formValid = emailValid && password.length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!formValid) {
      setError("Preencha e-mail e senha corretamente.");
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    if (result.ok) {
      toast.success("Login realizado com sucesso!");
      navigate({ to: redirectTo ?? dashboardForRole(result.role) });
    } else {
      setError(result.error);
      toast.error(result.error);
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title={title}
      subtitle={subtitle}
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="font-semibold text-primary hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <Field label="E-mail" error={email.length > 0 && !emailValid ? "E-mail inválido." : null}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@empresa.com"
            maxLength={255}
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field label="Senha">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              autoComplete="current-password"
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={show ? "Ocultar senha" : "Mostrar senha"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>

        <div className="flex justify-end">
          <Link to="/recuperar-senha" className="text-xs font-medium text-primary hover:underline">
            Esqueci minha senha
          </Link>
        </div>

        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">{error}</div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Entrar
        </button>
      </form>

      {showDemoCredentials ? <div className="mt-6 rounded-lg border border-border/50 bg-secondary/40 p-3 text-xs">
        <div className="font-semibold text-muted-foreground">Credenciais de demonstração</div>
        <button
          type="button"
          onClick={() => {
            setEmail(CREDENTIALS[demoRole].email);
            setPassword(CREDENTIALS[demoRole].password);
          }}
          className="mt-1 block text-left font-mono text-[11px] text-primary hover:underline"
        >
          {CREDENTIALS[demoRole].email} / {CREDENTIALS[demoRole].password}
        </button>
      </div> : null}
    </AuthShell>
  );
}

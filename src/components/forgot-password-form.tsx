import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { requestPasswordReset, isEmailValid } from "@/lib/auth";
import { AuthShell, Field, inputClass } from "./auth-shell";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = isEmailValid(email);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!emailValid) {
      setError("Informe um e-mail válido.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = requestPasswordReset(email);
      setLoading(false);
      if (result.ok) {
        setSent(true);
        toast.success("Instruções de recuperação enviadas.");
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    }, 700);
  }

  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Informe seu e-mail e enviaremos as instruções para redefinir sua senha."
      footer={
        <>
          Lembrou a senha?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Voltar para o login
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-success/40 bg-success/10 p-4 text-sm text-success">
            <MailCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Se existir uma conta para <strong className="font-semibold">{email.trim()}</strong>, você receberá um link de
              recuperação em alguns minutos.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setEmail("");
            }}
            className="w-full rounded-lg border border-border px-4 py-3 text-sm font-semibold transition hover:bg-secondary/60"
          >
            Enviar para outro e-mail
          </button>
        </div>
      ) : (
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

          {error ? (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">{error}</div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Enviar instruções
          </button>
        </form>
      )}
    </AuthShell>
  );
}

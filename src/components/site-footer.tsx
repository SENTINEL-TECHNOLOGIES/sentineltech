import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-6 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Sentinel Technologies</p>
        <nav aria-label="Links institucionais" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link
            to="/explore/home"
            className="inline-flex min-h-11 items-center hover:text-foreground"
          >
            Início
          </Link>
          <Link
            to="/explore/contact"
            className="inline-flex min-h-11 items-center hover:text-foreground"
          >
            Contato
          </Link>
          <Link
            to="/explore/privacy"
            className="inline-flex min-h-11 items-center font-medium text-foreground hover:text-primary"
          >
            Política de Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}

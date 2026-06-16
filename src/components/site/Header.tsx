import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/translations";

const navItems = [
  { to: "/", key: "nav.home" as const },
  { to: "/menu", key: "nav.menu" as const },
  { to: "/events", key: "nav.events" as const },
  { to: "/about", key: "nav.about" as const },
  { to: "/contact", key: "nav.contact" as const },
];

function LangToggle() {
  const { lang, setLang } = useLanguage();
  const opts: Lang[] = ["fr", "en"];
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5 text-xs font-medium">
      {opts.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-full transition-colors ${
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-rosanne flex h-16 md:h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-baseline gap-1.5" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl md:text-3xl tracking-tight">Rosanne</span>
          <span className="text-gold text-lg">·</span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Casablanca
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navItems.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="text-foreground/80 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: it.to === "/" }}
            >
              {t(it.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("nav.reserve")}
          </Link>
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container-rosanne py-3 flex flex-col">
            {navItems.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-foreground/90"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: it.to === "/" }}
              >
                {t(it.key)}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              {t("nav.reserve")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

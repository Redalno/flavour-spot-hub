import { Link } from "@tanstack/react-router";
import { Instagram, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="container-rosanne py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl">Rosanne</span>
            <span className="text-gold">·</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Casablanca
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">Contact</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 text-gold" />
              <span>{t("contact.address")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 mt-0.5 text-gold" />
              <a href="tel:+212708139013" className="hover:text-foreground">
                {t("contact.phone")}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 mt-0.5 text-gold" />
              <span>{t("contact.hours")}</span>
            </li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">{t("footer.follow")}</div>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Instagram className="h-4 w-4 text-gold" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://glovoapp.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                Glovo
              </a>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-rosanne py-5 text-xs text-muted-foreground flex flex-col md:flex-row gap-2 justify-between items-center">
          <span>© {new Date().getFullYear()} Rosanne. {t("footer.rights")}</span>
          <div className="flex items-center gap-4">
            <span>Bd Ghandi · Casablanca · Morocco</span>
            <Link to="/auth" className="text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Espace manager
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

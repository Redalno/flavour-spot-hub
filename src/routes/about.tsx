import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import interiorImg from "@/assets/interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — Rosanne · Casablanca" },
      {
        name: "description",
        content:
          "L'histoire de Rosanne, café women-led sur le Bd Ghandi à Casablanca. Brunch, événements et hospitalité.",
      },
      { property: "og:title", content: "À propos — Rosanne" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="py-16 md:py-24">
      <div className="container-rosanne">
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-sage uppercase tracking-[0.14em]">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            {t("about.badge")}
          </div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl">{t("about.title")}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            {t("about.lead")}
          </p>
        </header>

        <div className="mt-12 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src={interiorImg}
              alt="Salle de Rosanne"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="lg:col-span-2 space-y-6 text-foreground/85 leading-relaxed">
            <p>
              Rosanne, c'est d'abord une équipe portée par des femmes — qui ont voulu
              ouvrir un lieu différent, où l'on vient pour manger bien, parler longtemps,
              et célébrer.
            </p>
            <p>
              On y sert un brunch tous les jours, des plats signatures qu'on revisite
              avec une touche marocaine, et des desserts qu'on prépare à la commande.
            </p>
            <p>
              Notre salle accueille aussi vos anniversaires, baby showers et iftars
              d'entreprise — avec une attention particulière à la décoration et à
              l'animation, comme nos clients nous le rappellent souvent.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              <div>
                <div className="font-display text-3xl text-gold">4.2★</div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mt-1">
                  Google
                </div>
              </div>
              <div>
                <div className="font-display text-3xl text-gold">935</div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mt-1">
                  Avis
                </div>
              </div>
              <div>
                <div className="font-display text-3xl text-gold">7j/7</div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mt-1">
                  Ouvert
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

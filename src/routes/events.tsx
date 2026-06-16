import { createFileRoute, Link } from "@tanstack/react-router";
import { Cake, Users, Sparkles, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import eventImg from "@/assets/event-birthday.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Événements & Anniversaires — Rosanne Casablanca" },
      {
        name: "description",
        content:
          "Privatisation, anniversaires, baby showers, dîners de groupe. Rosanne organise vos célébrations sur le Bd Ghandi.",
      },
      { property: "og:title", content: "Événements — Rosanne" },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { t } = useLanguage();

  const features = [
    { icon: Cake, title: "Anniversaires", desc: "Décoration, gâteau, animation pour petits et grands." },
    { icon: Users, title: "Privatisations", desc: "Espace entier ou semi-privé selon votre groupe." },
    { icon: Sparkles, title: "Sur mesure", desc: "Menu, déco et ambiance adaptés à votre thème." },
    { icon: Calendar, title: "Iftars groupes", desc: "Buffet iftar personnalisé pour entreprises et familles." },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container-rosanne">
        <header className="max-w-2xl">
          <div className="eyebrow">Privatisations</div>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{t("events.title")}</h1>
          <p className="mt-4 text-muted-foreground text-lg">{t("events.lead")}</p>
        </header>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src={eventImg}
              alt="Privatisation chez Rosanne"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 flex flex-col md:flex-row md:items-center gap-8 justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground">
              {t("events.form.title")}
            </h2>
            <p className="mt-3 text-primary-foreground/75">
              Remplissez le formulaire de contact en sélectionnant « Privatisation /
              Anniversaire ». Nous revenons vers vous sous 24h.
            </p>
          </div>
          <Link
            to="/contact"
            search={{ type: "event" }}
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground hover:opacity-95"
          >
            {t("home.events.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

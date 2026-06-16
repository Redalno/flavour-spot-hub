import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import heroImg from "@/assets/hero-brunch.jpg";
import kunafaImg from "@/assets/dish-kunafa.jpg";
import khlieImg from "@/assets/dish-khlie.jpg";
import burgerImg from "@/assets/dish-burger.jpg";
import interiorImg from "@/assets/interior.jpg";
import eventImg from "@/assets/event-birthday.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rosanne — Brunch & Café · Bd Ghandi, Casablanca" },
      {
        name: "description",
        content:
          "Brunch servi tous les jours, desserts signature et privatisations sur le Bd Ghandi. Le rendez-vous des amoureux de brunch à Casablanca.",
      },
      { property: "og:title", content: "Rosanne — Brunch & Café · Casablanca" },
      {
        property: "og:description",
        content: "Brunch quotidien, desserts signature et événements privés.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const reviews = [
  {
    name: "Jamal",
    text:
      "Le meilleur brunch de Casablanca. L'accueil est chaleureux, la déco soignée et les plats généreux. Un vrai coup de cœur.",
    rating: 5,
  },
  {
    name: "Ahmed Ben Karoum",
    text:
      "J'ai organisé l'anniversaire de ma sœur ici. L'équipe a tout pris en charge, la décoration était magnifique. Merci !",
    rating: 5,
  },
  {
    name: "Salma",
    text:
      "La cheesecake brownie kunafa est une tuerie. Je recommande à 1000%. Service au top, ambiance cosy.",
    rating: 4,
  },
];

function Home() {
  const { t } = useLanguage();

  const signatures = [
    {
      img: kunafaImg,
      name: "Cheesecake Base Brownie Kunafa",
      tag: "Dessert",
      price: "85 MAD",
    },
    { img: khlieImg, name: "Oeuf au Khlie", tag: "Brunch", price: "95 MAD" },
    { img: burgerImg, name: "Crispy Chicken Burger", tag: "Salé", price: "110 MAD" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
          <img
            src={heroImg}
            alt="Brunch chez Rosanne"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="absolute inset-0 flex items-end">
            <div className="container-rosanne pb-16 md:pb-24 text-primary-foreground">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-background/15 backdrop-blur px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary-foreground/90 border border-primary-foreground/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {t("hero.kicker")}
                </div>
                <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.02] text-primary-foreground">
                  {t("hero.title")}
                </h1>
                <p className="mt-5 max-w-xl text-base md:text-lg text-primary-foreground/85 leading-relaxed">
                  {t("hero.subtitle")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/menu"
                    className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground hover:opacity-95"
                  >
                    {t("hero.cta.menu")}
                  </Link>
                  <a
                    href="https://glovoapp.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 justify-center rounded-full border border-primary-foreground/30 bg-background/10 backdrop-blur px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-background/20"
                  >
                    {t("hero.cta.order")} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURES */}
      <section className="py-20 md:py-28">
        <div className="container-rosanne">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="eyebrow">{t("home.signature.eyebrow")}</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">
                {t("home.signature.title")}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-lg">
                {t("home.signature.lead")}
              </p>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold"
            >
              {t("nav.menu")} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {signatures.map((d) => (
              <article
                key={d.name}
                className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-card)] transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.16em] text-sage">
                      {t("menu.signature")}
                    </span>
                    <span className="text-sm font-medium">{d.price}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight">{d.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 md:py-24 bg-card border-y border-border">
        <div className="container-rosanne grid gap-12 md:grid-cols-2 items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src={interiorImg}
              alt="Intérieur du café Rosanne"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="eyebrow">{t("home.about.eyebrow")}</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              {t("home.about.title")}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {t("home.about.body")}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-sage uppercase tracking-[0.14em]">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              {t("about.badge")}
            </div>
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium border-b border-foreground pb-0.5 hover:text-gold hover:border-gold"
              >
                {t("home.about.cta")} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="py-20 md:py-28">
        <div className="container-rosanne grid gap-12 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <div className="eyebrow">{t("home.events.eyebrow")}</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              {t("home.events.title")}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {t("home.events.body")}
            </p>
            <div className="mt-8">
              <Link
                to="/events"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {t("home.events.cta")}
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 aspect-[5/4] overflow-hidden rounded-2xl">
            <img
              src={eventImg}
              alt="Anniversaire privatisé chez Rosanne"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-card to-background">
        <div className="container-rosanne">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow">{t("home.reviews.eyebrow")}</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              {t("home.reviews.title")}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure
                key={r.name}
                className="rounded-2xl bg-card border border-border p-7 flex flex-col"
              >
                <div className="flex items-center gap-0.5 text-gold mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="font-display text-lg leading-snug text-foreground">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  — {r.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

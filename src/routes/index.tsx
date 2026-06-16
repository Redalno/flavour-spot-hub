import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/site/Reveal";
import { useCountUp } from "@/hooks/use-count-up";
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
      { property: "og:image", content: "https://flavour-spot-hub.lovable.app/og.jpg" },
      { property: "og:url", content: "https://flavour-spot-hub.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://flavour-spot-hub.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Rosanne",
          servesCuisine: ["Brunch", "Café", "Moroccan", "International"],
          priceRange: "100–150 MAD",
          telephone: "+212708139013",
          url: "https://flavour-spot-hub.lovable.app/",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Bd Ghandi",
            addressLocality: "Casablanca",
            addressCountry: "MA",
          },
          openingHours: "Mo-Su 09:00-23:00",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.2",
            reviewCount: "935",
          },
        }),
      },
    ],
  }),
  component: Home,
});

const reviews = [
  {
    name: "Jamal",
    role: "Casablanca",
    text:
      "Le meilleur brunch de Casablanca. L'accueil est chaleureux, la déco soignée et les plats généreux. Un vrai coup de cœur.",
    rating: 5,
  },
  {
    name: "Ahmed Ben Karoum",
    role: "Anniversaire privatisé",
    text:
      "J'ai organisé l'anniversaire de ma sœur ici. L'équipe a tout pris en charge, la décoration était magnifique. Merci !",
    rating: 5,
  },
  {
    name: "Salma",
    role: "Habituée",
    text:
      "La cheesecake brownie kunafa est une tuerie. Je recommande à 1000%. Service au top, ambiance cosy.",
    rating: 4,
  },
];

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const { ref, value: v } = useCountUp(value);
  const display = value % 1 === 0 ? Math.round(v).toString() : v.toFixed(1);
  return (
    <div ref={ref as never} className="flex flex-col">
      <div className="font-display text-4xl md:text-5xl leading-none text-foreground">
        {display}
        <span className="text-espresso">{suffix}</span>
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

function Home() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % reviews.length), 6000);
    return () => clearInterval(id);
  }, []);

  const signatures = [
    { img: kunafaImg, name: "Cheesecake Base Brownie Kunafa", tag: "Dessert", price: "85 MAD" },
    { img: khlieImg, name: "Oeuf au Khlie", tag: "Brunch", price: "95 MAD" },
    { img: burgerImg, name: "Crispy Chicken Burger", tag: "Salé", price: "110 MAD" },
  ];

  const marqueeItems = t("marquee.items").split(" · ");

  return (
    <>
      {/* ───────── HERO — editorial cover ───────── */}
      <section className="relative">
        <div className="relative h-[92vh] min-h-[640px] w-full overflow-hidden grain">
          <img
            src={heroImg}
            alt="Brunch chez Rosanne"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover ken-burns"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          {/* magazine masthead overlay */}
          <div className="absolute inset-x-0 top-0">
            <div className="container-rosanne flex items-center justify-between pt-6 text-primary-foreground/80 text-[11px] uppercase tracking-[0.28em]">
              <span>Issue N°01</span>
              <span className="hidden md:inline">{lang === "fr" ? "Casablanca · Maroc" : "Casablanca · Morocco"}</span>
              <span>MMXXVI</span>
            </div>
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="container-rosanne pb-20 md:pb-28 text-primary-foreground">
              <Reveal className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-background/10 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.28em] border border-primary-foreground/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                  {t("hero.kicker")}
                </div>
                <h1 className="mt-7 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] text-primary-foreground">
                  {lang === "fr" ? (
                    <>Le brunch qui fait <span className="text-italic-display text-sand">parler</span> Casablanca.</>
                  ) : (
                    <>The brunch Casablanca <span className="text-italic-display text-sand">whispers</span> about.</>
                  )}
                </h1>
                <p className="mt-6 max-w-xl text-base md:text-lg text-primary-foreground/85 leading-relaxed">
                  {t("hero.subtitle")}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    to="/menu"
                    className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-clay transition-colors"
                  >
                    {t("hero.cta.menu")}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </Link>
                  <a
                    href="https://glovoapp.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-background/10"
                  >
                    {t("hero.cta.order")} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* scroll cue */}
          <div className="absolute bottom-6 right-6 hidden md:flex flex-col items-center gap-2 text-primary-foreground/70 text-[10px] uppercase tracking-[0.28em]">
            <span>Scroll</span>
            <span className="block h-10 w-px bg-primary-foreground/40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ───────── MARQUEE STRIP ───────── */}
      <section className="border-y border-border bg-card overflow-hidden py-5">
        <div className="marquee-track text-espresso">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="px-8 font-display text-2xl md:text-3xl italic whitespace-nowrap">
              {m}
              <span className="ml-8 text-clay">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ───────── STATS BAR ───────── */}
      <section className="py-16 md:py-20">
        <div className="container-rosanne grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          <Stat value={4} suffix="+" label={t("home.stats.years")} />
          <Stat value={935} label={t("home.stats.reviews")} />
          <Stat value={4.2} label={t("home.stats.rating")} />
          <Stat value={20} suffix="+" label={t("home.stats.events")} />
        </div>
      </section>

      {/* ───────── FEATURED EDITORIAL — magazine cover spread ───────── */}
      <section className="py-12 md:py-24">
        <div className="container-rosanne">
          <Reveal className="grid gap-10 lg:grid-cols-12 items-end">
            <div className="lg:col-span-7 relative overflow-hidden rounded-sm group">
              <div className="aspect-[5/4] md:aspect-[16/11] overflow-hidden">
                <img
                  src={interiorImg}
                  alt="Salle de Rosanne"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-background/95 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em]">
                {t("home.feature.kicker")}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="eyebrow">{t("home.feature.eyebrow")}</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05]">
                {t("home.feature.title")}
              </h2>
              <p className="mt-6 text-foreground/80 leading-relaxed drop-cap">
                {t("home.feature.lead")}
              </p>
              <div className="mt-8">
                <Link to="/about" className="link-underline inline-flex items-center gap-2 text-sm font-medium text-espresso">
                  {t("home.feature.read")} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── SIGNATURES — magazine spread (1 large + 2 stacked) ───────── */}
      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="container-rosanne">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="eyebrow"><span className="rule" />{t("home.signature.eyebrow")}</div>
              <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[1.02]">
                {t("home.signature.title")}
              </h2>
              <p className="mt-5 text-muted-foreground max-w-lg">{t("home.signature.lead")}</p>
            </div>
            <Link to="/menu" className="link-underline inline-flex items-center gap-1.5 text-sm font-medium">
              {t("nav.menu")} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* featured */}
            <Reveal className="lg:col-span-3">
              <article className="group relative overflow-hidden rounded-sm bg-background">
                <div className="aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
                  <img
                    src={signatures[0].img}
                    alt={signatures[0].name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-7 md:p-9 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-espresso">
                    <span>{signatures[0].tag} — {t("menu.signature")}</span>
                    <span>{signatures[0].price}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight">{signatures[0].name}</h3>
                </div>
              </article>
            </Reveal>
            {/* stacked */}
            <div className="lg:col-span-2 grid gap-6">
              {signatures.slice(1).map((d, i) => (
                <Reveal key={d.name} delayMs={120 * (i + 1)}>
                  <article className="group relative overflow-hidden rounded-sm bg-background flex flex-col sm:flex-row lg:flex-col">
                    <div className="sm:w-1/2 lg:w-full aspect-[4/3] overflow-hidden">
                      <img
                        src={d.img}
                        alt={d.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col gap-3 justify-center">
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-espresso">
                        <span>{d.tag}</span>
                        <span>{d.price}</span>
                      </div>
                      <h3 className="font-display text-2xl leading-tight">{d.name}</h3>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── GALLERY STRIP ───────── */}
      <section className="py-20 md:py-28">
        <div className="container-rosanne mb-12">
          <Reveal>
            <div className="eyebrow"><span className="rule" />{t("home.gallery.eyebrow")}</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl max-w-2xl">{t("home.gallery.title")}</h2>
          </Reveal>
        </div>
        <div className="container-rosanne">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {[heroImg, kunafaImg, interiorImg, khlieImg, eventImg].map((src, i) => (
              <Reveal
                key={i}
                delayMs={i * 80}
                className={`overflow-hidden rounded-sm group ${
                  i === 0 ? "col-span-2 md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-[3/4]"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── EVENTS — zigzag ───────── */}
      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="container-rosanne grid gap-12 lg:grid-cols-12 items-center">
          <Reveal className="lg:col-span-5 order-2 lg:order-1">
            <div className="eyebrow">{t("home.events.eyebrow")}</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.05]">
              {t("home.events.title")}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
              {t("home.events.body")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/events"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-foreground"
              >
                {t("home.events.cta")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </Reveal>
          <Reveal delayMs={150} className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-sm aspect-[5/4] group">
              <img
                src={eventImg}
                alt="Anniversaire privatisé chez Rosanne"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-background/95 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em]">
                Issue N°02 — Celebrations
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── REVIEWS — auto-rotating slider ───────── */}
      <section className="py-24 md:py-32">
        <div className="container-rosanne">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow">{t("home.reviews.eyebrow")}</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">{t("home.reviews.title")}</h2>
          </Reveal>

          <div className="relative max-w-3xl mx-auto">
            <Quote className="absolute -top-6 -left-2 h-12 w-12 text-clay/40" strokeWidth={1} />
            <div className="relative min-h-[260px] md:min-h-[220px]">
              {reviews.map((r, i) => (
                <figure
                  key={r.name}
                  className={`absolute inset-0 transition-all duration-700 ${
                    i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-center gap-0.5 text-clay mb-6">
                    {Array.from({ length: r.rating }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="font-display text-2xl md:text-3xl text-italic-display leading-snug text-center text-foreground">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-7 text-center text-sm">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1">{r.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-3">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Avis ${i + 1}`}
                  className={`h-px transition-all duration-500 ${
                    i === active ? "w-12 bg-foreground" : "w-6 bg-border hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA STRIP ───────── */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="container-rosanne py-16 md:py-20 grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-8">
            <h3 className="font-display text-3xl md:text-5xl leading-[1.05]">
              {lang === "fr"
                ? <>Une table vous attend sur le <span className="text-italic-display text-clay">Bd Ghandi.</span></>
                : <>A table is waiting for you on <span className="text-italic-display text-clay">Bd Ghandi.</span></>}
            </h3>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-medium text-clay-foreground hover:bg-background"
            >
              {t("nav.reserve")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

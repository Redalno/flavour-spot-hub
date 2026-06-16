import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import kunafaImg from "@/assets/dish-kunafa.jpg";
import khlieImg from "@/assets/dish-khlie.jpg";
import burgerImg from "@/assets/dish-burger.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Rosanne · Brunch & Café Casablanca" },
      {
        name: "description",
        content:
          "La carte de Rosanne : brunch, plats signatures, desserts et boissons. Prix moyens 100–150 MAD.",
      },
      { property: "og:title", content: "Menu — Rosanne" },
      {
        property: "og:description",
        content:
          "Brunch, plats salés, desserts signature et boissons chez Rosanne — Bd Ghandi, Casablanca. Prix moyens 100–150 MAD.",
      },
      { property: "og:url", content: "https://flavour-spot-hub.lovable.app/menu" },
    ],
    links: [{ rel: "canonical", href: "https://flavour-spot-hub.lovable.app/menu" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          name: "Menu Rosanne",
          hasMenuSection: [
            { "@type": "MenuSection", name: "Brunch" },
            { "@type": "MenuSection", name: "Salé" },
            { "@type": "MenuSection", name: "Desserts" },
            { "@type": "MenuSection", name: "Boissons" },
          ],
        }),
      },
    ],
  }),
  component: MenuPage,
});

type Item = {
  name: string;
  desc: string;
  price: string;
  cat: "brunch" | "savory" | "desserts" | "drinks";
  signature?: boolean;
  img?: string;
};

const items: Item[] = [
  { name: "Oeuf au Khlie", desc: "Œufs au confit d'agneau épicé, msemen, herbes fraîches.", price: "95 MAD", cat: "brunch", signature: true, img: khlieImg },
  { name: "Brunch Rosanne", desc: "Œufs au choix, avocado toast, jus pressé, mint tea, pancakes.", price: "145 MAD", cat: "brunch" },
  { name: "Avocado Toast", desc: "Pain de seigle, avocat, grenade, citron confit.", price: "75 MAD", cat: "brunch" },
  { name: "Pancakes Beldi", desc: "Pancakes moelleux, miel de Taroudant, beurre noisette.", price: "70 MAD", cat: "brunch" },

  { name: "Crispy Chicken Burger", desc: "Poulet pané buttermilk, brioche, sauce signature, frites maison.", price: "110 MAD", cat: "savory", signature: true, img: burgerImg },
  { name: "Salade César Revisitée", desc: "Romaine, poulet grillé, parmesan, croûtons aux herbes.", price: "95 MAD", cat: "savory" },
  { name: "Pasta Truffe", desc: "Tagliatelles fraîches, crème de truffe, parmesan affiné.", price: "130 MAD", cat: "savory" },

  { name: "Cheesecake Base Brownie Kunafa", desc: "Brownie fudgy, cheesecake, kunafa croustillant, pistache.", price: "85 MAD", cat: "desserts", signature: true, img: kunafaImg },
  { name: "Tiramisu Maison", desc: "Mascarpone, café espresso, biscuits imbibés.", price: "65 MAD", cat: "desserts" },
  { name: "Pain Perdu Brioché", desc: "Brioche dorée, glace vanille, caramel beurre salé.", price: "70 MAD", cat: "desserts" },

  { name: "Mint Tea Premium", desc: "Thé vert gunpowder, menthe fraîche du jardin.", price: "30 MAD", cat: "drinks" },
  { name: "Cappuccino", desc: "Café de spécialité, lait micro-moussé.", price: "28 MAD", cat: "drinks" },
  { name: "Jus Pressé du Jour", desc: "Orange, grenade, ou betterave-pomme-gingembre.", price: "35 MAD", cat: "drinks" },
  { name: "Matcha Latte", desc: "Matcha cérémonial, lait d'amande.", price: "45 MAD", cat: "drinks" },
];

const categories = ["all", "brunch", "savory", "desserts", "drinks"] as const;

function MenuPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<(typeof categories)[number]>("all");

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.cat === active)),
    [active],
  );

  const catLabel = (c: (typeof categories)[number]) => {
    if (c === "all") return "Tout";
    return t(`menu.cat.${c}` as const);
  };

  const visibleCats = active === "all"
    ? (["brunch", "savory", "desserts", "drinks"] as const)
    : ([active] as const);

  return (
    <div className="py-16 md:py-24">
      <div className="container-rosanne">
        <header className="max-w-2xl">
          <div className="eyebrow">Carte</div>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{t("menu.title")}</h1>
          <p className="mt-4 text-muted-foreground">{t("menu.lead")}</p>
        </header>

        <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-4 sticky top-16 md:top-20 bg-background/90 backdrop-blur z-30">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground/80 border border-border hover:border-foreground"
              }`}
            >
              {catLabel(c)}
            </button>
          ))}
        </div>

        {visibleCats.map((cat) => {
          const catItems = filtered.filter((i) => i.cat === cat);
          if (catItems.length === 0) return null;
          return (
            <section key={cat} aria-labelledby={`cat-${cat}`} className="mt-12">
              <h2 id={`cat-${cat}`} className="font-display text-3xl md:text-4xl mb-6">
                {catLabel(cat)}
              </h2>
              <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                {catItems.map((it) => (
                  <article
                    key={it.name}
                    className="flex gap-5 pb-7 border-b border-dashed border-border last:border-0"
                  >
                    {it.img && (
                      <div className="hidden sm:block h-24 w-24 shrink-0 rounded-xl overflow-hidden">
                        <img
                          src={it.img}
                          alt={it.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-xl leading-tight">
                          {it.name}
                          {it.signature && (
                            <span className="ml-2 align-middle inline-block text-[10px] uppercase tracking-[0.16em] text-gold border border-gold/40 rounded-full px-2 py-0.5">
                              {t("menu.signature")}
                            </span>
                          )}
                        </h3>
                        <span className="text-sm font-medium whitespace-nowrap">{it.price}</span>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {it.desc}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

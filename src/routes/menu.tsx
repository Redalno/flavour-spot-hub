import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Rosanne · Brunch & Café Casablanca" },
      {
        name: "description",
        content:
          "La carte complète de Rosanne : petits-déjeuners, brunchs, cuisine marocaine et internationale, pizze, pâtes, burgers, desserts et boissons.",
      },
      { property: "og:title", content: "Menu — Rosanne" },
      {
        property: "og:description",
        content:
          "Petits-déjeuners, brunchs, cuisine marocaine, pizze, pâtes, burgers, desserts et boissons chez Rosanne — Bd Ghandi, Casablanca.",
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
            { "@type": "MenuSection", name: "Petits-déjeuners" },
            { "@type": "MenuSection", name: "Brunchs" },
            { "@type": "MenuSection", name: "À la carte" },
            { "@type": "MenuSection", name: "Entrées" },
            { "@type": "MenuSection", name: "Cuisine internationale" },
            { "@type": "MenuSection", name: "Cuisine marocaine" },
            { "@type": "MenuSection", name: "Pizze" },
            { "@type": "MenuSection", name: "Pâtes" },
            { "@type": "MenuSection", name: "Burgers" },
            { "@type": "MenuSection", name: "Desserts" },
            { "@type": "MenuSection", name: "Boissons" },
          ],
        }),
      },
    ],
  }),
  component: MenuPage,
});

type Item = { name: string; price?: number | string; description?: string };
type Subsection = { title: string; items: Item[] };
type Supplement = { name: string; price: number };
type Section = {
  id: string;
  title: string;
  group: "food" | "drinks";
  note?: string;
  items?: Item[];
  subsections?: Subsection[];
  supplements?: Supplement[] | { ramequins?: Supplement[]; boissons?: Supplement[] };
};

const sections: Section[] = [
  {
    id: "petits-dejeuners",
    title: "Petits-déjeuners",
    group: "food",
    note:
      "Servis chaque jour de 07h00 à 11h30. Formules non modifiables. Boissons chaudes comprises (Espresso, Macchiato, Americano, Café crème, Thé à la menthe, Cappuccino, Lait chaud, Chocolat au lait, Verveine fraîche). Supplément 10 dhs pour Nespresso ou Tchaba.",
    items: [
      { name: "La Pizza Marocaine", price: 45, description: "Pain grillé à l'origan, jben, olives, huile d'olive. Boisson chaude et jus d'orange, de carotte ou bouteille d'eau." },
      { name: "L'Express", price: 45, description: "Grande viennoiserie (selon disponibilité), deux ficelles de pain grillé, confiture et jben. Boisson chaude et jus d'orange, de carotte ou bouteille d'eau." },
      { name: "Le Cheezy Réveil", price: 55, description: "Croque-Monsieur fromage, jambon, sauce béchamel. Boisson chaude et jus d'orange, de carotte ou bouteille d'eau." },
      { name: "La Gourmandise Berbère", price: 60, description: "Assortiment marocain : harcha sucrée et salée, msemen, beghrir, miel, confiture, jben. Boisson chaude et jus d'orange, de carotte ou bouteille d'eau." },
      { name: "Le Délice du Maroc", price: 65, description: "Trois œufs au khlii, corbeille de pain. Boisson chaude et jus d'orange, de carotte ou bouteille d'eau." },
      { name: "Le Champi Fromage", price: 65, description: "Trois œufs en omelette, champignons, fromage. Boisson chaude et jus d'orange, de carotte ou bouteille d'eau." },
      { name: "Morning Shakshuka", price: 70, description: "Tomate, oignons, poivrons, œufs, feta. Concombres, tomates, pain. Boisson chaude et jus d'orange, de carotte ou bouteille d'eau." },
      { name: "Le Matin Méditerranéen", price: 70, description: "Deux ficelles de pain grillé, tomates concassées au persil et à l'ail, gaspacho à l'huile d'olive et origan, tranches de fromage. Boisson chaude et jus d'orange, de carotte ou bouteille d'eau." },
    ],
  },
  {
    id: "brunchs",
    title: "Brunchs",
    group: "food",
    note: "Servis tous les jours, toute la journée. Formules non modifiables.",
    items: [
      { name: "Crosswich César", price: 100, description: "Croissant garni de poulet, œuf dur, parmesan, laitue, tomates, sauce César. 3 croquettes fromage-pomme de terre. Crêpes au Nutella. Bol de yaourt au granola maison. Boisson chaude, jus et bouteille d'eau." },
      { name: "L'Américain", price: 120, description: "3 mini burgers, œufs brouillés, saucisses de volaille, pommes nouvelles, champignons sautés. Croquettes, crêpes Nutella, yaourt-granola. Boisson chaude, jus, eau." },
      { name: "Avo & Smoked Salmon Crosswich", price: 120, description: "Croissant garni de saumon fumé, avocat, cream cheese à la mangue. Œufs brouillés, croquettes, crêpes Nutella, yaourt-granola. Boisson chaude, jus, eau." },
      { name: "La Brioche Saumon Avocad'oh !", price: 120, description: "Deux brioches perdues salées au fromage frais, avocat et mangue : saumon fumé / œufs brouillés. Mesclun, croquettes, crêpes Nutella, yaourt-granola. Boisson chaude, jus, eau." },
      { name: "Le Norvégien", price: 120, description: "Quatre tartines au fromage frais, avocat et mangue : œufs au plat / avocat-saumon fumé. Croquettes, sauce hollandaise, mesclun. Crêpes Nutella, yaourt-granola. Boisson chaude, jus, eau." },
      { name: "La Fat Crispy Bomb Brioche", price: 120, description: "Deux brioches perdues salées : poulet crispy, mayo-sriracha, cheddar fondu / œufs brouillés. Croquettes, mesclun. Crêpes Nutella, yaourt-granola. Boisson chaude, jus, eau." },
      { name: "Le Beldi", price: 125, description: "Trois œufs au khlii, harcha salée et sucrée, beghrir, msemen, confiture, jbene, praliné maison, mkila de sfenj (week-end) ou crêpes Nutella. Boisson chaude, jus, eau." },
    ],
    supplements: {
      ramequins: [
        { name: "Edam", price: 10 },
        { name: "Parmesan", price: 15 },
        { name: "Nutella", price: 15 },
        { name: "Praliné maison", price: 15 },
      ],
      boissons: [
        { name: "Nespresso", price: 10 },
        { name: "Tchaba", price: 10 },
        { name: "Lait", price: 9 },
      ],
    },
  },
  {
    id: "a-la-carte",
    title: "À la carte",
    group: "food",
    note: "Chaque jour de 07h00 à 17h00.",
    items: [
      { name: "Une grande viennoiserie", price: 18 },
      { name: "Duo de grandes viennoiseries", price: 35 },
      { name: "Trois œufs au plat & mesclun de salade", price: 40 },
      { name: "Trois œufs brouillés ou omelette nature", price: 40 },
      { name: "Quartet marocain", price: 40, description: "Msemen, harcha, beghrir, galette, jbene et miel." },
      { name: "Croque-Monsieur", price: 45, description: "Fromage, jambon, sauce béchamel." },
      { name: "Trois œufs au khlii", price: 50 },
      { name: "Omelette au fromage", price: 50 },
      { name: "Omelette fromage & jambon", price: 55 },
      { name: "Omelette champignons & fromage", price: 55 },
      { name: "Trio de mini burgers", price: 70 },
    ],
  },
  {
    id: "entrees-froides",
    title: "Entrées froides",
    group: "food",
    items: [
      { name: "Antipasti — carnaval de légumes grillés", price: 70, description: "Laitue, aubergine, courgette, poivron, champignons, tomates cerises, feta, sauce pesto." },
      { name: "La Niçoise", price: 70, description: "Laitue, pommes de terre, carottes, thon, chou, maïs, concombre, haricots verts, œuf, tomates cerises, poivrons, vinaigrette." },
      { name: "La César Poulet", price: 75, description: "Romaine, poulet pané, croûtons, œuf, parmesan, tomates cerises, roquette, sauce César." },
      { name: "La Quinoa", price: 110, description: "Quinoa, saumon fumé, mangue, avocat, feta, tomates cerises, sauce à l'orange et à la mangue." },
    ],
  },
  {
    id: "entrees-chaudes",
    title: "Entrées chaudes",
    group: "food",
    items: [
      { name: "Croquettes pomme de terre-mozza", price: 60 },
      { name: "Poulet frit à la sauce aigre-douce", price: 90 },
      { name: "Gambas pil-pil à l'ail et huile d'olive", price: 95 },
    ],
  },
  {
    id: "cuisine-internationale",
    title: "Cuisine internationale",
    group: "food",
    note: "Plats (hors brochettes de poisson) accompagnés de deux garnitures au choix : légumes sautés, frites, penne sauce blanche ou sauce tomate.",
    items: [
      { name: "Brochettes de poulet", price: 90 },
      { name: "Émincé de poulet, sauce champignons", price: 95 },
      { name: "Schnitzel", price: 95, description: "Escalope de poulet panée à la milanaise, sauce crémeuse au citron." },
      { name: "Chicken Parmigiana", price: 100, description: "Escalope frite et gratinée, sauce tomate, aubergine, mozzarella." },
      { name: "Saumon façon Rosanne", price: 140, description: "Sauce bisque de crustacés, palourdes, moules." },
      { name: "Brochettes de poisson à l'asiatique", price: 170, description: "Deux brochettes de saumon, deux brochettes de gambas, sauce teriyaki. Riz basmati et légumes croquants sautés." },
      { name: "Entrecôte grillée (250 g)", price: 190, description: "Sauce roquefort, champignons ou poivre." },
    ],
  },
  {
    id: "cuisine-marocaine",
    title: "Cuisine marocaine",
    group: "food",
    items: [
      { name: "Rfissa", price: 85 },
      { name: "Tajine poulet", price: 85, description: "Poulet, deghmira, citron confit, olives, frites." },
      { name: "Tajine KBM", price: 90, description: "Viande hachée, œufs, tomates." },
      { name: "Seffa medfouna sucrée", price: 95, description: "À la cannelle et aux amandes." },
      { name: "Tajine viande & pruneaux", price: 120, description: "Jarret de bœuf sans os, pruneaux, œuf dur." },
    ],
  },
  {
    id: "couscous",
    title: "Couscous du vendredi",
    group: "food",
    note: "Semoule blanche, complète ou belboula.",
    items: [
      { name: "Végé", price: 75 },
      { name: "Poulet", price: 80 },
      { name: "Jarret de bœuf sans os", price: 90 },
    ],
  },
  {
    id: "panozzi",
    title: "Panozzi",
    group: "food",
    note: "Ni pizza, ni panini, ni pain — les trois à la fois. Servis avec frites.",
    items: [
      { name: "Le César Panozzo", price: 85, description: "Laitue, tomates, poulet grillé, œuf, parmesan, sauce César maison." },
      { name: "Le Meatball Panozzo", price: 90, description: "Sauce tomate, boulettes de viande hachée, parmesan, oignon." },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    group: "food",
    note: "Servis avec frites et coleslaw.",
    items: [
      { name: "Le Big Poulet Crispy", price: 90, description: "Filet de poulet pané, laitue, tomate, cheddar, oignon rings, sauce miel-moutarde maison." },
      { name: "Le Big Truffle", price: 90, description: "Steak haché, laitue, tomate, oignons caramélisés, cornichons, cheddar, champignons sautés, mayo truffe maison." },
      { name: "Le Triple Dip Burger", price: 140, description: "Trois moitiés de cheeseburger, oignons caramélisés, frites, sauce signature maison." },
    ],
    supplements: [
      { name: "Légumes sautés", price: 20 },
      { name: "Purée nature", price: 20 },
      { name: "Frites", price: 20 },
    ],
  },
  {
    id: "pizze",
    title: "Pizze",
    group: "food",
    items: [
      { name: "La Marga !", price: 70, description: "Sauce tomate, mozzarella fleur de lait, basilic, origan." },
      { name: "La Végé", price: 70, description: "Sauce tomate, mozzarella, aubergines, courgettes, poivrons, champignons, tomates, origan." },
      { name: "La Thon-Délice", price: 75, description: "Sauce tomate, mozzarella, thon, oignons, olives noires, origan." },
      { name: "La Poulet-Shroom", price: 90, description: "Sauce blanche, mozzarella, poulet, champignons frais, parmesan, origan." },
      { name: "La Bolo", price: 90, description: "Sauce tomate, mozzarella, viande hachée, champignons, parmesan, olives noires, origan." },
      { name: "La Carbonara", price: 90, description: "Sauce blanche, mozzarella, jambon de dinde, œuf, parmesan, origan." },
      { name: "La Pepperoni", price: 95, description: "Sauce tomate, mozzarella, pepperoni, olives noires, origan." },
      { name: "L'Océane", price: 120, description: "Sauce tomate, mozzarella, gambas, calamars, palourdes, moules, champignons, origan." },
      { name: "La Salmone", price: 130, description: "Sauce blanche, mozzarella, saumon fumé, fromage frais, aneth, zeste de citron." },
    ],
    supplements: [
      { name: "Edam", price: 10 },
      { name: "Parmesan", price: 15 },
    ],
  },
  {
    id: "pates",
    title: "Pâtes",
    group: "food",
    note: "Penne, spaghetti ou tagliatelle — au choix.",
    items: [
      { name: "Poulet Champi", price: 90, description: "Sauce blanche, poulet, champignons, crème de champignons, parmesan." },
      { name: "Carbonara à la crème", price: 90, description: "Sauce blanche, jambon, oignons, parmesan." },
      { name: "À la bolognaise", price: 90, description: "Sauce bolognese, viande hachée, basilic, parmesan." },
      { name: "Fruits de mer", price: 110, description: "Gambas, calamars, moules, tomates cerises. Sauce tomate à la crème ou sauce blanche." },
      { name: "Saumon", price: 120, description: "Saumon fumé. Sauce tomate à la crème ou sauce blanche." },
    ],
  },
  {
    id: "kids",
    title: "Pour les kids !",
    group: "food",
    note: "Réservé aux gourmands de moins de 10 ans.",
    items: [
      { name: "Le Crousti-Poulet", price: 65, description: "Chicken fingers, frites." },
      { name: "Le P'tit Trio", price: 70, description: "Trois mini-burgers : viande hachée, cheddar, laitue, sauce rose. Frites." },
    ],
  },
  {
    id: "gaufres",
    title: "Gaufres de Liège",
    group: "food",
    items: [
      { name: "Chantilly Nutella noisettes", price: 50 },
      { name: "Chantilly caramel & noix", price: 50 },
      { name: "Chantilly, coulis de fruits rouges", price: 55 },
    ],
  },
  {
    id: "crepes",
    title: "Crêpes",
    group: "food",
    subsections: [
      {
        title: "Salées",
        items: [
          { name: "La Deli", price: 70, description: "Jambon, fromage, œuf, laitue, tomates." },
          { name: "La Tuna", price: 75, description: "Thon, œuf, fromage, laitue, tomates." },
          { name: "La Fermière", price: 75, description: "Poulet, œuf, fromage, laitue, tomates." },
        ],
      },
      {
        title: "Sucrées",
        items: [
          { name: "Sucre", price: 30 },
          { name: "Miel", price: 35 },
          { name: "Coulis de fruits rouges maison", price: 45 },
          { name: "Nutella", price: 45 },
          { name: "Caramel beurre salé", price: 45 },
        ],
      },
    ],
  },
  {
    id: "douceurs",
    title: "Douceurs de la maison",
    group: "food",
    note: "Sweet Corner : choix parmi les pâtisseries du jour. Tous nos gâteaux en vitrine sont faits sur place, chaque jour, par nos pâtissiers.",
    items: [
      { name: "Mi-cuit au chocolat", price: 70, description: "Boule de glace vanille et coulis de caramel beurre salé." },
      { name: "Fudgy Brownie Bomb", price: 70, description: "Brownie, Nutella, boule de glace vanille." },
      { name: "Brioche perdue maison", price: 70, description: "Boule de glace vanille et caramel beurre salé." },
    ],
  },
  {
    id: "boissons-chaudes",
    title: "Boissons chaudes",
    group: "drinks",
    items: [
      { name: "Espresso", price: 20 },
      { name: "Espresso Macchiato", price: 26 },
      { name: "Lait chaud", price: 20 },
      { name: "Café Americano", price: 25 },
      { name: "Café crème", price: 30 },
      { name: "Cappuccino", price: 30 },
      { name: "Capsules Nespresso", price: 30, description: "Demandez la gamme à votre serveur." },
      { name: "Latte caramel salé", price: 40 },
      { name: "Spanish Latte", price: 40 },
      { name: "Nutella Latte", price: 40 },
      { name: "Affogato Italiano", price: 55, description: "Glace vanille noyée dans un espresso chaud." },
    ],
  },
  {
    id: "mocha-chaud",
    title: "Mocha chaud",
    group: "drinks",
    items: [
      { name: "Mocha blanc", price: 40 },
      { name: "Mocha au lait", price: 40 },
      { name: "Mocha aromatisé", price: 45, description: "Vanille ou caramel." },
    ],
  },
  {
    id: "boissons-glacees",
    title: "Boissons glacées",
    group: "drinks",
    items: [
      { name: "Café Americano glacé", price: 30 },
      { name: "Café Latte glacé", price: 35 },
      { name: "Café Mocha glacé", price: 45 },
      { name: "Caramel salé glacé", price: 45 },
      { name: "Nutella Latte glacé", price: 45 },
      { name: "Spanish Latte glacé", price: 45 },
      { name: "Chocolat glacé", price: 45 },
    ],
  },
  {
    id: "chocolat-chaud",
    title: "Chocolat chaud",
    group: "drinks",
    items: [
      { name: "Chocolat au lait", price: 30 },
      { name: "Chocolat viennois chantilly", price: 45 },
      { name: "Chocolat aromatisé", price: 45, description: "Vanille ou caramel." },
    ],
  },
  {
    id: "supplements-boissons",
    title: "Suppléments boissons",
    group: "drinks",
    note: "Alternative au sucre : cuillère de miel emballée. Miel pur 6 dhs · Miel gingembre & graines de nigelle 6 dhs.",
    items: [
      { name: "Sirop", price: 10 },
      { name: "Coulis chocolat", price: 10 },
      { name: "Coulis caramel", price: 10 },
      { name: "Café", price: 10 },
      { name: "Purée de fraise", price: 10 },
    ],
  },
  {
    id: "ice-tea",
    title: "Ice Tea",
    group: "drinks",
    note: "Précisez vos préférences concernant le citron à votre serveur.",
    items: [
      { name: "Pêche acidulée", price: 50 },
      { name: "Fusion Hibiscus", price: 50, description: "Hibiscus, canneberge, citron." },
    ],
  },
  {
    id: "thes",
    title: "Thés & infusions",
    group: "drinks",
    items: [
      { name: "Thé à la menthe", price: 25 },
      { name: "Infusion verveine fraîche — base eau", price: 25 },
      { name: "Infusion verveine fraîche — base lait", price: 25 },
      { name: "Thé aux herbes", price: 25, description: "Verveine, zaatar." },
      { name: "Infusion Tchaba", price: 30, description: "Demandez la gamme à votre serveur." },
    ],
  },
  {
    id: "virgin-mojito",
    title: "Virgin Mojito",
    group: "drinks",
    items: [
      { name: "Classique", price: 50 },
      { name: "Fraise", price: 55 },
      { name: "Fruit de la passion", price: 55 },
    ],
  },
  {
    id: "eau",
    title: "Eau",
    group: "drinks",
    items: [
      { name: "Sidi Ali — 1,5 L", price: 30 },
      { name: "Sidi Ali — 50 cl", price: 15 },
      { name: "Oulmès — 50 cl", price: 20 },
    ],
  },
  {
    id: "sodas",
    title: "Boissons gazeuses",
    group: "drinks",
    items: [
      { name: "Sodas", price: 20, description: "Coca-Cola, Coca Zéro, Sprite, Sprite Zéro, Orangina, Orangina Zéro, Schweppes Citron, Schweppes Tonic, Hawaï Tropical, Pom's." },
    ],
  },
  {
    id: "refreshers",
    title: "Refreshers",
    group: "drinks",
    note: "Au sirop.",
    items: [
      { name: "Passion Paradise", price: 45, description: "Fruit de la passion, base eau." },
      { name: "Fraîcheur Tropicale", price: 45, description: "Fraise, menthe, citron." },
      { name: "Zeste Passionné", price: 45, description: "Citron, fruit de la passion." },
      { name: "Tango Exotique", price: 45, description: "Citron, fraise, fruit de la passion." },
      { name: "Sunny Pineapple", price: 45, description: "Ananas, orange, citron, menthe." },
      { name: "Piña Colada", price: 50, description: "Ananas, noix de coco." },
    ],
  },
  {
    id: "jus",
    title: "Jus naturels — sans sucre ajouté",
    group: "drinks",
    items: [
      { name: "Carotte", price: 40 },
      { name: "Orange", price: 40 },
      { name: "Médina en verre", price: 50, description: "Jus d'orange et boule de glace vanille." },
      { name: "Selon saison", price: 55, description: "Banane, mangue, avocat, fraise, etc." },
      { name: "Berry Blast", price: 60, description: "Framboise, fraise, orange, citron." },
      { name: "Fruity Splash", price: 60, description: "Banane, fraise, orange, citron." },
      { name: "Sunrise Verde", price: 60, description: "Orange, mangue, épinards." },
      { name: "Green Bliss", price: 60, description: "Concombre, pomme, citron, orange, menthe." },
    ],
  },
  {
    id: "milkshakes",
    title: "Milkshakes à la glace",
    group: "drinks",
    items: [
      { name: "Vanille chantilly", price: 70 },
      { name: "Fraise chantilly", price: 70 },
    ],
  },
];

const filters = [
  { id: "all", label: "Tout" },
  { id: "brunch", label: "Brunch & Petit-déj" },
  { id: "food", label: "Cuisine" },
  { id: "drinks", label: "Boissons" },
] as const;

function priceLabel(p?: number | string) {
  if (p === undefined) return "";
  return typeof p === "number" ? `${p} MAD` : p;
}

function ItemRow({ it }: { it: Item }) {
  return (
    <article className="flex gap-5 pb-7 border-b border-dashed border-border last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl leading-tight">{it.name}</h3>
          {it.price !== undefined && (
            <span className="text-sm font-medium whitespace-nowrap">{priceLabel(it.price)}</span>
          )}
        </div>
        {it.description && (
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{it.description}</p>
        )}
      </div>
    </article>
  );
}

function MenuPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");

  const visible = useMemo(() => {
    if (active === "all") return sections;
    if (active === "brunch") return sections.filter((s) => s.id === "petits-dejeuners" || s.id === "brunchs");
    return sections.filter((s) => s.group === active);
  }, [active]);

  return (
    <div className="py-16 md:py-24">
      <div className="container-rosanne">
        <header className="max-w-2xl">
          <div className="eyebrow">Carte</div>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{t("menu.title")}</h1>
          <p className="mt-4 text-muted-foreground">
            Prix en MAD · Brunchs servis toute la journée · Petits-déjeuners 7h–11h30.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-4 sticky top-16 md:top-20 bg-background/90 backdrop-blur z-30">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground/80 border border-border hover:border-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {visible.map((sec) => (
          <section key={sec.id} aria-labelledby={`sec-${sec.id}`} className="mt-14">
            <h2 id={`sec-${sec.id}`} className="font-display text-3xl md:text-4xl">
              {sec.title}
            </h2>
            {sec.note && (
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed italic">
                {sec.note}
              </p>
            )}

            {sec.items && (
              <div className="mt-6 grid gap-x-12 gap-y-8 md:grid-cols-2">
                {sec.items.map((it) => (
                  <ItemRow key={it.name} it={it} />
                ))}
              </div>
            )}

            {sec.subsections?.map((sub) => (
              <div key={sub.title} className="mt-8">
                <h3 className="font-display text-xl mb-4 uppercase tracking-[0.18em] text-gold">
                  {sub.title}
                </h3>
                <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                  {sub.items.map((it) => (
                    <ItemRow key={it.name} it={it} />
                  ))}
                </div>
              </div>
            ))}

            {sec.supplements && Array.isArray(sec.supplements) && (
              <div className="mt-8 rounded-2xl border border-border bg-card/40 p-5">
                <div className="eyebrow mb-3">Suppléments</div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {sec.supplements.map((s) => (
                    <span key={s.name} className="text-foreground/80">
                      {s.name} <span className="text-muted-foreground">· {s.price} MAD</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sec.supplements && !Array.isArray(sec.supplements) && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {sec.supplements.ramequins && (
                  <div className="rounded-2xl border border-border bg-card/40 p-5">
                    <div className="eyebrow mb-3">Ramequins</div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      {sec.supplements.ramequins.map((s) => (
                        <span key={s.name} className="text-foreground/80">
                          {s.name} <span className="text-muted-foreground">· {s.price} MAD</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {sec.supplements.boissons && (
                  <div className="rounded-2xl border border-border bg-card/40 p-5">
                    <div className="eyebrow mb-3">Boissons</div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      {sec.supplements.boissons.map((s) => (
                        <span key={s.name} className="text-foreground/80">
                          {s.name} <span className="text-muted-foreground">· {s.price} MAD</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

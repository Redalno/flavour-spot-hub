import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Calendar, Clock, Users, Phone, Mail, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Réserver une table — Rosanne · Casablanca" },
      {
        name: "description",
        content:
          "Réservez votre table chez Rosanne, Bd Ghandi à Casablanca. Brunch, déjeuner, dîner — confirmation par notre équipe.",
      },
      { property: "og:title", content: "Réserver une table — Rosanne" },
      {
        property: "og:description",
        content: "Réservez en ligne votre table chez Rosanne, Casablanca.",
      },
      { property: "og:url", content: "https://flavour-spot-hub.lovable.app/reservations" },
    ],
    links: [{ rel: "canonical", href: "https://flavour-spot-hub.lovable.app/reservations" }],
  }),
  component: ReservationPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(5, "Téléphone requis").max(30),
  reservation_date: z.string().min(1, "Date requise"),
  reservation_time: z.string().min(1, "Heure requise"),
  guests: z.number().int().min(1).max(30),
  special_request: z.string().max(1000).optional(),
});

const today = new Date().toISOString().split("T")[0];

function ReservationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reservation_date: "",
    reservation_time: "19:30",
    guests: 2,
    special_request: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("reservations").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        reservation_date: parsed.data.reservation_date,
        reservation_time: parsed.data.reservation_time,
        guests: parsed.data.guests,
        special_request: parsed.data.special_request || null,
      });
      if (error) throw error;
      toast.success("Demande envoyée ! Notre équipe vous confirme rapidement.");
      setForm({
        name: "",
        email: "",
        phone: "",
        reservation_date: "",
        reservation_time: "19:30",
        guests: 2,
        special_request: "",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  const input = "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

  return (
    <section className="container-rosanne py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Rosanne</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Réserver une table</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Envoyez votre demande, notre équipe vous confirme par téléphone sous 24h.
          </p>
        </header>

        <form onSubmit={onSubmit} className="mt-10 space-y-5 rounded-2xl border border-border/60 bg-card p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Nom</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Téléphone</label>
              <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Date</label>
              <input
                required
                type="date"
                min={today}
                value={form.reservation_date}
                onChange={(e) => setForm({ ...form, reservation_date: e.target.value })}
                className={input}
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Heure</label>
              <input
                required
                type="time"
                value={form.reservation_time}
                onChange={(e) => setForm({ ...form, reservation_time: e.target.value })}
                className={input}
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Personnes</label>
              <input
                required
                type="number"
                min={1}
                max={30}
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                className={input}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Demande particulière (facultatif)</label>
            <textarea
              rows={3}
              maxLength={1000}
              value={form.special_request}
              onChange={(e) => setForm({ ...form, special_request: e.target.value })}
              className={input}
              placeholder="Allergies, anniversaire, table en terrasse..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer la demande"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Pour les groupes de plus de 10 personnes, contactez-nous directement au 07 08 13 90 13.
          </p>
        </form>
      </div>
    </section>
  );
}

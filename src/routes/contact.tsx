import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { Phone, MapPin, Clock, Instagram } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageProvider";
import { submitInquiry } from "@/lib/contact.functions";

const searchSchema = z.object({
  type: z.enum(["general", "reservation", "event"]).optional(),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rosanne · Bd Ghandi, Casablanca" },
      {
        name: "description",
        content:
          "Contactez Rosanne pour une réservation, une privatisation ou une question. Bd Ghandi, Casablanca · 07 08 13 90 13.",
      },
      { property: "og:title", content: "Contact — Rosanne" },
      {
        property: "og:description",
        content:
          "Réservez votre table ou organisez votre événement chez Rosanne, Bd Ghandi à Casablanca. Téléphone, formulaire et horaires.",
      },
      { property: "og:url", content: "https://flavour-spot-hub.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://flavour-spot-hub.lovable.app/contact" }],
  }),
  validateSearch: searchSchema,
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();
  const { type: prefillType } = Route.useSearch();
  const submit = useServerFn(submitInquiry);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry_type: (prefillType ?? "general") as "general" | "reservation" | "event",
    guests: "",
    event_date: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submit({
        data: {
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          inquiry_type: form.inquiry_type,
          guests: form.guests ? Number(form.guests) : null,
          event_date: form.event_date || "",
          message: form.message,
        },
      });
      if (res.ok) {
        toast.success(t("form.success"));
        setForm({
          name: "",
          email: "",
          phone: "",
          inquiry_type: "general",
          guests: "",
          event_date: "",
          message: "",
        });
      } else {
        toast.error(t("form.error"));
      }
    } catch (err) {
      console.error(err);
      toast.error(t("form.error"));
    } finally {
      setLoading(false);
    }
  };

  const showEventFields = form.inquiry_type === "event" || form.inquiry_type === "reservation";

  return (
    <div className="py-16 md:py-24">
      <div className="container-rosanne">
        <header className="max-w-2xl">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{t("contact.title")}</h1>
          <p className="mt-4 text-muted-foreground text-lg">{t("contact.lead")}</p>
        </header>

        <div className="mt-12 grid lg:grid-cols-5 gap-10">
          {/* Info card */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-card border border-border p-7">
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-gold" />
                  <div>
                    <div className="text-sm font-medium">Adresse</div>
                    <div className="text-sm text-muted-foreground">{t("contact.address")}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 text-gold" />
                  <div>
                    <div className="text-sm font-medium">Téléphone</div>
                    <a
                      href="tel:+212708139013"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {t("contact.phone")}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-gold" />
                  <div>
                    <div className="text-sm font-medium">Horaires</div>
                    <div className="text-sm text-muted-foreground">{t("contact.hours")}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Instagram className="h-5 w-5 mt-0.5 text-gold" />
                  <div>
                    <div className="text-sm font-medium">Instagram</div>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      @rosanne.casa
                    </a>
                  </div>
                </li>
              </ul>
              <a
                href="tel:+212708139013"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Phone className="h-4 w-4 mr-2" /> {t("contact.phone")}
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border h-64">
              <iframe
                title="Rosanne map"
                src="https://www.google.com/maps?q=Bd+Ghandi,+Casablanca&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </aside>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-2xl bg-card border border-border p-7 md:p-10 space-y-5"
          >
            <Field label={t("form.type")}>
              <select
                value={form.inquiry_type}
                onChange={(e) => set("inquiry_type", e.target.value as typeof form.inquiry_type)}
                className="rosanne-input"
              >
                <option value="general">{t("form.type.general")}</option>
                <option value="reservation">{t("form.type.reservation")}</option>
                <option value="event">{t("form.type.event")}</option>
              </select>
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label={t("form.name")} required>
                <input
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="rosanne-input"
                />
              </Field>
              <Field label={t("form.email")} required>
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="rosanne-input"
                />
              </Field>
            </div>

            <Field label={t("form.phone")}>
              <input
                type="tel"
                maxLength={40}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="rosanne-input"
              />
            </Field>

            {showEventFields && (
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t("form.guests")}>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={form.guests}
                    onChange={(e) => set("guests", e.target.value)}
                    className="rosanne-input"
                  />
                </Field>
                <Field label={t("form.date")}>
                  <input
                    type="date"
                    value={form.event_date}
                    onChange={(e) => set("event_date", e.target.value)}
                    className="rosanne-input"
                  />
                </Field>
              </div>
            )}

            <Field label={t("form.message")} required>
              <textarea
                required
                maxLength={2000}
                rows={5}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className="rosanne-input resize-none"
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? t("form.submitting") : t("form.submit")}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .rosanne-input {
          width: 100%;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 0.65rem;
          padding: 0.65rem 0.9rem;
          font-size: 0.9rem;
          color: var(--color-foreground);
          transition: border-color .15s, box-shadow .15s;
        }
        .rosanne-input:focus {
          outline: none;
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-gold) 25%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-1.5">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

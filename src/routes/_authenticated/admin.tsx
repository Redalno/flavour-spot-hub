import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { LogOut, RefreshCw, Check, X, Clock, Users, Phone, Mail, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  special_request: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
};

type Filter = "all" | "pending" | "confirmed" | "cancelled";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard manager — Rosanne" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("pending");
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: true })
      .order("reservation_time", { ascending: true });
    if (error) {
      if (error.code === "PGRST301" || error.message.toLowerCase().includes("permission")) {
        setHasAccess(false);
      } else {
        toast.error(error.message);
      }
    } else {
      setHasAccess(true);
      setRows((data ?? []) as Reservation[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: Reservation["status"]) => {
    const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(status === "confirmed" ? "Confirmée" : status === "cancelled" ? "Annulée" : "Mise à jour");
    setRows((s) => s.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer définitivement cette réservation ?")) return;
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRows((s) => s.filter((r) => r.id !== id));
    toast.success("Supprimée");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const visible = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter],
  );

  const counts = useMemo(
    () => ({
      pending: rows.filter((r) => r.status === "pending").length,
      confirmed: rows.filter((r) => r.status === "confirmed").length,
      cancelled: rows.filter((r) => r.status === "cancelled").length,
      all: rows.length,
    }),
    [rows],
  );

  if (hasAccess === false) {
    return (
      <section className="container-rosanne py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="font-display text-2xl">Accès non autorisé</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Votre compte n'a pas encore le rôle <code className="px-1 rounded bg-muted">manager</code>. Demandez à un
            administrateur de vous l'attribuer.
          </p>
          <button onClick={signOut} className="mt-6 rounded-full border border-input px-4 py-2 text-sm hover:bg-accent">
            Se déconnecter
          </button>
        </div>
      </section>
    );
  }

  const filters: { id: Filter; label: string }[] = [
    { id: "pending", label: `En attente (${counts.pending})` },
    { id: "confirmed", label: `Confirmées (${counts.confirmed})` },
    { id: "cancelled", label: `Annulées (${counts.cancelled})` },
    { id: "all", label: `Toutes (${counts.all})` },
  ];

  return (
    <section className="container-rosanne py-10 md:py-14">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">Réservations</h1>
          <p className="text-sm text-muted-foreground mt-1">Gérez les demandes de réservation entrantes.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="inline-flex items-center gap-1.5 rounded-full border border-input px-3 py-1.5 text-sm hover:bg-accent"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Rafraîchir
          </button>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-full border border-input px-3 py-1.5 text-sm hover:bg-accent"
          >
            <LogOut className="h-3.5 w-3.5" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
              filter === f.id ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground">Chargement...</p>
        ) : visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Aucune réservation dans cette catégorie.
          </div>
        ) : (
          visible.map((r) => (
            <article key={r.id} className="rounded-xl border border-border bg-card p-4 md:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl">{r.name}</h3>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {formatDate(r.reservation_date)}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {r.reservation_time.slice(0, 5)}</span>
                    <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {r.guests} pers.</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 hover:text-gold"><Phone className="h-3.5 w-3.5" /> {r.phone}</a>
                    <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1 hover:text-gold"><Mail className="h-3.5 w-3.5" /> {r.email}</a>
                  </div>
                  {r.special_request && (
                    <p className="mt-3 text-sm bg-muted/50 rounded-md p-3 italic">"{r.special_request}"</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {r.status !== "confirmed" && (
                    <button
                      onClick={() => updateStatus(r.id, "confirmed")}
                      className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Check className="h-3 w-3" /> Confirmer
                    </button>
                  )}
                  {r.status !== "cancelled" && (
                    <button
                      onClick={() => updateStatus(r.id, "cancelled")}
                      className="inline-flex items-center gap-1 rounded-full border border-input px-3 py-1.5 text-xs font-medium hover:bg-accent"
                    >
                      <X className="h-3 w-3" /> Annuler
                    </button>
                  )}
                  <button
                    onClick={() => remove(r.id)}
                    className="rounded-full border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: Reservation["status"] }) {
  const map = {
    pending: { label: "En attente", cls: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200" },
    confirmed: { label: "Confirmée", cls: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200" },
    cancelled: { label: "Annulée", cls: "bg-rose-100 text-rose-900 dark:bg-rose-900/30 dark:text-rose-200" },
  } as const;
  const { label, cls } = map[status];
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${cls}`}>{label}</span>;
}

function formatDate(iso: string) {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

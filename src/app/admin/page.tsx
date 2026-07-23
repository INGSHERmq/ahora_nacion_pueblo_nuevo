"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Lead = {
  id: string;
  nombre: string;
  email: string | null;
  telefono: string | null;
  mensaje: string | null;
  created_at: string;
};

type Proposal = {
  id: string;
  nombre: string | null;
  localidad: string;
  tipo: "propuesta" | "problematica";
  descripcion: string;
  email: string | null;
  created_at: string;
};

export default function AdminPage() {
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [visitCount, setVisitCount] = useState<number | null>(null);

  const loadDashboard = useCallback(async () => {
    const { data: adminCheck } = await supabase.rpc("is_admin");

    if (!adminCheck) {
      setIsAdmin(false);
      setLeads([]);
      setProposals([]);
      return;
    }

    setIsAdmin(true);

    const [
      { data: leadsData },
      { data: proposalsData },
      { data: statsData },
      { data: countData },
    ] = await Promise.all([
      supabase.from("manada_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("citizen_proposals").select("*").order("created_at", { ascending: false }),
      supabase.from("site_stats").select("total_visits, updated_at").eq("id", 1).maybeSingle(),
      supabase.rpc("get_visit_count"),
    ]);

    setLeads(leadsData ?? []);
    setProposals(proposalsData ?? []);
    setVisitCount(statsData?.total_visits ?? countData ?? 0);
  }, [supabase]);

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsAuthenticated(!!user);
      if (user) {
        await loadDashboard();
      }
      setLoading(false);
    }

    init();
  }, [loadDashboard, supabase.auth]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAuthError("Credenciales inválidas. Verifica tu correo y contraseña.");
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);
    await loadDashboard();
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setLeads([]);
    setProposals([]);
    setVisitCount(null);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
        <p className="text-neutral-600">Cargando panel...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4">
        <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
          <Link href="/" className="text-sm font-medium text-[#D72638] hover:underline">
            ← Volver al sitio
          </Link>
          <h1 className="mt-4 font-heading text-3xl text-[#D72638]">Panel administrador</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Acceso restringido. Solo usuarios autorizados pueden ingresar.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Correo</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Contraseña</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
              />
            </label>
            {authError ? <p className="text-sm text-red-600">{authError}</p> : null}
            <button
              type="submit"
              className="w-full rounded-full bg-[#D72638] px-6 py-3 text-sm font-semibold text-white hover:bg-[#b91c2c]"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4">
        <div className="max-w-md rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-xl">
          <h1 className="font-heading text-2xl text-[#D72638]">Acceso denegado</h1>
          <p className="mt-3 text-neutral-600">
            Tu cuenta no está autorizada como administrador. Contacta al equipo técnico.
          </p>
          <button
            onClick={handleLogout}
            className="mt-6 rounded-full bg-neutral-900 px-6 py-2 text-sm font-semibold text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-heading text-2xl text-[#D72638]">Administración</h1>
            <p className="text-sm text-neutral-600">Plan de Gobierno · Pueblo Nuevo</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-[#D72638] hover:underline">
              Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-[#D72638] p-6 text-white shadow-lg">
            <p className="text-sm text-white/80">Visitas al sitio</p>
            <p className="mt-2 font-heading text-4xl">{visitCount?.toLocaleString("es-PE") ?? "0"}</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">Personas en la manada</p>
            <p className="mt-2 font-heading text-4xl text-[#D72638]">{leads.length}</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">Propuestas ciudadanas</p>
            <p className="mt-2 font-heading text-4xl text-[#D72638]">{proposals.length}</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">Último registro</p>
            <p className="mt-2 text-lg font-semibold text-neutral-800">
              {leads[0] || proposals[0]
                ? new Date(
                    Math.max(
                      leads[0] ? new Date(leads[0].created_at).getTime() : 0,
                      proposals[0] ? new Date(proposals[0].created_at).getTime() : 0,
                    ),
                  ).toLocaleString("es-PE")
                : "Sin registros"}
            </p>
          </div>
        </div>

        <section className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-6 py-4">
            <h2 className="font-heading text-xl text-[#D72638]">Registros — Únete a la manada</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#FAFAFA] text-neutral-600">
                <tr>
                  <th className="px-6 py-3 font-medium">Nombre</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Teléfono</th>
                  <th className="px-6 py-3 font-medium">Mensaje</th>
                  <th className="px-6 py-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                      Aún no hay registros.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-neutral-100">
                      <td className="px-6 py-4 font-medium text-neutral-800">{lead.nombre}</td>
                      <td className="px-6 py-4 text-neutral-700">{lead.email ?? "—"}</td>
                      <td className="px-6 py-4 text-neutral-700">{lead.telefono ?? "—"}</td>
                      <td className="max-w-xs px-6 py-4 text-neutral-700">{lead.mensaje ?? "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                        {new Date(lead.created_at).toLocaleString("es-PE")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-6 py-4">
            <h2 className="font-heading text-xl text-[#D72638]">
              Propuestas y problemáticas ciudadanas
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#FAFAFA] text-neutral-600">
                <tr>
                  <th className="px-6 py-3 font-medium">Tipo</th>
                  <th className="px-6 py-3 font-medium">Nombre</th>
                  <th className="px-6 py-3 font-medium">Localidad</th>
                  <th className="px-6 py-3 font-medium">Descripción</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {proposals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                      Aún no hay propuestas ciudadanas.
                    </td>
                  </tr>
                ) : (
                  proposals.map((proposal) => (
                    <tr key={proposal.id} className="border-t border-neutral-100">
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            proposal.tipo === "propuesta"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {proposal.tipo === "propuesta" ? "Propuesta" : "Problemática"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-neutral-800">
                        {proposal.nombre ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-neutral-700">{proposal.localidad}</td>
                      <td className="max-w-xs px-6 py-4 text-neutral-700">{proposal.descripcion}</td>
                      <td className="px-6 py-4 text-neutral-700">{proposal.email ?? "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                        {new Date(proposal.created_at).toLocaleString("es-PE")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

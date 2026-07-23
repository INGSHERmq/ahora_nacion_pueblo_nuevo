"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

type PublicProposal = {
  id: string;
  nombre: string | null;
  localidad: string;
  tipo: "propuesta" | "problematica";
  descripcion: string;
};

const BUBBLE_COLORS = [
  "from-[#D72638]/90 to-[#b91c2c]/90",
  "from-[#1e3a5f]/90 to-[#2d5a87]/90",
  "from-[#065f46]/90 to-[#047857]/90",
  "from-[#7c2d12]/90 to-[#c2410c]/90",
  "from-[#581c87]/90 to-[#7e22ce]/90",
];

function truncate(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max).trim()}…`;
}

export function FloatingProposals() {
  const [proposals, setProposals] = useState<PublicProposal[]>([]);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("citizen_proposals")
        .select("id, nombre, localidad, tipo, descripcion")
        .order("created_at", { ascending: false })
        .limit(12);

      setProposals(data ?? []);
    }

    load();

    function onNewProposal() {
      load();
    }

    window.addEventListener("proposal-submitted", onNewProposal);
    return () => window.removeEventListener("proposal-submitted", onNewProposal);
  }, []);

  if (proposals.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-white/60 p-8 text-center">
        <p className="text-neutral-500">
          Sé el primero en enviar una propuesta o problemática de tu localidad.
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-[#FAFAFA] via-white to-[#fff5f5] p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(215,38,56,0.08),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(30,58,95,0.08),transparent_40%)]" />

      <p className="relative mb-4 text-center text-sm font-medium text-neutral-600">
        Voces de la manada — propuestas y problemáticas en tiempo real
      </p>

      <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proposals.map((proposal, index) => {
          const color = BUBBLE_COLORS[index % BUBBLE_COLORS.length];
          const delay = index * 0.15;
          const duration = 3.5 + (index % 3) * 0.5;

          return (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0, 8, 0] }}
              transition={{
                opacity: { duration: 0.5, delay },
                scale: { duration: 0.5, delay },
                y: { duration, repeat: Infinity, ease: "easeInOut", delay },
              }}
              className={`relative rounded-2xl bg-gradient-to-br ${color} p-4 text-white shadow-lg shadow-black/10`}
            >
              <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-white/20 blur-sm" />
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {proposal.tipo === "propuesta" ? "Propuesta" : "Problemática"}
                </span>
                <span className="text-xs text-white/80">{proposal.localidad}</span>
              </div>
              {proposal.nombre ? (
                <p className="mt-2 text-xs font-semibold text-white/90">{proposal.nombre}</p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-white/95">
                &ldquo;{truncate(proposal.descripcion, 120)}&rdquo;
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

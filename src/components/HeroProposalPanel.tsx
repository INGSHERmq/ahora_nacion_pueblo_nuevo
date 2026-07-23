"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { ProposalForm } from "./ProposalForm";

type PublicProposal = {
  id: string;
  nombre: string | null;
  localidad: string;
  tipo: "propuesta" | "problematica";
  descripcion: string;
};

const BUBBLE_POSITIONS = [
  { top: "8%", left: "5%", rotate: -3 },
  { top: "35%", left: "45%", rotate: 2 },
  { top: "55%", left: "10%", rotate: -2 },
  { top: "15%", left: "55%", rotate: 4 },
  { top: "62%", left: "50%", rotate: -4 },
  { top: "78%", left: "25%", rotate: 1 },
];

function truncate(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max).trim()}…`;
}

export function HeroProposalPanel() {
  const [proposals, setProposals] = useState<PublicProposal[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("citizen_proposals")
        .select("id, nombre, localidad, tipo, descripcion")
        .order("created_at", { ascending: false })
        .limit(6);

      setProposals(data ?? []);
    }

    load();
    const onNew = () => load();
    window.addEventListener("proposal-submitted", onNew);
    return () => window.removeEventListener("proposal-submitted", onNew);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  return (
    <>
      <div className="relative flex min-h-[340px] flex-col rounded-3xl border border-white/25 bg-white/10 p-4 backdrop-blur-md sm:min-h-[380px] sm:p-5">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
          Voces de la manada
        </p>

        <div className="relative flex-1 overflow-hidden rounded-2xl">
          {proposals.length === 0 ? (
            <div className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-white/30 p-4 text-center">
              <p className="text-sm text-white/80">
                Sé el primero en compartir una propuesta o problemática de tu localidad.
              </p>
            </div>
          ) : (
            <div className="relative h-full min-h-[220px]">
              {proposals.slice(0, 6).map((proposal, index) => {
                const pos = BUBBLE_POSITIONS[index % BUBBLE_POSITIONS.length]!;
                const delay = index * 0.2;
                const duration = 3 + (index % 3) * 0.6;

                return (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -8, 0, 6, 0],
                      x: [0, 4, 0, -3, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay },
                      scale: { duration: 0.5, delay },
                      y: { duration, repeat: Infinity, ease: "easeInOut", delay },
                      x: { duration: duration + 0.5, repeat: Infinity, ease: "easeInOut", delay },
                    }}
                    style={{
                      top: pos.top,
                      left: pos.left,
                      rotate: pos.rotate,
                    }}
                    className="absolute z-10 max-w-[48%] rounded-2xl border border-white/30 bg-white/95 p-3 shadow-lg shadow-black/10 sm:max-w-[46%] sm:p-3.5"
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                          proposal.tipo === "propuesta"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {proposal.tipo === "propuesta" ? "Propuesta" : "Problemática"}
                      </span>
                      <span className="text-[10px] font-medium text-neutral-500">
                        {proposal.localidad}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-snug text-neutral-800">
                      &ldquo;{truncate(proposal.descripcion, 70)}&rdquo;
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setModalOpen(true)}
          className="mt-4 w-full rounded-full border-2 border-white bg-white px-5 py-3 text-sm font-bold text-[#D72638] shadow-lg transition hover:bg-white/95"
        >
          Agrega tu propuesta o problemática
        </motion.button>
      </div>

      <AnimatePresence>
        {modalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", damping: 22 }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#D72638]">
                    Participación ciudadana
                  </p>
                  <h3 className="font-heading text-2xl text-neutral-900">
                    Tú también puedes ser león o leona
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    Envíanos tu propuesta o problemática. Ayuda a tu localidad.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
              <ProposalForm inModal onSuccess={() => setModalOpen(false)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

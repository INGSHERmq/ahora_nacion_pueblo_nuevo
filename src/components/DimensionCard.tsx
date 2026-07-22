"use client";

import { motion } from "framer-motion";
import type { Dimension } from "@/lib/plan-data";

type DimensionCardProps = {
  dimension: Dimension;
  index: number;
};

export function DimensionCard({ dimension, index }: DimensionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D72638]/10"
    >
      <div className="border-b border-neutral-100 bg-gradient-to-r from-[#D72638] to-[#b91c2c] px-6 py-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
          {dimension.title}
        </p>
        <h3 className="mt-2 font-heading text-2xl sm:text-3xl">{dimension.slogan}</h3>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#D72638]">
            Problemática
          </h4>
          <ul className="mt-3 space-y-2">
            {dimension.problemas.map((item) => (
              <li key={item} className="flex gap-2 text-neutral-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D72638]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-[#FAFAFA] p-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Objetivo
          </h4>
          <p className="mt-2 text-neutral-800">{dimension.objetivo}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#D72638]">
            Propuestas
          </h4>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {dimension.propuestas.map((propuesta, propIndex) => (
              <motion.li
                key={propuesta}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * propIndex }}
                className="rounded-xl border border-neutral-200 bg-white p-4 text-sm leading-relaxed text-neutral-700 transition group-hover:border-[#D72638]/20"
              >
                {propuesta}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

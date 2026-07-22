"use client";

import { motion } from "framer-motion";
import { planMeta } from "@/lib/plan-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#D72638] text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-black blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <p className="mb-4 inline-flex rounded-full border border-white/30 px-4 py-1 text-sm font-medium uppercase tracking-widest">
            {planMeta.location}
          </p>
          <h1 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-7xl">
            {planMeta.title}
          </h1>
          <p className="mt-4 font-heading text-2xl text-white/95 sm:text-3xl">
            {planMeta.subtitle}
          </p>
          <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            {planMeta.tagline}. {planMeta.period}.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#propuestas"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#D72638] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Ver propuestas
            </a>
            <a
              href="#manada"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Únete a la manada
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

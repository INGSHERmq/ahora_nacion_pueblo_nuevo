"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function AnimatedSection({
  id,
  title,
  subtitle,
  children,
  className = "",
}: AnimatedSectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl"
        >
          <h2 className="font-heading text-3xl text-[#D72638] sm:text-4xl">{title}</h2>
          {subtitle ? (
            <p className="mt-4 text-lg leading-relaxed text-neutral-700">{subtitle}</p>
          ) : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

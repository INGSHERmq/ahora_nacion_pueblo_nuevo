"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { VisitorCounter } from "./VisitorCounter";

const navItems = [
  { href: "#presentacion", label: "Presentación" },
  { href: "#ideario", label: "Ideario" },
  { href: "#propuestas", label: "Propuestas" },
  { href: "#manada", label: "Únete" },
];

function GamesButton({ className = "" }: { className?: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      <Link
        href="/juegos"
        className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 px-4 py-2 text-sm font-bold text-neutral-900 shadow-lg shadow-amber-500/40 transition hover:shadow-xl hover:shadow-amber-500/50"
      >
        <motion.span
          className="absolute inset-0 bg-white/30"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        />
        <span className="relative text-base">🎮</span>
        <span className="relative">Juegos</span>
        <motion.span
          className="relative flex h-2 w-2"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
        </motion.span>
      </Link>
    </motion.div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D72638]/10 bg-[#FAFAFA]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 flex-col">
          <span className="font-heading text-lg leading-none text-[#D72638] sm:text-xl">
            Pueblo Nuevo
          </span>
          <span className="truncate text-xs text-neutral-600 sm:text-sm">
            Plan de Gobierno 2027–2030
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 transition hover:text-[#D72638]"
            >
              {item.label}
            </a>
          ))}
          <GamesButton />
          <Link
            href="/admin"
            className="rounded-full border border-[#D72638]/20 px-3 py-1 text-xs font-semibold text-[#D72638] transition hover:bg-[#D72638] hover:text-white"
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <GamesButton className="lg:hidden" />
          <div className="shrink-0 rounded-full bg-[#D72638] px-1 py-1 shadow-lg shadow-[#D72638]/20">
            <VisitorCounter />
          </div>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto border-t border-[#D72638]/10 px-4 py-2 lg:hidden">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

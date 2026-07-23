"use client";

import Link from "next/link";
import { VisitorCounter } from "./VisitorCounter";

const navItems = [
  { href: "#presentacion", label: "Presentación" },
  { href: "#ideario", label: "Ideario" },
  { href: "#propuestas", label: "Propuestas" },
  { href: "#tu-voz", label: "Tu voz" },
  { href: "#manada", label: "Únete" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D72638]/10 bg-[#FAFAFA]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 flex-col">
          <span className="font-heading text-lg leading-none text-[#D72638] sm:text-xl">
            Pueblo Nuevo
          </span>
          <span className="truncate text-xs text-neutral-600 sm:text-sm">
            Plan de Gobierno 2027–2030
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 transition hover:text-[#D72638]"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/admin"
            className="rounded-full border border-[#D72638]/20 px-3 py-1 text-xs font-semibold text-[#D72638] transition hover:bg-[#D72638] hover:text-white"
          >
            Admin
          </Link>
        </nav>

        <div className="shrink-0 rounded-full bg-[#D72638] px-1 py-1 shadow-lg shadow-[#D72638]/20">
          <VisitorCounter />
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto border-t border-[#D72638]/10 px-4 py-2 md:hidden">
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

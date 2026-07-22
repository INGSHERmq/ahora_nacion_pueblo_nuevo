"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { isValidEmail, sanitizeInput } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

export function JoinForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const honeypot = String(formData.get("website") ?? "");

    if (honeypot.trim()) {
      setState("success");
      event.currentTarget.reset();
      return;
    }

    const nombre = sanitizeInput(String(formData.get("nombre") ?? ""), 120);
    const email = sanitizeInput(String(formData.get("email") ?? ""), 254);
    const telefono = sanitizeInput(String(formData.get("telefono") ?? ""), 20);
    const mensaje = sanitizeInput(String(formData.get("mensaje") ?? ""), 1000);

    if (nombre.length < 2) {
      setErrorMessage("Ingresa un nombre válido.");
      setState("error");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Ingresa un correo electrónico válido.");
      setState("error");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.from("manada_leads").insert({
      nombre,
      email,
      telefono: telefono || null,
      mensaje: mensaje || null,
    });

    if (error) {
      setErrorMessage("No pudimos registrar tu solicitud. Intenta nuevamente.");
      setState("error");
      return;
    }

    setState("success");
    event.currentTarget.reset();
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl sm:p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-700">
              Nombre completo *
            </span>
            <input
              required
              name="nombre"
              maxLength={120}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
              placeholder="Tu nombre"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-700">
              Correo electrónico *
            </span>
            <input
              required
              type="email"
              name="email"
              maxLength={254}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
              placeholder="correo@ejemplo.com"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">
            Teléfono / WhatsApp
          </span>
          <input
            name="telefono"
            maxLength={20}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
            placeholder="999 999 999"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">
            ¿Por qué quieres unirte?
          </span>
          <textarea
            name="mensaje"
            rows={4}
            maxLength={1000}
            className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
            placeholder="Cuéntanos cómo quieres apoyar el plan..."
          />
        </label>

        {state === "error" ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
        ) : null}

        {state === "success" ? (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            ¡Gracias por unirte a la manada! Pronto nos pondremos en contacto contigo.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full rounded-full bg-[#D72638] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#b91c2c] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === "loading" ? "Enviando..." : "Quiero unirme"}
        </button>
      </form>
    </motion.div>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { isValidEmail, sanitizeInput } from "@/lib/utils";

const WHATSAPP_LINK = "https://chat.whatsapp.com/C0vkI4l6bMe0COLnmPmFrM";

type FormState = "idle" | "loading" | "success" | "error";

export function JoinForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("loading");
    setErrorMessage("");

    const formData = new FormData(form);
    const honeypot = String(formData.get("website") ?? "");

    if (honeypot.trim()) {
      setState("success");
      form.reset();
      return;
    }

    const nombre = sanitizeInput(String(formData.get("nombre") ?? ""), 120);
    const emailRaw = sanitizeInput(String(formData.get("email") ?? ""), 254);
    const email = emailRaw || null;
    const telefono = sanitizeInput(String(formData.get("telefono") ?? ""), 20);
    const direccion = sanitizeInput(String(formData.get("direccion") ?? ""), 500);
    const mensaje = sanitizeInput(String(formData.get("mensaje") ?? ""), 1000);

    if (nombre.length < 2) {
      setErrorMessage("Ingresa un nombre válido.");
      setState("error");
      return;
    }

    if (email && !isValidEmail(email)) {
      setErrorMessage("Ingresa un correo electrónico válido o déjalo en blanco.");
      setState("error");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.from("manada_leads").insert({
      nombre,
      email,
      telefono: telefono || null,
      direccion: direccion || null,
      mensaje: mensaje || null,
    });

    if (error) {
      setErrorMessage("No pudimos registrar tu solicitud. Intenta nuevamente.");
      setState("error");
      return;
    }

    setState("success");
    form.reset();
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
              Correo electrónico (opcional)
            </span>
            <input
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
            Dirección (opcional)
          </span>
          <input
            name="direccion"
            maxLength={500}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
            placeholder="Ej: Av. Principal 123, Pueblo Nuevo"
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

        <AnimatePresence>
          {state === "success" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-neutral-900">
                  ¡Gracias por unirte a la manada!
                </h3>
                <p className="mt-3 text-neutral-600">
                  Ingresa y sé más íntimo con nosotros
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Ir al grupo de WhatsApp
                </a>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

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

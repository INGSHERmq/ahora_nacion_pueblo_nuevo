"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isValidEmail, sanitizeInput } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";
type ProposalType = "propuesta" | "problematica";

type ProposalFormProps = {
  onSuccess?: () => void;
  inModal?: boolean;
};

export function ProposalForm({ onSuccess, inModal = false }: ProposalFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [tipo, setTipo] = useState<ProposalType>("propuesta");

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
      setTipo("propuesta");
      onSuccess?.();
      return;
    }

    const nombre = sanitizeInput(String(formData.get("nombre") ?? ""), 120);
    const localidad = sanitizeInput(String(formData.get("localidad") ?? ""), 120);
    const descripcion = sanitizeInput(String(formData.get("descripcion") ?? ""), 2000);
    const emailRaw = sanitizeInput(String(formData.get("email") ?? ""), 254);
    const email = emailRaw || null;

    if (localidad.length < 2) {
      setErrorMessage("Indica tu localidad o sector.");
      setState("error");
      return;
    }

    if (descripcion.length < 10) {
      setErrorMessage("Describe tu propuesta o problemática con al menos 10 caracteres.");
      setState("error");
      return;
    }

    if (email && !isValidEmail(email)) {
      setErrorMessage("Ingresa un correo electrónico válido o déjalo en blanco.");
      setState("error");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.from("citizen_proposals").insert({
      nombre: nombre || null,
      localidad,
      tipo,
      descripcion,
      email,
    });

    if (error) {
      setErrorMessage("No pudimos enviar tu propuesta. Intenta nuevamente.");
      setState("error");
      return;
    }

    setState("success");
    form.reset();
    setTipo("propuesta");
    window.dispatchEvent(new CustomEvent("proposal-submitted"));
    setTimeout(() => onSuccess?.(), 1800);
  }

  const form = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setTipo("propuesta")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            tipo === "propuesta"
              ? "bg-[#D72638] text-white shadow-md"
              : "border border-neutral-300 text-neutral-700 hover:border-[#D72638]/40"
          }`}
        >
          Propuesta
        </button>
        <button
          type="button"
          onClick={() => setTipo("problematica")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            tipo === "problematica"
              ? "bg-[#D72638] text-white shadow-md"
              : "border border-neutral-300 text-neutral-700 hover:border-[#D72638]/40"
          }`}
        >
          Problemática
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">
            Tu nombre (opcional)
          </span>
          <input
            name="nombre"
            maxLength={120}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
            placeholder="León / Leona"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">
            Localidad o sector *
          </span>
          <input
            required
            name="localidad"
            maxLength={120}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
            placeholder="Ej. Urb. San José..."
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-neutral-700">
          Correo (opcional)
        </span>
        <input
          type="email"
          name="email"
          maxLength={254}
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
          placeholder="correo@ejemplo.com"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-neutral-700">
          {tipo === "propuesta" ? "Tu propuesta *" : "Describe la problemática *"}
        </span>
        <textarea
          required
          name="descripcion"
          rows={inModal ? 4 : 5}
          maxLength={2000}
          className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20"
          placeholder={
            tipo === "propuesta"
              ? "¿Qué propones para mejorar tu localidad?"
              : "¿Qué problemática enfrenta tu comunidad?"
          }
        />
      </label>

      {state === "error" ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      ) : null}

      {state === "success" ? (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          ¡Gracias, león/leona! Tu aporte fue registrado.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "loading" || state === "success"}
        className="w-full rounded-full bg-[#D72638] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#b91c2c] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "loading" ? "Enviando..." : "Enviar mi aporte"}
      </button>
    </form>
  );

  if (inModal) return form;

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl sm:p-8">
      {form}
    </div>
  );
}

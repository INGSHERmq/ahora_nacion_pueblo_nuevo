"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { RockPaperScissors } from "@/components/games/RockPaperScissors";
import { TicTacToe } from "@/components/games/TicTacToe";

type ActiveGame = "menu" | "rps" | "ttt";

const gameCards = [
  {
    id: "rps" as const,
    title: "Piedra, Papel o Tijera",
    emoji: "🪨📄✂️",
    description: "El clásico duelo. Elige tu jugada y vence en cualquier dificultad.",
  },
  {
    id: "ttt" as const,
    title: "Tres en Línea",
    emoji: "⭕❌",
    description: "Alinea tres en fila antes que la CPU. ¿Podrás en modo difícil?",
  },
];

export default function JuegosPage() {
  const [activeGame, setActiveGame] = useState<ActiveGame>("menu");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] via-white to-[#fff5f5]">
      <header className="border-b border-[#D72638]/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-heading text-2xl text-[#D72638] sm:text-3xl">Juegos</h1>
            <p className="text-sm text-neutral-600">Pueblo Nuevo · Carapulcrón</p>
          </div>
          <Link
            href="/"
            className="rounded-full bg-[#D72638] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b91c2c]"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {activeGame === "menu" ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 text-center"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#D72638]/70">
                Zona de diversión
              </p>
              <h2 className="mt-2 font-heading text-3xl text-neutral-900 sm:text-4xl">
                Elige tu juego
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-neutral-600">
                Gana en cualquier modo (fácil, medio o difícil) y reclama tu carapulcra el 28 de
                julio en el local del Carapulcrón.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              {gameCards.map((game, index) => (
                <motion.button
                  key={game.id}
                  type="button"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveGame(game.id)}
                  className="group rounded-3xl border border-neutral-200 bg-white p-8 text-left shadow-lg transition hover:border-[#D72638]/30 hover:shadow-xl"
                >
                  <span className="text-4xl">{game.emoji}</span>
                  <h3 className="mt-4 font-heading text-2xl text-[#D72638]">{game.title}</h3>
                  <p className="mt-2 text-neutral-600">{game.description}</p>
                  <span className="mt-6 inline-block rounded-full bg-[#D72638]/10 px-4 py-2 text-sm font-semibold text-[#D72638] transition group-hover:bg-[#D72638] group-hover:text-white">
                    Jugar ahora →
                  </span>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => setActiveGame("menu")}
              className="mb-6 text-sm font-medium text-[#D72638] hover:underline"
            >
              ← Volver a juegos
            </button>
            {activeGame === "rps" ? <RockPaperScissors /> : <TicTacToe />}
          </div>
        )}
      </main>
    </div>
  );
}

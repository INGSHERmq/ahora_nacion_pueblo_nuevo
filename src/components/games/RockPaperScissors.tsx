"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  getCPUrpsChoice,
  getRPSWinner,
  type Difficulty,
  type RPSChoice,
} from "@/lib/game-ai";
import { DifficultySelector } from "./DifficultySelector";
import { FrostCelebration } from "./FrostCelebration";

const CHOICES: { id: RPSChoice; emoji: string; label: string }[] = [
  { id: "piedra", emoji: "🪨", label: "Piedra" },
  { id: "papel", emoji: "📄", label: "Papel" },
  { id: "tijera", emoji: "✂️", label: "Tijera" },
];

export function RockPaperScissors() {
  const [difficulty, setDifficulty] = useState<Difficulty>("facil");
  const [playerChoice, setPlayerChoice] = useState<RPSChoice | null>(null);
  const [cpuChoice, setCpuChoice] = useState<RPSChoice | null>(null);
  const [result, setResult] = useState<string>("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastPlayerChoice, setLastPlayerChoice] = useState<RPSChoice | undefined>();

  function play(choice: RPSChoice) {
    const cpu = getCPUrpsChoice(difficulty, lastPlayerChoice);
    const outcome = getRPSWinner(choice, cpu);

    setPlayerChoice(choice);
    setCpuChoice(cpu);
    setLastPlayerChoice(choice);

    if (outcome === "player") {
      setResult("¡Ganaste esta ronda!");
      setShowCelebration(true);
    } else if (outcome === "cpu") {
      setResult("Perdiste. ¡Inténtalo de nuevo!");
    } else {
      setResult("Empate. ¡Juega otra vez!");
    }
  }

  function resetRound() {
    setPlayerChoice(null);
    setCpuChoice(null);
    setResult("");
  }

  return (
    <>
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl sm:p-8">
        <h2 className="text-center font-heading text-2xl text-[#D72638] sm:text-3xl">
          Piedra, Papel o Tijera
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Elige tu jugada y vence a la CPU
        </p>

        <div className="mt-6">
          <DifficultySelector value={difficulty} onChange={setDifficulty} />
        </div>

        <div className="mt-8 flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Tú</p>
            <motion.div
              key={playerChoice ?? "empty-p"}
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="mt-2 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FAFAFA] text-4xl shadow-inner"
            >
              {playerChoice
                ? CHOICES.find((c) => c.id === playerChoice)?.emoji
                : "❓"}
            </motion.div>
          </div>
          <span className="font-heading text-2xl text-neutral-300">VS</span>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">CPU</p>
            <motion.div
              key={cpuChoice ?? "empty-c"}
              initial={{ scale: 0.5, rotate: 20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="mt-2 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FAFAFA] text-4xl shadow-inner"
            >
              {cpuChoice ? CHOICES.find((c) => c.id === cpuChoice)?.emoji : "❓"}
            </motion.div>
          </div>
        </div>

        {result ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 text-center text-lg font-semibold ${
              result.includes("Ganaste")
                ? "text-green-600"
                : result.includes("Perdiste")
                  ? "text-red-600"
                  : "text-neutral-600"
            }`}
          >
            {result}
          </motion.p>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {CHOICES.map((choice) => (
            <button
              key={choice.id}
              type="button"
              onClick={() => play(choice.id)}
              className="flex flex-col items-center gap-2 rounded-2xl border-2 border-neutral-200 bg-white px-6 py-4 transition hover:border-[#D72638] hover:shadow-lg active:scale-95"
            >
              <span className="text-4xl">{choice.emoji}</span>
              <span className="text-sm font-semibold text-neutral-700">{choice.label}</span>
            </button>
          ))}
        </div>

        {playerChoice ? (
          <button
            type="button"
            onClick={resetRound}
            className="mt-6 w-full rounded-full border border-neutral-300 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Nueva ronda
          </button>
        ) : null}
      </div>

      <FrostCelebration show={showCelebration} onClose={() => setShowCelebration(false)} />
    </>
  );
}

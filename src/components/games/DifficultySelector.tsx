"use client";

import { DIFFICULTY_LABELS, type Difficulty } from "@/lib/game-ai";

type DifficultySelectorProps = {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
};

const OPTIONS: Difficulty[] = ["facil", "medio", "dificil"];

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            value === option
              ? "bg-[#D72638] text-white shadow-md"
              : "border border-neutral-300 bg-white text-neutral-700 hover:border-[#D72638]/40"
          }`}
        >
          {DIFFICULTY_LABELS[option]}
        </button>
      ))}
    </div>
  );
}

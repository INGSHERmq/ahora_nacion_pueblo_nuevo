"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  checkTicTacToeWinner,
  getCPUTicTacToeMove,
  type Board,
  type Cell,
  type Difficulty,
} from "@/lib/game-ai";
import { DifficultySelector } from "./DifficultySelector";
import { FrostCelebration } from "./FrostCelebration";

const EMPTY_BOARD: Board = Array(9).fill(null);

export function TicTacToe() {
  const [difficulty, setDifficulty] = useState<Difficulty>("facil");
  const [board, setBoard] = useState<Board>([...EMPTY_BOARD]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  function handleCellClick(index: number) {
    if (board[index] !== null || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    const playerWin = checkTicTacToeWinner(newBoard);

    if (playerWin === "X") {
      setBoard(newBoard);
      setGameOver(true);
      setMessage("¡Ganaste!");
      setShowCelebration(true);
      return;
    }

    if (playerWin === "tie") {
      setBoard(newBoard);
      setGameOver(true);
      setMessage("Empate. ¡Juega de nuevo!");
      return;
    }

    const cpuMove = getCPUTicTacToeMove(newBoard, difficulty);
    newBoard[cpuMove] = "O";
    const cpuWin = checkTicTacToeWinner(newBoard);

    setBoard(newBoard);

    if (cpuWin === "O") {
      setGameOver(true);
      setMessage("La CPU ganó. ¡Inténtalo de nuevo!");
    } else if (cpuWin === "tie") {
      setGameOver(true);
      setMessage("Empate. ¡Juega de nuevo!");
    }
  }

  function resetGame() {
    setBoard([...EMPTY_BOARD]);
    setGameOver(false);
    setMessage("");
  }

  function cellContent(cell: Cell) {
    if (cell === "X") return <span className="text-[#D72638]">✕</span>;
    if (cell === "O") return <span className="text-blue-600">○</span>;
    return null;
  }

  return (
    <>
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl sm:p-8">
        <h2 className="text-center font-heading text-2xl text-[#D72638] sm:text-3xl">
          Tres en Línea
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Tú juegas con ✕ — vence a la CPU
        </p>

        <div className="mt-6">
          <DifficultySelector value={difficulty} onChange={setDifficulty} />
        </div>

        <div className="mx-auto mt-8 grid max-w-xs grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <motion.button
              key={index}
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => handleCellClick(index)}
              disabled={cell !== null || gameOver}
              className="flex aspect-square items-center justify-center rounded-2xl border-2 border-neutral-200 bg-[#FAFAFA] text-3xl font-bold transition hover:border-[#D72638] disabled:cursor-not-allowed disabled:opacity-80 sm:text-4xl"
            >
              {cellContent(cell)}
            </motion.button>
          ))}
        </div>

        {message ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-6 text-center text-lg font-semibold ${
              message.includes("Ganaste")
                ? "text-green-600"
                : message.includes("CPU")
                  ? "text-red-600"
                  : "text-neutral-600"
            }`}
          >
            {message}
          </motion.p>
        ) : null}

        {gameOver ? (
          <button
            type="button"
            onClick={resetGame}
            className="mt-6 w-full rounded-full bg-[#D72638] py-3 text-sm font-semibold text-white hover:bg-[#b91c2c]"
          >
            Jugar de nuevo
          </button>
        ) : null}
      </div>

      <FrostCelebration show={showCelebration} onClose={() => setShowCelebration(false)} />
    </>
  );
}

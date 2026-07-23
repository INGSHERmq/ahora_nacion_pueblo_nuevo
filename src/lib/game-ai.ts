export type Difficulty = "facil" | "medio" | "dificil";
export type RPSChoice = "piedra" | "papel" | "tijera";

const RPS_OPTIONS: RPSChoice[] = ["piedra", "papel", "tijera"];

const RPS_BEATS: Record<RPSChoice, RPSChoice> = {
  piedra: "tijera",
  papel: "piedra",
  tijera: "papel",
};

export function getRPSWinner(a: RPSChoice, b: RPSChoice): "player" | "cpu" | "tie" {
  if (a === b) return "tie";
  return RPS_BEATS[a] === b ? "player" : "cpu";
}

export function getCPUrpsChoice(
  difficulty: Difficulty,
  playerLast?: RPSChoice,
): RPSChoice {
  if (difficulty === "facil") {
    return RPS_OPTIONS[Math.floor(Math.random() * 3)]!;
  }

  if (difficulty === "medio") {
    if (playerLast && Math.random() < 0.55) {
      const counter: Record<RPSChoice, RPSChoice> = {
        piedra: "papel",
        papel: "tijera",
        tijera: "piedra",
      };
      return counter[playerLast];
    }
    return RPS_OPTIONS[Math.floor(Math.random() * 3)]!;
  }

  if (playerLast) {
    const counter: Record<RPSChoice, RPSChoice> = {
      piedra: "papel",
      papel: "tijera",
      tijera: "piedra",
    };
    return counter[playerLast];
  }
  return RPS_OPTIONS[Math.floor(Math.random() * 3)]!;
}

export type Cell = "X" | "O" | null;
export type Board = Cell[];

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkTicTacToeWinner(board: Board): Cell | "tie" | null {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every((cell) => cell !== null)) return "tie";
  return null;
}

function minimax(board: Board, isMaximizing: boolean): number {
  const winner = checkTicTacToeWinner(board);
  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (winner === "tie") return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    }
    return best;
  }

  let best = Infinity;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "X";
      best = Math.min(best, minimax(board, true));
      board[i] = null;
    }
  }
  return best;
}

function findBestMove(board: Board): number {
  let bestScore = -Infinity;
  let bestMove = 0;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      const score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function findBlockingOrWinningMove(board: Board, mark: Cell): number | null {
  for (const [a, b, c] of WIN_LINES) {
    const line = [board[a], board[b], board[c]];
    const marks = line.filter((cell) => cell === mark).length;
    const empty = line.filter((cell) => cell === null).length;
    if (marks === 2 && empty === 1) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }
  return null;
}

export function getCPUTicTacToeMove(board: Board, difficulty: Difficulty): number {
  const empty = board.map((cell, i) => (cell === null ? i : -1)).filter((i) => i >= 0);

  if (difficulty === "facil") {
    return empty[Math.floor(Math.random() * empty.length)]!;
  }

  if (difficulty === "medio") {
    const winMove = findBlockingOrWinningMove(board, "O");
    if (winMove !== null) return winMove;
    const blockMove = findBlockingOrWinningMove(board, "X");
    if (blockMove !== null) return blockMove;
    if (board[4] === null) return 4;
    return empty[Math.floor(Math.random() * empty.length)]!;
  }

  return findBestMove([...board]);
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  facil: "Fácil",
  medio: "Medio",
  dificil: "Difícil",
};

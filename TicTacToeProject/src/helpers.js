import { WINNING_COMBINATIONS, INITIAL_GAME_BOARD } from './constants';

export function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = '0';
  }
  return currentPlayer;
}

export function deriveGameBoard(gameTurns) {
  const gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);
  for (const { square, player } of gameTurns) {
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

export function deriveWinner(gameBoard, players) {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    const first = gameBoard[a.row][a.column];
    const second = gameBoard[b.row][b.column];
    const third = gameBoard[c.row][c.column];

    if (first && first === second && first === third) {
      return players[first];
    }
  }
  return undefined;
}

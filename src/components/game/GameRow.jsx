// components/game/GameRow.jsx
import GameTile from "./GameTile";

const GameRow = ({ guess, currentGuess, isActive }) => {
  const letters = Array(5).fill("");

  // Fill in letters based on the situation
  if (isActive && currentGuess) {
    // For the active row, show current guess
    const currentLetters = currentGuess.split("");
    for (let i = 0; i < currentLetters.length; i++) {
      letters[i] = currentLetters[i];
    }
  } else if (guess.formatted) {
    // For submitted rows with evaluation
    for (let i = 0; i < guess.formatted.length; i++) {
      letters[i] = guess.formatted[i].letter;
    }
  } else if (guess.word) {
    // For submitted rows without evaluation (shouldn't happen in normal play)
    const wordLetters = guess.word.split("");
    for (let i = 0; i < wordLetters.length; i++) {
      letters[i] = wordLetters[i];
    }
  }

  return (
    <div className="row">
      {letters.map((letter, i) => (
        <GameTile
          key={i}
          letter={letter}
          status={
            guess.formatted && guess.formatted[i]
              ? guess.formatted[i].status
              : ""
          }
        />
      ))}
    </div>
  );
};

export default GameRow;

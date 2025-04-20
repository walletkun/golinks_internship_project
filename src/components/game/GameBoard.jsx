import GameRow from "./GameRow";

const GameBoard = ({ guesses, currentGuess, turn, history }) => {
    return (
        <div className="game-board">
            {guesses.map((guess, i) => {
                // Format the guess with its evaluation if available
                const formattedGuess = history[i] ? { word: guess , formatted: history[i] } : { word: guess };

                // Checking if it's an active row
                const isActive = i === turn;

                
                return (
                    <GameRow
                    key={i}
                    guess={formattedGuess}
                    isActive={isActive}
                    currentGuess={isActive ? currentGuess : ""}
                    />
                )
            })}

        </div>
    )
};


export default GameBoard;
import { Button } from "../ui/button";

const Keyboard = ({ history, handleKeyInput }) => {
  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];

  // Getting the status of the key from history
  const getKeyStatus = (key) => {
    // Handle special keys (e.g. Enter, Backspace)
    if (key === "Enter" || key === "Backspace") return "";

    // Check if the letter was used in any past guesses
    let status = "";

    // Check all past guesses (newest first for most recent status)
    for (let i = history.length - 1; i >= 0; i--) {
      const guess = history[i];

      // Find the letter in this guess
      const match = guess.find((item) => item.letter === key);
      if (match) {
        status = match.status;
        break;
      }
    }

    return status;
  };

  const handleKeyClick = (key) => {
    handleKeyInput({ key });
  };

  return (
    <div className="keyboard">
      {keys.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key) => {
            const status = getKeyStatus(key.toLowerCase());
            const statusClass = status ? `key-${status}` : "";

            return (
              <Button
                key={key}
                className={`key ${statusClass}`}
                onClick={() => handleKeyClick(key)}
              >
                {key === "Backspace" ? "⌫" : key}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
};


export default Keyboard;
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    // Add haptic feedback on mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    handleKeyInput({ key });
  };

  // Get background color based on key status
  const getKeyBackground = (status) => {
    switch (status) {
      case "correct":
        return "#6aaa64"; // Wordle green
      case "present":
        return "#c9b458"; // Wordle yellow
      case "absent":
        return "#787c7e"; // Wordle gray
      default:
        return "#d3d6da"; // Default key color
    }
  };

  // Get text color based on key status
  const getKeyTextColor = (status) => {
    return status ? "white" : "#1a1a1b";
  };

  return (
    <div className="keyboard mt-6 w-full max-w-md mx-auto">
      {keys.map((row, i) => (
        <motion.div
          key={i}
          className="flex justify-center gap-1.5 my-1.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          {row.map((key) => {
            const status = getKeyStatus(key.toLowerCase());
            const bgColor = getKeyBackground(status);
            const textColor = getKeyTextColor(status);

            return (
              <motion.div
                key={key}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  backgroundColor: bgColor,
                  color: textColor,
                }}
                transition={{
                  duration: 0.2,
                  backgroundColor: { duration: 0.3 },
                }}
                className="relative"
              >
                <Button
                  onClick={() => handleKeyClick(key)}
                  className={`h-14 ${
                    key === "Enter" || key === "Backspace"
                      ? "px-3 text-xs"
                      : "px-2 min-w-[40px]"
                  } font-bold rounded-md text-center`}
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    border: "none",
                  }}
                >
                  {key === "Backspace" ? "⌫" : key}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};

export default Keyboard;

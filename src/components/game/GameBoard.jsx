"use client";

import { motion } from "framer-motion";

const GameBoard = ({ guesses, currentGuess, turn, history }) => {
  return (
    <div className="game-board mb-8">
      {guesses.map((guess, i) => {
        // If this is the current row and we have a current guess
        if (i === turn && currentGuess) {
          const letters = currentGuess.split("");

          return (
            <motion.div
              key={i}
              className="row flex justify-center mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {letters.map((letter, j) => (
                <motion.div
                  key={j}
                  className="tile flex items-center justify-center w-14 h-14 border-2 border-gray-300 m-1 text-2xl font-bold uppercase"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  {letter}
                </motion.div>
              ))}
              {/* Add empty tiles for remaining spaces */}
              {[...Array(5 - letters.length)].map((_, j) => (
                <motion.div
                  key={j + letters.length}
                  className="tile flex items-center justify-center w-14 h-14 border-2 border-gray-300 m-1 text-2xl font-bold"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />
              ))}
            </motion.div>
          );
        }

        // If we have history for this row (a completed guess)
        if (i < turn) {
          return (
            <div key={i} className="row flex justify-center mb-2">
              {history[i].map((item, j) => {
                const bgColor =
                  item.status === "correct"
                    ? "#6aaa64"
                    : item.status === "present"
                    ? "#c9b458"
                    : item.status === "absent"
                    ? "#787c7e"
                    : "transparent";

                return (
                  <motion.div
                    key={j}
                    className="tile flex items-center justify-center w-14 h-14 border-2 m-1 text-2xl font-bold text-white uppercase"
                    initial={{ rotateX: 0 }}
                    animate={{
                      rotateX: [0, 90, 0],
                      backgroundColor: bgColor,
                      borderColor: bgColor,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: j * 0.2,
                      times: [0, 0.5, 1],
                      backgroundColor: { delay: j * 0.2 + 0.3 },
                      borderColor: { delay: j * 0.2 + 0.3 },
                    }}
                  >
                    {item.letter}
                  </motion.div>
                );
              })}
            </div>
          );
        }

        // Future empty rows
        return (
          <motion.div
            key={i}
            className="row flex justify-center mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            {[...Array(5)].map((_, j) => (
              <div
                key={j}
                className="tile flex items-center justify-center w-14 h-14 border-2 border-gray-200 m-1 text-2xl font-bold"
              />
            ))}
          </motion.div>
        );
      })}
    </div>
  );
};

export default GameBoard;

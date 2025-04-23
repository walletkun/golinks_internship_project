"use client";

import { useEffect, useState, useRef } from "react";
import { useWordle } from "@/hooks/useWordle";
import GameBoard from "@/components/game/GameBoard";
import Keyboard from "@/components/game/Keyboard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ScoreForm from "@/components/leaderboard/ScoreForm";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/game/Confetti";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const {
    currentGuess,
    guesses,
    turn,
    isGameOver,
    isWon,
    error,
    history,
    solution,
    loading,
    handleKeyInput,
    resetGames,
  } = useWordle();

  const [gameTime, setGametime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const errorTimeoutRef = useRef(null);

  // Start the timer when the game starts
  useEffect(() => {
    if (!loading && !startTime) setStartTime(Date.now());
  }, [loading, startTime]);

  // Update the timer every second
  useEffect(() => {
    if (startTime && !isGameOver) {
      // Set a delay between each update
      const interval = setInterval(() => {
        setGametime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, isGameOver]);

  // Show confetti when game is won
  useEffect(() => {
    if (isWon) {
      setShowConfetti(true);
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isWon]);

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }

      errorTimeoutRef.current = setTimeout(() => {
        // This is just for UI, the actual error state is managed in useWordle
        // We're just hiding the alert after a delay
        const alertElement = document.querySelector(".error-alert");
        if (alertElement) {
          alertElement.classList.add("opacity-0");
        }
      }, 3000);

      return () => {
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
      };
    }
  }, [error]);

  // Handling successful score submission
  const handleScoreSuccess = () => {
    setScoreSubmitted(true);
  };

  // Play again button
  const handlePlayAgain = () => {
    // Reset all states
    setStartTime(null);
    setGametime(0);
    setScoreSubmitted(false);
    setShowConfetti(false);
    // imported from useWordle()
    resetGames();
  };

  // Setting up the keybaord listener
  useEffect(() => {
    window.addEventListener("keyup", handleKeyInput);
    return () => window.removeEventListener("keyup", handleKeyInput);
  }, [handleKeyInput]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-12 bg-white">
      {showConfetti && <Confetti />}

      <div className="game-container max-w-md w-full mx-auto">
        <motion.div
          className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl font-bold tracking-wide uppercase"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <span className="text-[#6aaa64]">G</span>
            <span className="text-[#c9b458]">u</span>
            <span className="text-[#787c7e]">e</span>
            <span className="text-[#6aaa64]">s</span>
            <span className="text-[#c9b458]">s</span>
            <span className="text-[#787c7e]">d</span>
            <span className="text-[#6aaa64]">l</span>
            <span className="text-[#c9b458]">e</span>
          </motion.h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/leaderboard"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium flex items-center"
            >
              Leaderboard
            </Link>
          </motion.div>
        </motion.div>

        {!isGameOver && (
          <motion.div
            className="text-center mb-4 font-mono text-lg bg-gray-100 py-2 px-4 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Time: {Math.floor(gameTime / 60)}m {gameTime % 60}s
          </motion.div>
        )}

        {loading ? (
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex space-x-1">
              {[..."LOADING"].map((letter, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 font-bold"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: 1,
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 1,
                    delay: i * 0.1,
                    repeatDelay: 0.5,
                  }}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            <GameBoard
              guesses={guesses}
              currentGuess={currentGuess}
              turn={turn}
              history={history}
            />

            <Keyboard history={history} handleKeyInput={handleKeyInput} />

            <AnimatePresence>
              {error && (
                <motion.div
                  className="error-alert mt-4 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert className="border-red-200 bg-red-50 text-red-800">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isGameOver && (
                <motion.div
                  className="game-over mt-6 p-4 rounded-lg border border-gray-200 bg-gray-50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {isWon ? (
                    <motion.h2
                      className="text-2xl font-bold text-[#6aaa64] text-center"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      You won in {turn} {turn === 1 ? "guess" : "guesses"}!
                    </motion.h2>
                  ) : (
                    <motion.h2
                      className="text-2xl font-bold text-red-500 text-center"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      Game over!
                    </motion.h2>
                  )}

                  <motion.div
                    className="solution mt-2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-gray-600 mb-2">The word was:</div>
                    <div className="flex justify-center space-x-1 mb-4">
                      {solution.split("").map((letter, i) => (
                        <motion.div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center bg-[#6aaa64] text-white font-bold uppercase"
                          initial={{ rotateY: 180 }}
                          animate={{ rotateY: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          {letter}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap justify-center gap-3 mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {isWon && !scoreSubmitted && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <motion.button
                            className="bg-[#6aaa64] hover:bg-[#5a9154] text-white px-4 py-2 rounded-md font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Submit to Leaderboard
                          </motion.button>
                        </DialogTrigger>
                        <ScoreForm
                          guesses={turn}
                          timeSeconds={gameTime}
                          word={solution}
                          onClose={() => {}}
                          onSuccess={handleScoreSuccess}
                        />
                      </Dialog>
                    )}

                    {scoreSubmitted && (
                      <motion.div
                        className="text-[#6aaa64] bg-[#e6f4ea] p-2 rounded-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Score submitted! View the{" "}
                        <Link href="/leaderboard" className="underline">
                          leaderboard
                        </Link>
                      </motion.div>
                    )}

                    <motion.button
                      onClick={handlePlayAgain}
                      className="bg-[#c9b458] hover:bg-[#b9a448] text-white px-4 py-2 rounded-md font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Play Again
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <Footer/>
    </main>
  );
}

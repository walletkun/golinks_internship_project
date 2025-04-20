// To use client side imports
"use client";

import { useEffect } from "react";
import { useWordle } from "@/hooks/useWordle";
import GameBoard from "@/components/game/GameBoard";
import Keyboard from "@/components/game/Keyboard";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  } = useWordle();


  // Setting up the keybaord listener
  useEffect(() => {
    window.addEventListener('keyup', handleKeyInput);
    return () => window.removeEventListener('keyup', handleKeyInput);
  }, [handleKeyInput]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="game-container">
        <h1 className="text-3xl font-bold mb-8">Wordle Clone</h1>

        {loading ? (
          <div>Loading game...</div>
        ) : (
          <>
            <GameBoard
              guesses={guesses}
              currentGuess={currentGuess}
              turn={turn}
              history={history}
            />

            <Keyboard history={history} handleKeyInput={handleKeyInput} />

            {error && (
              <Alert className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isGameOver && (
              <div className="game-over mt-6">
                {isWon ? (
                  <h2 className="text-2xl font-bold text-green-500">
                    You won! The word was {solution}.
                  </h2>
                ) : (
                  <h2 className="text-2xl font-bold text-red-500">
                    Game over! The word was {solution}.
                  </h2>
                )}
                {/* Add a "Play Again" button here */}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

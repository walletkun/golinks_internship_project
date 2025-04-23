"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

const ScoreForm = ({ guesses, timeSeconds, word, onClose, onSuccess }) => {
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setError("Please enter a nickname");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post("/api/leaderboard", {
        nickname,
        guesses,
        timeSeconds,
        word,
      });

      onSuccess();
    } catch (error) {
      setError(error.response?.data?.error || "Failed to submit score");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate Wordle-style letter tiles for the word
  const renderWordTiles = () => {
    return (
      <div className="flex justify-center space-x-1">
        {word.split("").map((letter, index) => (
          <div
            key={index}
            className="w-8 h-8 flex items-center justify-center bg-[#6aaa64] text-white font-bold uppercase border-2 border-[#6aaa64]"
          >
            {letter}
          </div>
        ))}
      </div>
    );
  };

  // Calculate score rating based on guesses (1-6)
  const getScoreRating = () => {
    if (guesses === 1) return "Genius!";
    if (guesses === 2) return "Magnificent!";
    if (guesses === 3) return "Impressive!";
    if (guesses === 4) return "Splendid!";
    if (guesses === 5) return "Great!";
    return "Phew!";
  };

  return (
    <DialogContent className="bg-white border-0 rounded-lg">
      <DialogHeader className="border-b pb-4">
        <DialogTitle className="text-center text-xl font-bold tracking-wide">
          WORDLE SCORE
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="space-y-5 py-4">
          <div className="text-center mb-4">
            <div className="text-lg font-bold text-[#6aaa64]">
              {getScoreRating()}
            </div>
            {renderWordTiles()}
          </div>

          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-md">
            <div className="text-gray-600">Guesses:</div>
            <div className="font-bold">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-[#6aaa64] text-white rounded-full text-sm">
                {guesses}
              </span>
              <span className="text-gray-500 ml-1">/6</span>
            </div>

            <div className="text-gray-600">Time:</div>
            <div className="font-bold text-gray-800">
              {Math.floor(timeSeconds / 60)}m {timeSeconds % 60}s
            </div>

            <div className="text-gray-600">Word:</div>
            <div className="font-bold uppercase text-gray-800">{word}</div>
          </div>

          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Nickname
            </label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              maxLength={20}
              required
              className="border-gray-300 focus:border-[#6aaa64] focus:ring focus:ring-[#6aaa64] focus:ring-opacity-50"
            />
          </div>

          {error && <div className="text-[#ff4136] text-sm">{error}</div>}
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#6aaa64] hover:bg-[#538d4e] text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Score"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ScoreForm;

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useWordle = (initialSolution = null) => {
  // Track current turn/attempt number (0-5)
  const [turn, setTurn] = useState(0);
  // Tracking the guesses
  const [currentGuess, setCurrentGuess] = useState("");
  // Guessing Array
  const [guesses, setGuesses] = useState([...Array(6)].map(() => ""));
  // Array for evaluation for each guesses
  // Where each evaluation will be an array of letter evaluations like ('correct', 'present', 'absent')
  const [history, setHistory] = useState([]);
  // Game status
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  // Error message for invalid input
  const [error, setError] = useState(null);

  // solution and loading states
  const [loading, setLoading] = useState(!initialSolution);
  const [solution, setSolution] = useState(initialSolution);

  async function getWord() {
    try {
      const response = await axios.get("/api/word");
      return response.data.word;
    } catch (error) {
      console.log("Why");
      return "react";
    }
  }
  // Side effect, where we fetch a random word from our api
  useEffect(() => {
    const fetchValid = async () => {
      if (!initialSolution) {
        setLoading(true);
        let isValid = false;
        let word;

        while (!isValid) {
          word = await getWord();
          isValid = await isValidWord(word);

        }
        setSolution(word);
        setLoading(false);
      }
    };

    fetchValid();
  }, [initialSolution]);

  // Validating the word
  const isValidWord = async (word) => {
    try {
      const response = await axios.get(`/api/validate/${word}`);
      return response.data.valid;
    } catch (error) {
      console.error("Error validating word:", error);
      return false;
    }
  };

  // Formatting the guesses
  const formatGuess = () => {
    // Creating an array that starts with default status 'absent' (all gray blocks)
    const solutionArray = [...solution];
    // All gray blocks before any letters
    const formattedGuess = [...currentGuess].map((letter) => {
      return { letter, status: "absent" };
    });

    // Find the correct letters (right letter, right position)
    formattedGuess.forEach((item, i) => {
      if (solution[i] === item.letter) {
        item.status = "correct";
        solutionArray[i] = null; // Marking it as used
      }
    });

    // Find the present letter (Letter that's in the word but not the correct position)
    formattedGuess.forEach((item) => {
      if (item.status === "absent" && solutionArray.includes(item.letter)) {
        item.status = "present";
        solutionArray[solutionArray.indexOf(item.letter)] = null; // Markign it as used
      }
    });

    return formattedGuess;
  };

  // Adding new guesses to history
  const addNewGuess = (formattedGuess) => {
    // Checking if all letters are correct (win condition)
    const isCorrect = formattedGuess.every((item) => item.status === "correct");

    // update the guesses array
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[turn] = currentGuess;
      return newGuesses;
    });

    // Add to history
    setHistory((prevHistory) => [...prevHistory, formattedGuess]);

    // Increment Turn
    setTurn((prevTurn) => prevTurn + 1);

    // Checking win condition
    if (isCorrect) {
      setIsWon(true);
      setIsGameOver(true);
    }
    // Used up all turns therefore it's a loss
    else if (turn === 5) {
      setIsGameOver(true);
    }
  };

  // Handling key input
  // Using callback because since each time we'll have to input a letter thus we don't want to rerender every component again
  // So we can cache it
  const handleKeyInput = useCallback(
    ({ key }) => {
      // If the game is over don't process any key inputs
      if (isGameOver) return;

      // Checking if the input key is valid
      // Using regex would be simpler in this case since it's just tracking if its alphabet letters
      if (/^[A-Za-z]$/.test(key)) {
        // Only append the letter if current guess length is less than 5
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + key.toLowerCase());
        }
      }

      // Handling delete key
      if (key === "Backspace") {
        // Storing the last character if it exists
        const lastChar =
          currentGuess.length > 0 ? currentGuess[currentGuess.length - 1] : "";
        // This removes the last character but also maintains the currentGuess structure
        setCurrentGuess((prev) => prev.slice(0, -1));

        console.log("Removed character: ", lastChar);
      }

      // Handling the enter key
      if (key == "Enter") {
        // We have to ensure that our guesses are exactly 5 characters long and our turn must be less than 6
        if (currentGuess.length === 5 && turn < 6) {
          // API call to ensure that it's a word

          // But for now I'll do a function call to simulate that it's a word
          isValidWord(currentGuess).then((valid) => {
            if (!valid) {
              // Word doesn't exist in dicitionary
              setError("Not a valid word");
              return;
            }
            // Clear previous errors
            setError(null);

            // Format the guesses (evaluate each word)
            const formatted = formatGuess();
            // Add new guesses to history
            addNewGuess(formatted);
            // Reset current guess for next attempt
            setCurrentGuess("");
          });
        } else if (currentGuess.length < 5) {
          // Explicity say that guess must be 5 characters long
          setError("Guess must be 5 characters long!");
        }
      }
    },
    [currentGuess, turn, isGameOver, solution]
  );

  const resetGames = useCallback(() => {
    setTurn(0);
    setCurrentGuess("");
    setGuesses([...Array(6)].map(() => ""));
    setHistory([]);
    setIsGameOver(false);
    setIsWon(false);
    setError(null);

    // Fetch a new word
    setLoading(true);
    const fetchValid = async () => {
      if (!initialSolution) {
        setLoading(true);
        let isValid = false;
        let word;

        while (!isValid) {
          word = await getWord();
          isValid = await isValidWord(word);

        }
        setSolution(word);
        setLoading(false);
      }
    };

    fetchValid();
  }, []);

  return {
    turn,
    currentGuess,
    guesses,
    isGameOver,
    isWon,
    error,
    history,
    // Only reveal solution when game is over
    solution: isGameOver ? solution : null,
    loading,
    handleKeyInput,
    resetGames,
  };
};

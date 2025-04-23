import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    // Using external api from random-word
    // Length of 5 like typical wordle but might explicity do another hook for users to select the difficulty for random word lengths
    const response = await axios.get(
      "https://random-word.ryanrk.com/api/en/word/random/?length=5"
    );
    const word = response.data[0].toLowerCase();

    return NextResponse.json({ word });
  } catch (error) {
    console.error("Error fectching random word from api");
    return NextResponse.json({ error: error });
  }
}

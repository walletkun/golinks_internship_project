import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, { params }) {
  const { word } = await params;

  if (!word || word.length !== 5) {
    return NextResponse.json({
      valid: false,
      error: "Word must be 5 characters",
    });
  }

  try {
    // Using a dicitionary api to validate this inputted word
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    console.log("Validation response:", response.data);
    // Word does exist
    return NextResponse.json({ valid: true });
  } catch (error) {
    // Word does not exist in dictionary
    return NextResponse.json({ valid: false });
  }
}

// We'll use sql from vercel's postgres to do this anonymous leaderboard
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


// a GET endpoint for the retrieval of the leaderboard
export async function GET(){
    try{
        // Getting the top 10 scores sorted by number of guesses (ascending) and time (ascending)
        const { data, error } = await supabase.from('leaderboard').select("*").order("guesses", { ascending: true }).order("time_seconds", { ascending: true }).limit(10);
        // If an error arise throw that error
        if (error) throw error;

        return NextResponse.json({ leaderboard: data });
        
    }
    catch(error){
        console.error("Error fetching leaderboard: ", error);
        return NextResponse.json({
            error: error
        });
    }
}


// another endpoint for submitting the new score
export async function POST(request){
    try{
        const { nickname, guesses, timeSeconds, word } = await request.json();


        // Validate the inputs
        if (!nickname || !guesses || !timeSeconds || !word ) return NextResponse.json({ error: "Missing fields "});

        if (nickname.length > 20) return NextResponse.json({ error: "Too long of a nickname"});
        if (guesses < 1 || guesses > 6) return NextResponse.json({ error: "Invalid number of guesses "});

        // Inserting the score into supabase
          const { error } = await supabase
            .from('leaderboard')
            .insert([
                { 
                id: Date.now(),
                nickname, 
                guesses, 
                time_seconds: timeSeconds, 
                word 
                }
            ]);
        
        if (error) throw error;


        return NextResponse.json({ success: true, message: "Scored added to leaderboard "});
    }
    catch(error){
         console.error("Error adding score:", error);
         return NextResponse.json(
           { error: "Failed to add score to leaderboard" }
         );
    }

}
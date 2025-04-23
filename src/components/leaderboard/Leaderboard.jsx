"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LeaderboardTable = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/api/leaderboard");
        setLeaderboard(response.data.leaderboard);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError("Failed to load leaderboard");
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-pulse">
          <div className="flex space-x-1">
            {[..."LOADING"].map((letter, i) => (
              <div
                key={i}
                className="w-7 h-7 flex items-center justify-center bg-gray-200 text-transparent"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  // Function to determine rank style
  const getRankStyle = (index) => {
    if (index === 0) return "bg-[#6aaa64] text-white font-bold";
    if (index === 1) return "bg-[#c9b458] text-white font-bold";
    if (index === 2) return "bg-[#787c7e] text-white font-bold";
    return "bg-gray-100";
  };

  // Function to render word with letter tiles
  const renderWordTiles = (word) => {
    return (
      <div className="flex space-x-1 justify-center">
        {word.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-flex items-center justify-center w-6 h-6 bg-[#6aaa64] text-white text-xs font-bold uppercase"
          >
            {letter}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-16">
              Rank
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Player
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
              Guesses
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
              Time
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
              Word
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No scores yet. Be the first!
              </TableCell>
            </TableRow>
          ) : (
            leaderboard.map((entry, index) => (
              <TableRow
                key={index}
                className={`${
                  index < 3 ? "bg-gray-50" : ""
                } hover:bg-gray-50 transition-colors`}
              >
                <TableCell className="text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${getRankStyle(
                      index
                    )}`}
                  >
                    {index + 1}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{entry.nickname}</TableCell>
                <TableCell className="text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-[#6aaa64] text-white rounded-full text-sm font-bold mx-auto">
                    {entry.guesses}
                  </div>
                  <span className="text-gray-500 ml-1">/6</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {Math.floor(entry.time_seconds / 60)}m{" "}
                    {entry.time_seconds % 60}s
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {renderWordTiles(entry.word)}
                </TableCell>
                <TableCell className="text-gray-600 text-sm">
                  {new Date(entry.id).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;

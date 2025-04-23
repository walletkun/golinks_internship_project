"use client";

import Link from "next/link";
import LeaderboardTable from "@/components/leaderboard/Leaderboard";
import Footer from "@/components/layout/Footer";

export default function LeaderboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-12 bg-white">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold tracking-wide uppercase text-gray-800 text-center sm:text-left mb-4 sm:mb-0">
            Wordle Leaderboard
          </h1>
          <Link
            href="/"
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Game
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 bg-[#f8f9fa] rounded-t-lg border-b border-gray-200">
            <div className="flex justify-center space-x-1 mb-4">
              {["W", "O", "R", "D", "L", "E"].map((letter, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center font-bold text-white ${
                    index % 3 === 0
                      ? "bg-[#6aaa64]"
                      : index % 3 === 1
                      ? "bg-[#c9b458]"
                      : "bg-[#787c7e]"
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>
            <h2 className="text-center text-lg font-semibold text-gray-700">
              Top Players
            </h2>
          </div>

          <LeaderboardTable />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Can you make it to the top? Play more games to improve your ranking!
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Guessdle",
  description: "Guess like you would guess on wordle",
  metadataBase: new URL("https://guessdle.vercel.app/"),
  openGraph: {
    title: "Guessdle",
    description:
      "Guess like you would guess on wordle. But you got a leaderboard, coolio.",
    url: "https://guessdle.vercel.app",
    siteName: "Guessdle",
    images: [
      {
        url: "https://guessdle.vercel.app/guessdlesc.png",
        width: 1200,
        height: 630,
        alt: "Guessdle preview image",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/guessicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

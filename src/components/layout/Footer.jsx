"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="w-full py-2 px-4 mt-8 border-t border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              © {currentYear} Fei Lincs. All rights granted.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <motion.a
              href="https://github.com/walletkun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#6aaa64] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/fei-lincs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#c9b458] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://walletkun.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#787c7e] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Portfolio"
            >
              <Globe size={20} />
            </motion.a>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="flex justify-center space-x-1">
            {["G", "U", "E", "S", "S", "D", "L", "E"].map((letter, index) => (
              <div
                key={index}
                className={`w-6 h-6 flex items-center justify-center text-xs font-bold text-white ${
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
          <p className="text-xs text-gray-500 mt-2">
            A word guessing game inspired by Wordle
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

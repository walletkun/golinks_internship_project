"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Confetti = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create confetti particles
    const colors = ["#6aaa64", "#c9b458", "#787c7e", "#4285f4", "#ea4335"];
    const newParticles = [];

    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // random x position (0-100%)
        y: -20 - Math.random() * 10, // start above the viewport
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        velocity: {
          x: (Math.random() - 0.5) * 3,
          y: 3 + Math.random() * 2,
        },
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
          animate={{
            y: ["0%", "100%"],
            x: [`${particle.x}%`, `${particle.x + particle.velocity.x * 20}%`],
            rotate: [0, particle.rotation + 360],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            ease: "linear",
            repeat: 0,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;

import React from 'react';
import { motion } from 'framer-motion';

export const FloatingParticles: React.FC = () => {
  // Particles for light theme: Gold, Copper, Soft White
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 100 + 50, 
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
    color: i % 2 === 0 ? 'bg-brand-500/5' : 'bg-brand-300/10' // Subtle copper and beige
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full blur-2xl ${p.color}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};
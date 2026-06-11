'use client'

import React, { useState, useEffect, useMemo } from 'react'

export function FloatingParticles() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particles = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 40,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 5,
      color: i % 2 === 0 ? 'bg-brand-500/5' : 'bg-brand-300/10',
    })), [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-80px) translateX(25px) scale(1.15); }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full blur-2xl ${p.color}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `floatParticle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

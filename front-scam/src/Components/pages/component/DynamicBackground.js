import React from 'react';
import { motion } from 'framer-motion';

const DynamicBackground = () => {
  // Generate 80 random particles (bubbles) with different properties
  const bubbles = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 2, // Larger size range for bubbles
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10, // Longer duration for slower movement
    delay: Math.random() * 10,
    color: `rgba(${Math.floor(Math.random() * 55 + 200)}, 
              ${Math.floor(Math.random() * 55 + 200)}, 
              ${Math.floor(Math.random() * 55 + 200)}, 
              ${Math.random() * 0.2 + 0.1})`,
    driftX: (Math.random() - 0.5) * 15, // More horizontal movement
    driftY: (Math.random() - 0.5) * 20,
    scaleVariation: Math.random() * 0.5 + 0.8 // Scale animation
  }));

  // Generate 5 large gradient bubbles
  const gradientBubbles = Array.from({ length: 5 }).map((_, i) => ({
    id: `grad-${i}`,
    size: Math.random() * 30 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    color1: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
    color2: `hsl(${Math.random() * 60 + 250}, 80%, 60%)`
  }));

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter for bubbles */}
          <filter id="bubble-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Bubble gradient definition */}
          <radialGradient id="bubble-gradient" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Pattern for subtle texture */}
          <pattern id="texture" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill="rgba(255,255,255,0.03)" />
          </pattern>
        </defs>

        {/* Background texture */}
        <rect width="100" height="100" fill="url(#texture)" opacity="0.3" />

        {/* Large gradient bubbles */}
        {gradientBubbles.map((bubble) => (
          <React.Fragment key={bubble.id}>
            <defs>
              <radialGradient id={`gradBubble-${bubble.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={bubble.color1} stopOpacity="0.15" />
                <stop offset="100%" stopColor={bubble.color2} stopOpacity="0" />
              </radialGradient>
            </defs>
            <motion.circle
              cx={bubble.x}
              cy={bubble.y}
              r={bubble.size}
              fill={`url(#gradBubble-${bubble.id})`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                x: [bubble.x, bubble.x + (Math.random() - 0.5) * 10],
                y: [bubble.y, bubble.y + (Math.random() - 0.5) * 10]
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bubble.delay
              }}
            />
          </React.Fragment>
        ))}

        {/* Main bubbles with floating animation */}
        {bubbles.map((bubble) => (
          <motion.circle
            key={bubble.id}
            cx={bubble.x}
            cy={bubble.y}
            r={bubble.size}
            fill={bubble.color}
            filter="url(#bubble-glow)"
            initial={{ 
              opacity: 0,
              scale: bubble.scaleVariation
            }}
            animate={{
              opacity: [0, bubble.scaleVariation * 0.5, 0],
              x: [bubble.x, bubble.x + bubble.driftX],
              y: [bubble.y, bubble.y + bubble.driftY],
              scale: [bubble.scaleVariation, bubble.scaleVariation * 1.2, bubble.scaleVariation]
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bubble.delay
            }}
          />
        ))}

        {/* Bubble highlights for depth */}
        {bubbles.slice(0, 20).map((bubble) => (
          <motion.circle
            key={`highlight-${bubble.id}`}
            cx={bubble.x + bubble.size * 0.3}
            cy={bubble.y - bubble.size * 0.3}
            r={bubble.size * 0.3}
            fill="url(#bubble-gradient)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              x: [bubble.x, bubble.x + bubble.driftX * 0.5],
              y: [bubble.y, bubble.y + bubble.driftY * 0.5]
            }}
            transition={{
              duration: bubble.duration * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bubble.delay * 1.1
            }}
          />
        ))}
      </svg>

      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-pink-900/10 pointer-events-none"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default DynamicBackground;
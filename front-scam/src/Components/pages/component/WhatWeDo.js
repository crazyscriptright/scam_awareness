import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WhatWeDoSvg from '../../../Img/what_we_do.svg';

function WhatWeDo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animation values
  const yHeading = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const xSvg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.section 
      ref={ref}
      className="min-h-[100vh] py-9 px-6 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center relative overflow-hidden"
    >
      {/* Floating background elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-100 opacity-20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-purple-100 opacity-20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Main content container - Reversed order */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row-reverse items-center gap-8 relative z-10">
        {/* Text content - now on right side */}
        <motion.div 
          className="lg:w-1/2"
          style={{ y: yHeading }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-light text-gray-900 mb-6"
            initial={{ opacity: 0, x: 50 }} // Changed from -50 to 50 for right-side entrance
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                type: "spring",
                damping: 10,
                stiffness: 100
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            <span className="block font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              What We Do
            </span>
          </motion.h2>

          <motion.div style={{ y: yContent }}>
            {[
              "Our platform provides resources to help users identify scams, stay protected, and report fraud.",
              "We work with experts to ensure up-to-date information and secure reporting mechanisms.",
              "We also offer educational materials, interactive tools, and real-time alerts to keep our users informed and safe."
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { delay: 0.8 }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.a
              href="#"
              className="inline-flex items-center bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-medium tracking-wider group"
              whileHover={{ 
                backgroundColor: "#4F46E5",
                color: "#ffffff",
                borderColor: "#4F46E5"
              }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Learn More
              <motion.span
                className="ml-2 inline-block group-hover:translate-x-2 transition-transform"
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* SVG illustration - now on left side */}
        <motion.div 
          className="lg:w-1/2 flex justify-center"
          style={{ x: xSvg }}
        >
          <div className="relative w-full max-w-md">
            {/* Animated SVG container */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Main SVG from file with animations */}
              <motion.div
                className="relative"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <img 
                  src={WhatWeDoSvg} 
                  alt="What we do illustration"
                  className="w-full h-auto drop-shadow-lg"
                />
              </motion.div>
              
              {/* Additional animated elements */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Floating dots animation */}
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-blue-500 rounded-full"
                    style={{
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      opacity: 0.4
                    }}
                    animate={{
                      y: [0, (Math.random() - 0.5) * 30],
                      x: [0, (Math.random() - 0.5) * 30],
                    }}
                    transition={{
                      duration: Math.random() * 8 + 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default WhatWeDo;
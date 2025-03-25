import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function WhatWeDo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Enhanced animation values
  const yHeading = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <motion.section 
      ref={ref}
      className="min-h-[120vh] py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden"
    >
      {/* Lusion-style floating orb animations */}
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

      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 800" fill="none">
        {/* Moving horizontal lines */}
        <motion.path
          d="M0 200 L1440 200"
          stroke="#E5E7EB"
          strokeWidth="1"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: 100 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.path
          d="M0 400 L1440 400"
          stroke="#E5E7EB"
          strokeWidth="1"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: 100 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 3
          }}
        />

        {/* Animated connection dots */}
        <motion.circle
          cx="300" cy="300" r="2"
          fill="#4F46E5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.1, 1]
          }}
        />
        <motion.circle
          cx="800" cy="500" r="2"
          fill="#9333EA"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0.3, 0.4, 1],
            delay: 1
          }}
        />
      </svg>

      <motion.div 
        className="max-w-4xl mx-auto relative z-10"
        style={{ scale: scaleProgress }}
      >
        <motion.div style={{ y: yHeading }}>
          <motion.h2 
            className="text-5xl md:text-6xl font-light text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
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
        </motion.div>

        <motion.div style={{ y: yContent }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              "Our platform provides resources to help users identify scams, stay protected, and report fraud. We work with experts to ensure up-to-date information and secure reporting mechanisms. We also offer educational materials, interactive tools, and real-time alerts to keep our users informed and safe. Our dedicated support team is always available to assist you with any concerns related to online security."
            ].map((text, i) => (
              <motion.p
                key={i}
                className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-4 leading-relaxed text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1,
            transition: { delay: 0.8 }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-medium tracking-wider group"
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

      {/* Floating connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        <motion.path
          d="M200 100 Q500 300 800 100"
          stroke="#4F46E5"
          strokeWidth="1.5"
          strokeDasharray="5 3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>
    </motion.section>
  );
}

export default WhatWeDo;
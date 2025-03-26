import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaUsers, FaTrophy, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

// SVG Background Pattern Component
const DotsPattern = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" opacity="0.1" />
  </svg>
);

const achievements = [
  {
    icon: <FaUsers className="text-2xl" />,
    title: "Users",
    targetNumber: 50000,
    description: "Trusting our platform daily",
    textColor: "text-blue-600",
    hoverColor: "hover:bg-blue-50"
  },
  {
    icon: <FaTrophy className="text-2xl" />,
    title: "Scams Reported",
    targetNumber: 10000,
    description: "Fraudulent activities prevented",
    textColor: "text-grey-600",
    hoverColor: "hover:bg-purple-50"
  },
  {
    icon: <FaCheckCircle className="text-2xl" />,
    title: "Verified Reports",
    targetNumber: 7500,
    description: "Ensuring accuracy and credibility",
    textColor: "text-green-600",
    hoverColor: "hover:bg-green-50"
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: "Protected Users",
    targetNumber: 30000,
    description: "Safeguarded from threats",
    textColor: "text-indigo-600",
    hoverColor: "hover:bg-indigo-50"
  },
];

const NumberCounter = ({ targetNumber, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * targetNumber));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [isVisible, targetNumber]);

  return (
    <motion.span 
      className="text-5xl font-bold text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      style={{ fontFamily: "'Clash Display', sans-serif" }}
    >
      {count.toLocaleString()}+
    </motion.span>
  );
};

function OurAchievements() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yHeading = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yCards = useTransform(scrollYProgress, [0, 1], [0, 30]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-14 px-4 overflow-hidden bg-white"
    >
      {/* SVG Background Patterns */}
      <DotsPattern className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      
      {/* Animated gradient circles in background */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 5
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title with enhanced animation */}
        <motion.h2 
          className="text-center text-4xl md:text-5xl font-light px-4 mb-1"
          style={{ 
            y: yHeading, 
            fontFamily: "'Clash Display', sans-serif" 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-transparent font-medium font-bold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Our Impact
          </span>
        </motion.h2>

        {/* Cards grid with hover animations */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
          style={{ y: yCards }}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: "backOut"
                  } 
                }
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className={`p-8 h-full flex flex-col items-center text-center bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${achievement.hoverColor}`}>
                {/* Animated icon container */}
                <motion.div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${achievement.textColor.replace('text', 'bg')}/10 ${achievement.textColor} border ${achievement.textColor.replace('text', 'border')}/20`}
                  whileHover={{
                    rotate: 10,
                    scale: 1.1,
                    backgroundColor: achievement.textColor.replace('text', 'bg') + '/20'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {achievement.icon}
                </motion.div>
                
                <div className="h-20 flex items-center justify-center">
                  <NumberCounter 
                    targetNumber={achievement.targetNumber} 
                    isVisible={isVisible} 
                  />
                </div>
                
                <h3 
                  className={`text-lg font-medium mt-4 ${achievement.textColor}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {achievement.title}
                </h3>
                
                <p 
                  className="text-sm mt-2 text-gray-600"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {achievement.description}
                </p>
                
                {/* Animated underline on hover */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent transform -translate-x-1/2"
                  initial={{ width: '80%' }}
                  whileHover={{ 
                    width: '90%',
                    backgroundColor: achievement.textColor.replace('text', 'bg') + '/50'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default OurAchievements;
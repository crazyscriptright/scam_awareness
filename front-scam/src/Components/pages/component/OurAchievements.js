import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaUsers, FaTrophy, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

// Improved SVG Background Pattern Component
const BackgroundPattern = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 1000 600" 
    preserveAspectRatio="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Subtle gradient background */}
    <defs>
      <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#f1f5f9" />
      </linearGradient>
      
      <pattern 
        id="circle-pattern" 
        x="0" 
        y="0" 
        width="40" 
        height="40" 
        patternUnits="userSpaceOnUse"
      >
        <circle cx="20" cy="20" r="1.5" fill="#e2e8f0" opacity="0.3" />
      </pattern>
      
      <radialGradient id="radial-blur" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    <rect width="100%" height="100%" fill="url(#bg-gradient)" />
    <rect width="100%" height="100%" fill="url(#circle-pattern)" />
    
    {/* Animated blur circles */}
    <circle cx="20%" cy="30%" r="200" fill="url(#radial-blur)" opacity="0.15" />
    <circle cx="80%" cy="70%" r="250" fill="url(#radial-blur)" opacity="0.15" />
  </svg>
);

const achievements = [
  {
    icon: <FaUsers className="text-2xl" />,
    title: "Users",
    targetNumber: 50000,
    description: "Trusting our platform daily",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100"
  },
  {
    icon: <FaTrophy className="text-2xl" />,
    title: "Scams Reported",
    targetNumber: 10000,
    description: "Fraudulent activities prevented",
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100"
  },
  {
    icon: <FaCheckCircle className="text-2xl" />,
    title: "Verified Reports",
    targetNumber: 7500,
    description: "Ensuring accuracy and credibility",
    textColor: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-100"
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: "Protected Users",
    targetNumber: 30000,
    description: "Safeguarded from threats",
    textColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100"
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
      className="text-5xl font-bold"
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
      className="relative py-20 px-4 overflow-hidden "
    >
      {/* Improved Background */}
      <BackgroundPattern className="absolute top-0 left-0 w-full h-full pointer-events-none " />
      
      {/* Floating gradient blobs */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none "
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div 
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-[100px]"
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-[100px]"
          animate={{
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-indigo-500 opacity-15 blur-[80px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 6
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 ">
        {/* Enhanced Title */}
        <motion.div 
          className="text-center mb-16"
          style={{ y: yHeading }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold px-4 mb-3"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Our Impact in Numbers
            </span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Quantifying our commitment to security and trust
          </motion.p>
        </motion.div>

        {/* Enhanced Cards grid */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
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
                    ease: [0.16, 1, 0.3, 1] 
                  } 
                }
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <div className={`p-8 h-full flex flex-col items-center text-center bg-white rounded-2xl border ${achievement.borderColor} shadow-xs group-hover:shadow-md transition-all duration-300 group-hover:${achievement.bgColor}`}>
                {/* Enhanced icon container */}
                <motion.div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${achievement.bgColor} ${achievement.textColor} border ${achievement.borderColor} shadow-inner`}
                  whileHover={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1.1, 1],
                    transition: { duration: 0.6 }
                  }}
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
                  className={`text-lg font-semibold mt-4 ${achievement.textColor}`}
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
                
                {/* Enhanced underline animation */}
                <motion.div 
                  className="absolute bottom-6 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transform -translate-x-1/2"
                  initial={{ width: 0 }}
                  whileHover={{ 
                    width: '70%',
                    transition: { duration: 0.4 }
                  }}
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
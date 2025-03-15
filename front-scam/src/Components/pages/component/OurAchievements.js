import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaUsers, FaTrophy, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

const achievements = [
  {
    icon: <FaUsers className="text-4xl mx-auto mb-4" />,
    title: "Users",
    targetNumber: 50000,
    description: "People using our platform to stay safe.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <FaTrophy className="text-4xl mx-auto mb-4" />,
    title: "Scams Reported",
    targetNumber: 10000,
    description: "Fraudulent activities prevented.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: <FaCheckCircle className="text-4xl mx-auto mb-4" />,
    title: "Verified Reports",
    targetNumber: 7500,
    description: "Ensuring accuracy and credibility.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <FaShieldAlt className="text-4xl mx-auto mb-4" />,
    title: "Protected Users",
    targetNumber: 30000,
    description: "Users protected from scams.",
    color: "from-purple-500 to-purple-600",
  },
];

const NumberCounter = ({ targetNumber, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval;
    if (isVisible) {
      interval = setInterval(() => {
        setCount((prev) => Math.min(prev + Math.ceil(targetNumber / 100), targetNumber));
      }, 20);
    }

    return () => clearInterval(interval);
  }, [isVisible, targetNumber]);

  return <span className="text-3xl font-bold">{count.toLocaleString()}+</span>;
};

function OurAchievements() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className="py-12 px-6 bg-gradient-to-r from-gray-100 to-gray-200">
      <h2 className="text-center text-3xl font-bold mb-6">Our Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl aspect-square flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`bg-gradient-to-r ${achievement.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              {achievement.icon}
            </div>
            <h3 className="font-semibold text-xl">
              <NumberCounter targetNumber={achievement.targetNumber} isVisible={isVisible} />
            </h3>
            <h4 className="font-semibold text-lg mt-2">{achievement.title}</h4>
            <p className="text-sm mt-2 text-gray-600">{achievement.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default OurAchievements;

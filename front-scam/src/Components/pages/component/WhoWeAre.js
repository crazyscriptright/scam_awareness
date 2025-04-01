import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import whoweare from "../img/whoweare.jpg";
import { HashLink } from "react-router-hash-link";

export default function WhoWeAre() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);

  return (
    <motion.section 
      ref={ref}
      className="min-h-[120vh] py-20 px-8 relative flex items-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Background SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 800" fill="none">
        {/* Horizontal lines */}
        <motion.line
          x1="0" y1="100" x2="1440" y2="100"
          stroke="#E5E7EB"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.line
          x1="0" y1="300" x2="1440" y2="300"
          stroke="#E5E7EB"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        <motion.line
          x1="0" y1="500" x2="1440" y2="500"
          stroke="#E5E7EB"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6 }}
        />
        
        {/* Vertical lines */}
        <motion.line
          x1="200" y1="0" x2="200" y2="800"
          stroke="#E5E7EB"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <motion.line
          x1="800" y1="0" x2="800" y2="800"
          stroke="#E5E7EB"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        
        {/* Diagonal decorative lines */}
        <motion.path
          d="M0 400 L400 0"
          stroke="#4F46E5"
          strokeWidth="1.5"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.7 }}
        />
        <motion.path
          d="M1440 200 L1000 600"
          stroke="#9333EA"
          strokeWidth="1.5"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.9 }}
        />
      </svg>

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* Text Content - Left Side */}
        <motion.div
          className="lg:w-1/2"
          style={{ y: yText }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block">Who</span>
            <span className="block font-medium text-indigo-600">We Are</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            We are dedicated to raising awareness about scams, educating the public, and
            providing a secure platform to report fraudulent activities.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HashLink to="/aboutus">
            
            <motion.button
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-medium tracking-wider rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
            </HashLink>
          </motion.div>
        </motion.div>

        {/* Image Section - Right Side */}
        <motion.div 
          className="lg:w-1/2 relative"
          style={{ y: yImage }}
        >
          <motion.div
            className="relative overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img 
              src={whoweare}
              alt="Scam Awareness Illustration" 
              className="w-full h-auto rounded-lg shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}
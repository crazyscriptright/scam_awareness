import { motion } from "framer-motion";
import { FaLock, FaUsers, FaCheckCircle } from "react-icons/fa";

const PreventionTipsSection = () => {
  const tips = [
    {
      title: "Password Security",
      icon: <FaLock className="text-2xl" />,
      color: "text-green-500",
      bgColor: "bg-green-50",
      items: [
        "Use unique, complex passwords for each account",
        "Enable two-factor authentication (2FA)",
        "Consider using a password manager"
      ],
      svg: (
        <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100">
          <path 
            d="M20,50 Q50,20 80,50 T140,50" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
            strokeDasharray="5,2"
          >
            <animate 
              attributeName="stroke-dashoffset" 
              from="0" to="20" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </path>
          <circle cx="20" cy="50" r="3" fill="currentColor">
            <animate attributeName="cx" from="20" to="80" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
      )
    },
    {
      title: "Verification",
      icon: <FaUsers className="text-2xl" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      items: [
        "Verify unexpected requests via official channels",
        "Check for HTTPS and padlock icons on websites",
        "Be wary of unsolicited communications"
      ],
      svg: (
        <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none">
            <animate 
              attributeName="r" 
              values="30;35;30" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </circle>
          <path 
            d="M35,50 L45,60 L65,40" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none"
            strokeDasharray="100"
            strokeDashoffset="100"
          >
            <animate 
              attributeName="stroke-dashoffset" 
              from="100" to="0" 
              dur="1s" 
              begin="1s"
              fill="freeze" 
            />
          </path>
        </svg>
      )
    },
    {
      title: "Reporting",
      icon: <FaCheckCircle className="text-2xl" />,
      color: "text-red-500",
      bgColor: "bg-red-50",
      items: [
        "Report suspicious activity immediately",
        "Warn friends/family about circulating scams",
        "Monitor accounts for unauthorized activity"
      ],
      svg: (
        <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100">
          <path 
            d="M30,30 L70,30 L80,50 L70,70 L30,70 L20,50 Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          >
            <animate 
              attributeName="stroke-dasharray" 
              values="0,200;100,100;0,200" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </path>
          <path 
            d="M40,40 L60,60 M60,40 L40,60" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeDasharray="30"
            strokeDashoffset="30"
          >
            <animate 
              attributeName="stroke-dashoffset" 
              values="30;0;30" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-block text-sm font-medium text-blue-500 tracking-widest mb-2 px-4 py-1 bg-blue-50 rounded-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            STAY SAFE ONLINE
          </motion.span>
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Essential Prevention Tips
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Proactive measures to protect your digital identity and assets
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 h-full flex flex-col group-hover:shadow-lg overflow-hidden">
                <div className={`w-14 h-14 ${tip.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  <div className={tip.color}>
                    {tip.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{tip.title}</h3>
                
                <ul className="text-gray-600 space-y-3 flex-grow">
                  {tip.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className={`${tip.color} mr-3 mt-0.5`}>
                        <FaCheckCircle />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className={`text-sm font-medium ${tip.color} hover:opacity-80 transition-opacity flex items-center`}>
                    Learn more
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
                
                {/* Animated SVG */}
                <div className={tip.color}>
                  {tip.svg}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreventionTipsSection;
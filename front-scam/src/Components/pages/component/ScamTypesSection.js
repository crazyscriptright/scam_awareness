import { motion } from "framer-motion";
import { 
  FaExclamationTriangle, 
  FaShieldAlt, 
  FaNewspaper,
  FaPhone,
  FaShoppingCart,
  FaUserSecret,
  FaArrowRight,
  FaLink,
  FaMoneyBillWave,
  FaGift,
  FaExternalLinkAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ScamTypesSection = () => {
  const scamTypes = [
    {
      title: "Phishing Attacks",
      icon: <FaExclamationTriangle />,
      color: "from-blue-500 to-purple-600",
      href: "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams",
      description: "Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities.",
      diagram: (
        <div className="relative h-40 w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-30 rounded-xl"></div>
          <div className="absolute left-4 top-6 w-24 h-16 bg-white rounded-lg border border-blue-100 p-2 shadow-sm">
            <div className="h-2 bg-blue-200 rounded mb-1 w-3/4"></div>
            <div className="h-2 bg-blue-200 rounded mb-1 w-1/2"></div>
            <div className="h-2 bg-blue-200 rounded w-5/6"></div>
          </div>
          <div className="absolute left-32 top-10 flex items-center">
            <FaLink className="text-blue-500 mr-1" />
            <span className="text-xs font-mono bg-white px-2 py-1 rounded shadow-sm">
              secure-login<span className="text-red-400">.scam</span>.com
            </span>
          </div>
          <svg className="absolute left-28 top-16 w-16 h-8" viewBox="0 0 100 40">
            <path d="M0,20 L80,20" stroke="url(#phishArrow)" strokeWidth="2" fill="none" strokeDasharray="5,2" />
            <polygon points="80,20 70,15 70,25" fill="url(#phishArrow)" />
            <defs>
              <linearGradient id="phishArrow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute right-6 top-8 bg-white border border-red-200 rounded-full p-2 shadow-sm animate-pulse">
            <FaExclamationTriangle className="text-red-400" />
          </div>
        </div>
      )
    },
    {
      title: "Investment Frauds",
      icon: <FaMoneyBillWave />,
      color: "from-blue-500 to-purple-600",
      href: "https://www.investor.gov/introduction-investing/investing-basics/avoiding-fraud",
      description: "Too-good-to-be-true offers promising high returns with zero risk.",
      diagram: (
        <div className="relative h-40 w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 opacity-30 rounded-xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
              <path 
                d="M20,80 C40,60 60,90 80,50 C100,10 120,70 140,30 C160,-10 180,40 180,40" 
                stroke="url(#investmentLine)" 
                strokeWidth="3" 
                fill="none" 
              />
              <defs>
                <linearGradient id="investmentLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <text x="10" y="90" fontSize="8" fill="#6B7280">$100</text>
              <text x="170" y="15" fontSize="8" fill="#6B7280">$10,000</text>
              <text x="80" y="10" fontSize="10" fill="#EF4444" textAnchor="middle" fontWeight="bold">
                "Guaranteed Returns"
              </text>
              <circle cx="20" cy="80" r="3" fill="#F59E0B" />
              <circle cx="180" cy="40" r="3" fill="#EC4899" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border border-amber-200">
            <span className="text-xs text-amber-600 font-medium">Risk: Very High</span>
          </div>
        </div>
      )
    },
    {
      title: "Social Media Scams",
      icon: <FaNewspaper />,
      color: "from-blue-500 to-purple-600",
      href: "https://www.ftc.gov/news-events/topics/identity-theft/social-media-account-hijacking",
      description: "Fake giveaways, impersonation, and romance scams on social platforms.",
      diagram: (
        <div className="relative h-40 w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-30 rounded-xl"></div>
          <div className="absolute left-4 top-6 w-16 h-16 bg-white rounded-lg border border-purple-100 p-2 shadow-sm">
            <div className="h-2 bg-purple-200 rounded mb-1"></div>
            <div className="h-6 bg-purple-100 rounded mt-2"></div>
          </div>
          <div className="absolute left-24 top-4 w-20 h-20 bg-white rounded-lg border border-purple-100 p-2 shadow-sm">
            <div className="h-2 bg-purple-200 rounded mb-1"></div>
            <div className="h-8 bg-purple-100 rounded mt-2 flex items-center justify-center text-xs text-purple-500">
              FREE!
            </div>
          </div>
          <div className="absolute right-4 top-8 w-16 h-16 bg-white rounded-lg border border-purple-100 p-2 shadow-sm">
            <div className="h-2 bg-purple-200 rounded mb-1"></div>
            <div className="h-6 bg-purple-100 rounded mt-2"></div>
          </div>
        </div>
      )
    },
    {
      title: "Tech Support Scams",
      icon: <FaPhone />,
      color: "from-blue-500 to-purple-600",
      href: "https://www.fbi.gov/scams-and-safety/common-scams-and-crimes/tech-support-scams",
      description: "Cold calls claiming your device is infected with viruses.",
      diagram: (
        <div className="relative h-40 w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-30 rounded-xl"></div>
          <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-24 h-16 bg-white rounded-lg border border-red-100 p-2 shadow-sm">
            <div className="h-1 bg-red-200 rounded mb-1"></div>
            <div className="h-1 bg-red-200 rounded mb-1 w-3/4"></div>
            <div className="h-4 bg-red-100 rounded mt-2 flex items-center justify-center">
              <span className="text-xs text-red-500 font-bold">VIRUS ALERT!</span>
            </div>
          </div>
          <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 w-12 h-20 bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            <div className="h-1 bg-gray-300 rounded-full mb-1 w-1/2 mx-auto"></div>
            <div className="h-12 bg-red-50 rounded-lg mt-2 flex items-center justify-center">
              <FaPhone className="text-red-400" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Fake Shopping Sites",
      icon: <FaShoppingCart />,
      color: "from-blue-500 to-purple-600",
      href: "https://www.bbb.org/article/news-releases/22740-bbb-tip-how-to-avoid-fake-website-scams",
      description: "Counterfeit stores offering luxury items at unbelievable prices.",
      diagram: (
        <div className="relative h-40 w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 opacity-30 rounded-xl"></div>
          <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-32 h-24 bg-white rounded-lg border border-emerald-100 p-2 shadow-sm">
            <div className="h-12 bg-emerald-50 rounded mb-2 flex items-center justify-center">
              <FaGift className="text-emerald-400 text-xl" />
            </div>
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-emerald-600">$49.99</span>
              <span className="text-xs line-through text-gray-400">$499.99</span>
            </div>
          </div>
          <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 text-xs text-red-400 font-medium">
            Item never arrives
          </div>
        </div>
      )
    },
    {
      title: "Romance Scams",
      icon: <FaUserSecret />,
      color: "from-blue-500 to-purple-600",
      href: "https://www.ftc.gov/news-events/topics/identity-theft/romance-scams",
      description: "Fake online relationships that eventually ask for financial help.",
      diagram: (
        <div className="relative h-40 w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-pink-100 opacity-30 rounded-xl"></div>
          <div className="absolute left-6 top-8 w-24 bg-white rounded-t-lg rounded-br-lg p-2 shadow-sm border border-pink-100">
            <p className="text-xs text-pink-600">Hi beautiful! 😍</p>
          </div>
          <div className="absolute right-6 top-20 w-24 bg-white rounded-t-lg rounded-bl-lg p-2 shadow-sm border border-pink-100">
            <p className="text-xs text-pink-600">Thanks! 😊</p>
          </div>
          <div className="absolute left-6 top-32 w-32 bg-white rounded-t-lg rounded-br-lg p-2 shadow-sm border border-pink-100">
            <p className="text-xs text-pink-600">Need $500 for plane ticket ✈️</p>
          </div>
          <div className="absolute left-1/2 top-12 transform -translate-x-1/2">
            <svg className="w-8 h-8 text-pink-400 animate-pulse" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="absolute right-4 top-32 w-6 h-6 rounded-full bg-gradient-to-r from-pink-300 to-pink-500 shadow-sm"></div>
          <div className="absolute left-4 top-10 w-4 h-4 rounded-full bg-gradient-to-r from-pink-200 to-pink-400 shadow-sm"></div>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Lusion-style floating elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-100 opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block text-xs font-semibold text-blue-600 tracking-widest mb-3 px-3 py-1 bg-white rounded-full shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            DIGITAL THREATS
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-[600]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Modern Scam <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Patterns</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Recognizing these sophisticated scams is your first defense
          </motion.p>
        </div>
        
        <div className="px-2">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="pb-12"
          >
            {scamTypes.map((scam, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/50 overflow-hidden transition-all duration-300 hover:border-white/80 h-full"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white bg-gradient-to-r ${scam.color} shadow-md`}>
                      {scam.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{scam.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{scam.description}</p>
                    
                    <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
                      {scam.diagram}
                    </div>
                    
                    <Link 
                      to={scam.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-gradient-to-r ${scam.color} bg-opacity-10 text-${scam.color.split(' ')[0].replace('from-','')}-600 font-medium hover:bg-opacity-20 transition-all group`}
                    >
                      <span>Learn more</span>
                      <FaExternalLinkAlt className="ml-2 transition-transform group-hover:translate-x-1 text-sm" />
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ScamTypesSection;
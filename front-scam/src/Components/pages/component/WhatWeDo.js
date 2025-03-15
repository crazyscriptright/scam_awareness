import React, { useState } from 'react';

function WhatWeDo() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight transition-all duration-300 hover:text-blue-600">
          What We Do
        </h2>
        <p className="max-w-3xl mx-auto text-lg mb-8 text-gray-600 leading-relaxed transition-all duration-300 hover:text-gray-800">
          Our platform provides resources to help users identify scams, stay protected, and
          report fraud. We work with experts to ensure up-to-date information and secure
          reporting mechanisms. We also offer educational materials, interactive tools, and
          real-time alerts to keep our users informed and safe. Our dedicated support team
          is always available to assist you with any concerns related to online security.
        </p>
        <div className="mt-10">
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transition-all duration-500 hover:shadow-xl transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
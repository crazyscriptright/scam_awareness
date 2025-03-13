import React, { useState } from 'react';
import awarenessIcon from "../img/awareness-icon.png"; // Replace with your icon/image
import educationIcon from "../img/education-icon.png"; // Replace with your icon/image
import reportIcon from "../img/report-icon.png"; // Replace with your icon/image
import moreIcon from "../img/more-icon.png"; // Replace with your icon/image

function WhatWeDo() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="py-12 px-6 bg-white text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
        <p className="max-w-3xl mx-auto text-lg mb-8">
          We are dedicated to raising awareness about scams, educating the public, and
          providing a secure platform to report fraudulent activities.
        </p>

        {/* Features Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <img 
              src={awarenessIcon}
              alt="Awareness Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Raise Awareness</h3>
            <p className="text-gray-600">
              Educate the public about common scams and how to avoid them.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <img 
              src={educationIcon}
              alt="Education Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Provide Education</h3>
            <p className="text-gray-600">
              Offer resources and tools to help people recognize and prevent scams.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <img 
              src={reportIcon}
              alt="Report Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Secure Reporting</h3>
            <p className="text-gray-600">
              A safe platform to report fraudulent activities and seek help.
            </p>
          </div>
        </div>

        {/* Additional Content */}
        {showMore && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Additional Feature 1 */}
            <div className="flex flex-col items-center">
              <img 
                src={moreIcon}
                alt="More Icon"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Additional Feature 1</h3>
              <p className="text-gray-600">
                More information about this additional feature.
              </p>
            </div>

            {/* Additional Feature 2 */}
            <div className="flex flex-col items-center">
              <img 
                src={moreIcon}
                alt="More Icon"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Additional Feature 2</h3>
              <p className="text-gray-600">
                More information about this additional feature.
              </p>
            </div>

            {/* Additional Feature 3 */}
            <div className="flex flex-col items-center">
              <img 
                src={moreIcon}
                alt="More Icon"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Additional Feature 3</h3>
              <p className="text-gray-600">
                More information about this additional feature.
              </p>
            </div>
          </div>
        )}

        {/* View More Button */}
        <button 
          onClick={toggleShowMore}
          className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {showMore ? "View Less" : "View More"}
        </button>
      </div>
    </section>
  );
}

export default WhatWeDo;
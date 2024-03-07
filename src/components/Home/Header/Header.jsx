
"use client"

import { useState, useEffect } from 'react';
import './header.css'
// bg-[#ffb386]

const Header = () => {
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [componentsMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (componentsMounted) {
      initialize();
    }
  }, [componentsMounted]);

  function initialize() {
    const fetchRandomQuote = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setCurrentQuote({ text: data.content, author: data.author });
      } catch (error) {
        console.error('Error fetching quote:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch initial quote
    fetchRandomQuote();

    // Fetch a new quote every 30 seconds
    const intervalId = setInterval(fetchRandomQuote, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }

  // bg-[#016961]

  return (
    <div>
      <div className="relative bg">
        {/* bottom curve */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-teal-50"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>

        {/* Information section */}
        <div className="text-center px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-3xl md:max-w-4xl sm:text-center">
            {isLoading ? (
              <>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </>
            ) : (
              <>
                <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                  {currentQuote.text}
                </h2>
                <p className="max-w-md mb-10 text-sm text-gray-100 sm:text-sm sm:mx-auto md:mb-16">
                  <span>-</span> {currentQuote.author}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

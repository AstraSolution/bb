"use client";

import React, { useEffect, useState } from "react";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import SuggestedCard from "./SuggestedCard";
import ComponentLoading from "@/components/Shared/loadingPageBook/ComponentLoading";
import useBookSuggestion from "@/Hooks/SuggesteBooks/useBookSuggestion";

const SuggestedBooks = ({ CurrentlyViewing }) => {
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const { interestedBooks, topTearSuggestions, suggetionsLoading } =
    useBookSuggestion(CurrentlyViewing);

  const handleNextButtonClick = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handlePrevButtonClick = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleSwiperInit = (swiperInstance) => {
    setSwiper(swiperInstance);
    setSwiperInitialized(true);
  };

  useEffect(() => {
    if (swiper) {
      swiper.update();
    }
  }, [swiper]);

  if (suggetionsLoading) {
    return (
      <div className="my-20">
        <ComponentLoading />
      </div>
    );
  }

  return (
    <>
      <div className="min-w-full gap-3 mt-16 lg:mt-36">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl text-[#016961] font-bold text-nowrap">
            You Might Like
          </h2>
          <hr className="hr" />
          <div className="flex items-center justify-end gap-3">
            {/* Previous Button */}
            <button
              className="button-color p-1.5 md:p-2 rounded-full text-teal-50 flex items-center gap-1"
              onClick={handlePrevButtonClick}
              aria-label="Previous Slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12 15.75 4.5"
                />
              </svg>
            </button>
            {/* Next Button */}
            <button
              className="button-color p-1.5 md:p-2 rounded-full text-teal-50 flex items-center gap-1"
              onClick={handleNextButtonClick}
              aria-label="Next Slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Swiper Component */}
        <Swiper
          direction="horizontal"
          spaceBetween={13}
          onSwiper={handleSwiperInit}
          controller={{ control: (swiper) => (window.swiper = swiper) }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
          }}
        >
          {swiperInitialized ? (
            topTearSuggestions.map((cardInfo, index) => (
              <SwiperSlide key={cardInfo.id}>
                <SuggestedCard cardInfo={cardInfo} index={index} />
              </SwiperSlide>
            ))
          ) : (
            <ComponentLoading />
          )}
        </Swiper>
      </div>
    </>
  );
};

export default SuggestedBooks;

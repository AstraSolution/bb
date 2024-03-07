"use client";

import "swiper/css/bundle";
import { useEffect, useState } from "react";
import BookCard from "../../Shared/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import ComponentLoading from "@/components/Shared/loadingPageBook/ComponentLoading";
import BookCardSkeleton from "@/components/Skeleton/BookCardSkeleton";

SwiperCore.use([Navigation]);

export default function BuyNow() {
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://boi-binimoy-server.vercel.app/api/v1/buy-books"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        // Fisher-Yates Shuffle Algorithm
        const shuffledBooks = result.buyBooks.slice();
        for (let i = shuffledBooks.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
        }

        setBooks(shuffledBooks.slice(0, 12));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


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

  if (loading) {
    return (
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array.from(Array(6).keys()).map((index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mt-12 md:mt-14 mx-auto px-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl text-[#016961] font-bold text-nowrap">
          Buy Now
        </h2>
        <hr className="hr " />
        <div className="flex items-center justify-end gap-3 text-nowrap">
          {/* View All button */}
          <Link href={`/buyBooks`}>
            <button className="button-color px-4 py-2 rounded-full text-sm md:text-base text-teal-50 flex items-center gap-1">
              View All{" "}
              <span className="text-xl">
                <FiArrowUpRight />
              </span>
            </button>
          </Link>
          {/* Previous Button */}
          <button
            className="button-color p-1.5 md:p-2 rounded-full text-teal-50 flex items-center gap-1"
            onClick={handlePrevButtonClick}
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
      <Swiper
        direction="horizontal"
        spaceBetween={13}
        onSwiper={handleSwiperInit}
        controller={{ control: (swiper) => (window.swiper = swiper) }}
        slidesPerView={2} // Set a default value
        breakpoints={{
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        }}
      >
        {swiperInitialized ? (
          books?.map((item) => (
            <SwiperSlide key={item?._id}>
              <BookCard item={item} />
            </SwiperSlide>
          ))
        ) : (
          <ComponentLoading />
        )}
      </Swiper>
    </div>
  );
}

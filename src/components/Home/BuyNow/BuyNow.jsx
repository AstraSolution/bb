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
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";


SwiperCore.use([Navigation]);

export default function BuyNow() {
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const axiosPublic = useAxiosPublic();

  const { data: bookData = [], isLoading: loading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosPublic.get(`api/v1/buy-books`);
      return res.data;
    },
  });

  // Fisher-Yates Shuffle Algorithm
  const shuffledBooks = bookData?.buyBooks?.slice();
  for (let i = shuffledBooks?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
  }

  const books = shuffledBooks?.slice(0, 12);



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
        <h2 className="text-xl md:text-3xl text-[#016961] font-bold text-nowrap">
          Buy Now
        </h2>
        <hr className="hr " />
        <div className="flex items-center justify-end gap-2 md:gap-3 text-nowrap">
          {/* View All button */}
          <Link href={`/buyBooks`}>
            <button className="button-color px-2.5 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base text-teal-50 flex items-center gap-1">
              View All{" "}
              <span className="text-base md:text-xl">
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
              className="w-5 h-5 md:w-6 md:h-6"
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
              className="w-5 h-5 md:w-6 md:h-6"
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

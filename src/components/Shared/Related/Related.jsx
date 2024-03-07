"use client";

import "swiper/css/bundle";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import RelatedCard from "./RelatedCard";
import { FiArrowUpRight } from "react-icons/fi";
import ComponentLoading from "@/components/Shared/loadingPageBook/ComponentLoading";

const Related = () => {
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const [swiper, setSwiper] = useState(null);

  const cardsInfo = [
    {
      id: 1,
      img: "https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg",
      title: "BIG MAGIC",
      auther: "Elizabeth Gilbert",
      color: "#EB5757",
      details:
        "Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books for years.",
    },
    {
      id: 2,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1kNdYXw0GL.jpg",
      title: "Ten Thousand Skies Above",
      auther: "Claudia Gray",
      color: "#A4E0EB",
      details:
        "The hunt for each splinter of Paul's soul sends Marguerite racing through a war-torn San Francisco.",
    },
    {
      id: 3,
      img: "https://images-na.ssl-images-amazon.com/images/I/81eI0ExR+VL.jpg",
      title: "A Tale For The Time Being",
      auther: "Ruth Ozeki",
      color: "#EDB9D6",
      details:
        "In Tokyo, sixteen-year-old Nao has decided there’s only one escape from her aching loneliness and her classmates’ bullying.",
    },
    {
      id: 4,
      img: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
      title: "The Great Gatsby",
      auther: "F.Scott Fitzgerald",
      color: "#FDCA95",
      details:
        "The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career.",
    },
    {
      id: 5,
      img: "https://images-na.ssl-images-amazon.com/images/I/81UWB7oUZ0L.jpg",
      title: "After You",
      auther: "Jojo Moyes",
      color: "#CBB5E2",
      details:
        "Louisa Clark is no longer just an ordinary girl living an ordinary life. After the transformative six months spent.",
    },
  ];

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

  return (
    <>
      <div className="min-w-full gap-3 mt-36 mb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl text-[#016961] font-bold text-nowrap">
            Related Books
          </h2>
          <hr className="hr " />
          <div className="flex items-center justify-end gap-3 text-nowrap">
            {/* View All button */}
            <button className="button-color px-4 py-2 rounded-full text-sm md:text-base text-teal-50 flex items-center gap-1">
              View All{" "}
              <span className="text-xl">
                <FiArrowUpRight />
              </span>
            </button>
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
        >
          {swiperInitialized ? (
            cardsInfo.map((cardInfo) => (
              <SwiperSlide key={cardInfo.id}>
                <RelatedCard cardInfo={cardInfo}></RelatedCard>
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

export default Related;

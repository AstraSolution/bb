"use client";

import React, { useEffect, useState } from "react";
import BookCard from "../../Shared/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FiArrowUpRight } from "react-icons/fi";
import ComponentLoading from "@/components/Shared/loadingPageBook/ComponentLoading";
import useBookSuggestion from "@/Hooks/SuggesteBooks/useBookSuggestion";


export default function ForYou() {
    const [swiperInitialized, setSwiperInitialized] = useState(false);
    const [swiper, setSwiper] = useState(null);
    const {topTearSuggestions, suggetionsLoading} = useBookSuggestion()
    
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
    ;


    useEffect(() => {
        if (swiper) {
            swiper.update();
        }
    }, [swiper]);

    if( suggetionsLoading ) {
        <div><ComponentLoading/></div>
    }


    return (
        <div className="container mt-12 md:mt-16 mx-auto px-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl md:text-3xl text-[#016961] font-bold text-nowrap">For You</h2>
                <hr className="hr " />
                <div className="flex items-center justify-end gap-3 text-nowrap">
                    {/* Previous Button */}
                    <button className="button-color p-1.5 md:p-2 rounded-full text-teal-50 flex items-center gap-1" onClick={handlePrevButtonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12 15.75 4.5" />
                        </svg>
                    </button>
                    {/* Next Button */}
                    <button className="button-color p-1.5 md:p-2 rounded-full text-teal-50 flex items-center gap-1" onClick={handleNextButtonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
            <Swiper
                spaceBetween={13}
                onSwiper={handleSwiperInit}
                controller={{ control: swiper => (window.swiper = swiper) }}
                slidesPerView={2}
                breakpoints={{
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1200: { slidesPerView: 6 },
                }}
            >
                {swiperInitialized ? (
                    topTearSuggestions.map(item => (
                        <SwiperSlide key={item._id}>
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

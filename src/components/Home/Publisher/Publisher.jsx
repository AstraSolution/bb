"use client";

import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import PublisherCard from "./PublisherCard";
import PublisherCardSkeleton from "@/components/Skeleton/PublisherCardSkeleton";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function Publisher() {
  const axiosPublic = useAxiosPublic();
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/publishers`);
      return res.data;
    },
  });

  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-5 my-16">
      <div className="bg-50-50 border border-[#016961] rounded-lg p-5">
        <div className="flex justify-between items-center gap-4 mb-5">
          <h2 className="text-[#016961] text-base md:text-lg lg:text-3xl font-bold">
            Shop By Publisher
          </h2>
          <Link
            href={"/publisher"}
            className="py-1 lg:py-2 px-2 lg:px-3 bg-[#016961] hover:bg-teal-600 text-xs lg:text-sm text-white rounded-full flex justify-center items-center gap-2"
          >
            View All <MdArrowOutward className="text-xs lg:text-sm" />
          </Link>
        </div>

        {/* slider start */}
        <div className="slider-container">
          <Slider {...settings}>
            {isLoading
              ? Array.from(Array(8).keys()).map((index) => (
                  <PublisherCardSkeleton key={index} />
                ))
              : publishers
                  ?.slice(0, 20)
                  ?.map((item) => <PublisherCard key={item._id} item={item} />)}
          </Slider>
        </div>
        {/* slider end */}
      </div>
    </div>
  );
}

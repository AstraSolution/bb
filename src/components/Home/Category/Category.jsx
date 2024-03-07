"use client";

import React, { useRef } from "react";
import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "@/components/Skeleton/CategoryCardSkeleton";
import Link from "next/link";
import { CgArrowTopRightO } from "react-icons/cg";

export default function Category() {
  const axiosPublic = useAxiosPublic();
  const sliderRef = useRef(null);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/category`);
      return res.data;
    },
  });

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto my-10 relative px-10">
      {/* <h3 className=" text-center my-5 text-3xl font-medium text-[#016961]">Categories</h3> */}
      <Slider ref={sliderRef} {...settings}>
        {isLoading
          ? Array.from(Array(8).keys()).map((index) => (
            <CategoryCardSkeleton key={index} />
          ))
          : categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
      </Slider>

      {isLoading || (
        <Link
          href={"/categories"}
          className="absolute right-5 bg-teal-50 rounded-full top-[40%] cursor-pointer"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-800 opacity-75"></span>
          <span className="text-4xl text-[#016961]">
            <CgArrowTopRightO />
          </span>
        </Link>
      )}
    </div>
  );
}

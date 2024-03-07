"use client";

import { useQuery } from "@tanstack/react-query";
import CategoryCardSkeleton from "../Skeleton/CategoryCardSkeleton";
import CategoryCard from "../Home/Category/CategoryCard";
import useAxiosPublic from '@/Hooks/Axios/useAxiosPublic';

export default function Categories() {

  const axiosPublic = useAxiosPublic();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/category`);
      return res.data;
    },
  });

  return (
    <div className="container mx-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
      {isLoading
        ? Array.from(Array(8).keys()).map((index) => (
          <CategoryCardSkeleton key={index} />
        ))
        : categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
    </div>
  );
}

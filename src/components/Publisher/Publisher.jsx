"use client";

import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PublisherCardSkeleton from "../Skeleton/PublisherCardSkeleton";
import { IoSearch } from "react-icons/io5";
import AllPublisherCard from "./AllPublisherCard";

export default function Categories() {
  const axiosPublish = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allPublishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublish.get(`/api/v1/publishers`);
      return res.data;
    },
  });

  const filteredPublishers = allPublishers.filter((publisher) =>
    publisher.publisher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center my-6">
        <input
          type="text"
          placeholder="Search by Publisher"
          value={searchQuery}
          onChange={handleSearchChange}
          className="py-3 px-6 border w-[350px] max-w-[500px] rounded-full shadow-md focus:outline-none bg-teal-50"
        />
        <IoSearch className="-ml-10 text-2xl text-teal-800" />
      </div>

      <div className="mb-20 mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {isLoading ? (
          Array.from(Array(20).keys()).map((index) => (
            <PublisherCardSkeleton key={index} />
          ))
        ) : filteredPublishers.length > 0 ? (
          filteredPublishers.map((item) => (
            <AllPublisherCard key={item._id} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}

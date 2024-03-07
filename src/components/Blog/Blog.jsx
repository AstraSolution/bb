"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";
import Link from "next/link";
import PageLoading from "../Shared/loadingPageBook/PageLoading";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/blogs`);
      return res.data;
    },
  });

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  if (isLoading) {
    return <PageLoading />;
  }

  if (blogs.length === 0) {
    return (
      <div>
        <h1 className="text-center justify-center font-semibold md:text-3xl lg:text-4xl">
          Blogs Not Found.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 mb-10 lg:mb-36 px-3">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col lg:flex-row items-center gap-3 mb-5">
            {/* Search input */}
            <div className="flex items-center gap-3 w-full p-2 mb-4 border border-teal-800 bg-teal-50/40 shadow-md rounded-md">
              <FiSearch className="text-xl text-teal-800" />
              <input
                type="text"
                placeholder="Search blogs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full lg:w-fit p-2 mb-4 border border-teal-800 bg-teal-50/40 shadow-md rounded-md focus:outline-none"
            >
              <option value="">All Categories</option>
              {/* Add options dynamically based on available categories */}
              {Array.from(new Set(blogs.map((blog) => blog.category))).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Blogs display */}
          {blogs
            .filter((blog) =>
              blog.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .filter(
              (blog) => !selectedCategory || blog.category === selectedCategory
            )
            .slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage)
            .map((blog) => (
              <div key={blog?._id} className="mb-10 cursor-pointer">
                <div key={blog?._id} className="mb-10">
                  <Image
                    src={blog?.cover_image}
                    priority
                    width={500}
                    height={500}
                    alt="Main blog"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="flex justify-between items-center my-3 lg:px-2">
                    <div className="text-xs text-gray-500">
                      <p>
                        Published on: {blog?.publish_date} at{" "}
                        {blog?.publish_time}
                      </p>
                      <p>Reading Time: {calculateReadingTime(blog.body)} min</p>
                    </div>
                    <div>
                      <p className="bg-[#016961] px-2 py-1 rounded-md text-xs text-white">
                        {blog?.category}
                      </p>
                    </div>
                  </div>

                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my- leading-tight">
                    {blog?.title}
                  </h1>

                  <div
                    onClick={() =>
                      setExpandedBlogs((prev) => ({
                        ...prev,
                        [blog?._id]: !prev[blog?._id],
                      }))
                    }
                    className="mt-2 text-xs sm:text-sm md:text-base text-justify"
                  >
                    {expandedBlogs[blog?._id] ? (
                      blog?.body?.split("\n").map((paragraph, index) => (
                        <p key={index}>
                          {paragraph} <br />
                        </p>
                      ))
                    ) : (
                      <>
                        {blog?.body
                          ?.slice(0, 300)
                          .split("\n")
                          .map((paragraph, index) => (
                            <p key={index}>
                              {paragraph} <br />
                            </p>
                          ))}
                        {blog?.body?.length > 300 && (
                          <p className="text-sm text-gray-500">... read more</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {/* Pagination controls */}
          <div className="flex justify-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-2 px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-[#016961] text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Recently Added blog */}
        <div className="w-full lg:w-1/3">
          <h1 className="text-3xl font-semibold text-[#016961] pb-5">
            Recently Added
          </h1>
          {blogs?.slice(-5).map((blog) => (
            // <BlogSideCard key={blog?._id} item={blog}></BlogSideCard>
            <div key={blog?._id}>
              <div className="rounded-md w-full flex flex-col md:flex-row mb-5 lg:mb-3 gap-2 lg:gap-5">
                <div className="w-full lg:w-[210px] h-[120px]">
                  <Image
                    src={blog?.cover_image}
                    width={500}
                    height={500}
                    priority
                    alt="side"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="pt-2 w-full lg:w-2/3">
                  <Link title={blog?.title} href={`/blogs/${blog?._id}`}>
                    <span className="text-gray-600 hover:text-gray-800 text-justify font-semibold mb-2">
                      {blog?.title.length < 65
                        ? blog?.title
                        : `${blog?.title.slice(0, 65) + ".."}`}
                    </span>
                  </Link>
                  <p className="w-fit px-2 py-1 bg-[#016961]/90 rounded-md text-white text-xs font-semibold mt-2">
                    {blog?.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

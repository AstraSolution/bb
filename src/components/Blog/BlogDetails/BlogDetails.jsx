"use client";

import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";

const BlogDetails = ({}) => {
  const param = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: blog = [], isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/blogs/${param.blogId}`);
      return res.data;
    },
  });

  return (
    <div className="w-full bg-teal-50">
      {/* Banner */}
      <div className="relative bg-[#016961]">
        {/* bottom curve */}
        <div className="absolute inset-x-0 bottom-0 ">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-teal-50"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>

        {/* Information section */}
        <div className="text-center px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-5xl">
              Blog of &quot;{blog?.title}&quot;
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-3">
        {/* book img and information section */}
        <div>
          {/* book img section */}
          <div className="w-full">
            <Image 
              src={blog?.cover_image}
              alt="book"
              width={500}
              height={500}
              priority
              className="object-cover w-full h-96 rounded-lg"
            />
          </div>

          {/* book information section */}
          <div className="py-3 space-y-2">
            <p className="text-sm sm:text-base font-bold text-[#016961]">
              {blog?.category}
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              {blog?.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-justify">
              {blog?.body?.split("\n").map((paragraph, index) => (
                <p key={index}>
                  {paragraph} <br />
                </p>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

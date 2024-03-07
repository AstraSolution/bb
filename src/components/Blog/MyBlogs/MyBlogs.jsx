"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";
import MyBlogCard from "../../Shared/Blogs/MyBlogCard";
import PageLoading from "@/components/Shared/loadingPageBook/PageLoading";

const AllBlog = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/blogs`);
      return res.data;
    },
  });

  if (isLoading) {
    return <PageLoading></PageLoading>;
  }

  return (
    <div className="min-h-screen container mx-auto px-3">
      <div className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {blogs?.map((blog) => (
            <MyBlogCard key={blog?._id} item={blog} refetch={refetch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlog;

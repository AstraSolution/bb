"use client";
import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosSecure from "../Axios/useAxiosSecure";

const useWishListBook = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const fetchData = async () => {
    try {
        const email = localStorage.getItem("email");
        const res = await axiosSecure.get(`https://boi-binimoy-server-ashy.vercel.app/api/v1/wishlist/${email}`);
        return res.data;
     
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  };

  const queryKey = useMemo(() => ["wishListBook", user?.email], [user?.email]);

  const { data: wishListBook = [], refetch, isLoading } = useQuery({
    queryKey,
    queryFn: fetchData,
    enabled: !!user?.email,
  });

  return [wishListBook, refetch, isLoading];
};

export default useWishListBook;

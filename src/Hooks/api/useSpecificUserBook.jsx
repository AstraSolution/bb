"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const useSpecificUserBook = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const fetchData = async () => {
    if (user && user.email) {
      const res = await axiosSecure.get(`/api/v1/buy-books-individual/${user.email}`);
      return res.data;
    } else {
      return []; 
    }
  };

  const { data: specificBooks = [], refetch, isLoading, } = useQuery({
    queryKey: ["specificBooks"],
    queryFn: fetchData,
    enabled: !!user && !!user.email, 
  });

  return [specificBooks, refetch, isLoading];
};

export default useSpecificUserBook;

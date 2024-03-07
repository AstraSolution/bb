"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const useExchangeBooks = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const fetchData = async () => {
        if (user && user.email) {
            const res = await axiosSecure.get(`/api/v1/exchange-books-individual/${user.email}`);
            return res.data;
        } else {
            return [];
        }
    };

    const { data: exchangeBooks = [], refetch, isLoading, } = useQuery({
        queryKey: ["exchangeBooks"],
        queryFn: fetchData,
        enabled: !!user && !!user.email, // Enable the query only if user and email exist
    });

    return [exchangeBooks, refetch, isLoading];
};

export default useExchangeBooks;

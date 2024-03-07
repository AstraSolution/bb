import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";


const useExchangeBooks = (page , limit ) => {
    const axiosPublic = useAxiosPublic();

    const { data: exchangeBooks, isPending: isLoading, refetch } = useQuery({
        queryKey: ['exhangeBooks', page, limit] ,
        queryFn: async() => {
            const res = await axiosPublic.get(`/api/v1/exchange-books?page=${page}&limit=${limit}`);
            return res?.data;
        }
    })
    return { exchangeBooks, refetch, isLoading };
};

export default useExchangeBooks;

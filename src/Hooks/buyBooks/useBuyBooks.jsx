import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";


const useBuyBooks = (page , limit ) => {
    const axiosPublic = useAxiosPublic();

    const { data: buyBooksData, isPending: isLoading, refetch } = useQuery({
        queryKey: ['buyBooks', page, limit] ,
        queryFn: async() => {
            const res = await axiosPublic.get(`/api/v1/buy-books?page=${page}&limit=${limit}`);
            return res?.data;
        }
    })
    return { buyBooksData, refetch, isLoading };
};

export default useBuyBooks;

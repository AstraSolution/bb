import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";



const useGetOneExchangeBook = ( id ) => {
    
    const axiosPublic = useAxiosPublic();

    const { data: getOneExchangeBook, isPending: isLoading, refetch } = useQuery({
        queryKey: ['getOneExchangeBook'] ,
        queryFn: async() => {
            const res = await axiosPublic.get(`/api/v1/exchange-books/${id}`);
            return res?.data;
        }
    })
    return { getOneExchangeBook, refetch, isLoading };
};

export default useGetOneExchangeBook;
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";


const useExchangeBooksForHome = () => {
    const axiosPublic = useAxiosPublic();

    const { data: exchangeBooks, isPending: isLoading, refetch } = useQuery({
        queryKey: ['exhangeBooks' , 'homePage'] ,
        queryFn: async() => {
            const res = await axiosPublic.get(`/api/v1/exchange-books-home`);
            return res?.data;
        }
    })

    return { exchangeBooks, refetch, isLoading };
};

export default useExchangeBooksForHome;

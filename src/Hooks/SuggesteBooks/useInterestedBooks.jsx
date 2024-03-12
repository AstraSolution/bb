import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";


const useInterestedBooks = () => {
    const axiosPublic = useAxiosPublic()
    
    const { data: interestedBooks, isLoading, refetch} = useQuery({
        queryKey: ["interestedBooks"],
        queryFn: async() => {
            const res  = await axiosPublic.get(`/api/v1/suggestedBooks`);
            return res.data;
        }
    })
    return { interestedBooks, isLoading, refetch}
};

export default useInterestedBooks;
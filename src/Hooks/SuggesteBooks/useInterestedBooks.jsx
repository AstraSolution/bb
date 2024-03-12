import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";


const useInterestedBooks = () => {
    const axiosPublic = useAxiosPublic();
    const email = localStorage.getItem("email")
    
    const { data: interestedBooks, isLoading, refetch} = useQuery({
        queryKey: ["interestedBooks"],
        queryFn: async() => {
            const res  = await axiosPublic.get(`/api/v1/suggestedBooks?email=${email}`);
            return res.data;
        }
    })
    return { interestedBooks, isLoading, refetch}
};

export default useInterestedBooks;
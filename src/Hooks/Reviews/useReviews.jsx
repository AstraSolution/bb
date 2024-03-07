import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useReviews = (book_id) => {
    const axiosPublic = useAxiosPublic();

    const { data: reviews, isPending, refetch} = useQuery({
        queryKey: ["reviews"],
        queryFn: async() => {
            const res  = await axiosPublic.get(`/api/v1/reviews/${book_id}`);
            return res?.data;
        }
    })
    return { reviews, isPending, refetch}
};

export default useReviews;
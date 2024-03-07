import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useSearchBooks = (bookName) => {
    const axiosPublic = useAxiosPublic();

    const { data: searchBooks, isPending, refetch } = useQuery({
        queryKey: ["searchBook"],
        queryFn: async() => {
            const res = await axiosPublic.get(`/api/v1/books?bookName=${bookName}`);
            return res.data
        }
    })
    


    return { searchBooks, isPending, refetch}
};

export default useSearchBooks;
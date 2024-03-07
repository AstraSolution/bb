import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";

const useGetOneBuyBook = (book_id) => {
    const axiosSecure = useAxiosSecure()
    const { data: book = [], isPending: bookLoading, refetch : bookRefetch } = useQuery({
        queryKey: ["book"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/api/v1/buy-books/${book_id}`);
          return res.data;
        },
      });
    return { book, bookLoading, bookRefetch }
};

export default useGetOneBuyBook;

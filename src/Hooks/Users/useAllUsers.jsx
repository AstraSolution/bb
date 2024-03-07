import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";


const useAllUsers = (page , limit ) => {
    const axiosSecure = useAxiosSecure();

    const { data: usersData, isPending: isLoading, refetch } = useQuery({
        queryKey: ['users', page, limit] ,
        queryFn: async() => {
            const res = await axiosSecure.get(`/api/v1/users?page=${page}&limit=${limit}`);
            return res?.data;
        }
    })
    return { usersData, refetch, isLoading };
};

export default useAllUsers;

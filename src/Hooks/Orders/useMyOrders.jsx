import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";
import useAuth from "../auth/useAuth";

const useMyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: myOrdersData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const email = localStorage.getItem("email")
      const res = await axiosSecure.get(`/api/v1/my-orders/${email}`);
      return res?.data;
    },
  });

  const orders = myOrdersData?.orders || [];
  const myOrders = myOrdersData?.myOrders || [];

  return { myOrders, orders, isPending, refetch };
};

export default useMyOrders;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";
import useAuth from "../auth/useAuth";

const useSellerOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: sellerOrdersData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["sellerOrders"],
    queryFn: async () => {
      const email = localStorage.getItem("email");
      const res = await axiosSecure.get(`/api/v1/seller-orders/${email}`);
      return res.data;
    },
  });

  const orders = sellerOrdersData?.orders || [];
  const sellerOrders = sellerOrdersData?.sellerOrders || [];

  return { sellerOrders, orders, isPending, refetch };
};

export default useSellerOrders;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";
import useAuth from "../auth/useAuth";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useGetMyCarts = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: cartsData = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["myCarts"],
    queryFn: async () => {
      const email = localStorage.getItem("email")
      const res = await axiosPublic.get(`api/v1/my-carts/${email}`);
      return res?.data;
    },
  });

  const myCarts = cartsData?.carts;
  const price = cartsData?.totalPrice;
  const quantity = cartsData?.quantity;


  return { myCarts, price, quantity, isPending, refetch };
};

export default useGetMyCarts;

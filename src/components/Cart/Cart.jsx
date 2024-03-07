"use client";

import useGetMyCarts from "@/Hooks/Carts/useGetMyCarts";
import PageLoading from "../Shared/loadingPageBook/PageLoading";
import useAuth from "@/Hooks/auth/useAuth";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import CartsDetails from "./CartsDetails";
import Link from "next/link";
import Navbar from "../Shared/Navbar/Navbar";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";

const Cart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  let { myCarts, price, isPending, refetch } = useGetMyCarts();

  if (isPending) {
    return <PageLoading />;
  }

  const handleCheckout = async () => {
    const email = await user?.email;

    const res = await axiosSecure.post("/api/v1/order", { email: email });
    if (res?.data?.url) {
      const url = await res.data.url;
      window.open(url, "_blank");
      // router.push(url);
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart || Boi Binimoy</title>
        <link rel="canonical" href="/blogs" />
      </Helmet>
      <Navbar />
      <SectionTitle heading={"Cart"}></SectionTitle>
      <div className="container mx-auto duration-300">
        {myCarts.length === 0 ? (
          <div className="text-center my-20">
            <p className=" my-10">Your cart is empty.</p>
            <Link
              href={`/buyBooks`}
              className="button-color px-4 py-2 rounded-full text-sm md:text-base text-white"
            >
              Add to Cart
            </Link>
          </div>
        ) : (
          <div className="w-full rounded-2xl overflow-hidden lg:shadow-lg my-5 duration-300">
            <div className="bg-[#016961] duration-300 text-white ">
              <div className="grid grid-cols-6 items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                <h5 className="text-center text-xs md:text-base">Product</h5>
                <h5 className="text-center text-xs md:text-base">Product Name</h5>
                <h5 className="text-center text-xs md:text-base">Unit Price</h5>
                <h5 className="text-center text-xs md:text-base">Quantity</h5>
                <h5 className="text-center text-xs md:text-base">Total</h5>
                <h5 className="text-center text-xs md:text-base">Remove</h5>
              </div>
            </div>
            <div className="flex-1 sm:flex-none grid grid-cols-1 gap-5 lg:gap-0">
              {myCarts?.map((cart) => (
                <CartsDetails
                  key={cart._id}
                  cart={cart}
                  refetch={refetch}
                ></CartsDetails>
              ))}
              <div className="flex items-center justify-center gap-4 mb-3">
                <p>Total price: {price}</p>
                <button
                  onClick={handleCheckout}
                  className="button-color px-4 py-2 rounded-full text-sm md:text-base text-white flex items-center gap-1"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default Cart;

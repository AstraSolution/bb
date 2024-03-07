"use client";

import MyOrder from "./MyOrder";
import useMyOrders from "@/Hooks/Orders/useMyOrders";
import PageLoading from "@/components/Shared/loadingPageBook/PageLoading";
import Link from "next/link";

const MyOrders = () => {
  const { myOrders, carts, isPending, refetch } = useMyOrders();

  if (isPending) {
    return <PageLoading />;
  }


  return (
    <div className="container duration-300">
      {myOrders?.length === 0 ? (
        <div className="text-center my-20">
          <p className=" my-10">Your order is empty.</p>
          <Link
            href={`/buyBooks`}
            className="button-color px-4 py-2 rounded-full text-sm md:text-base text-white"
          >
            Buy Book
          </Link>
        </div>
      ) : (
        <div className="w-full rounded-2xl overflow-hidden lg:shadow-lg my-5 duration-300">
          <div className="bg-[#016961] duration-300 text-white ">
            <div className="grid grid-cols-9 items-center justify-between font-semibold border border-gray-100 px-10 py-5">
              <h5 className="text-center text-xs md:text-base col-span-1 ">
                Book
              </h5>
              <h5 className="text-center text-xs md:text-base col-span-2 ">
                Name
              </h5>
              <h5 className="text-center text-xs md:text-base col-span-1 ">
                Quantity
              </h5>
              <h5 className="text-center text-xs md:text-base col-span-1 ">
                Unit Price
              </h5>
              <h5 className="text-center text-xs md:text-base col-span-1 ">
                total Price
              </h5>
              <h5 className="text-center text-xs md:text-base col-span-2 ">
                Seller Email
              </h5>
              <h5 className="text-center text-xs md:text-base col-span-1 ">
                Delivary Status
              </h5>
            </div>
          </div>
          <div className="flex-1 sm:flex-none grid grid-cols-1 gap-5 lg:gap-0">
            <div className="bg-white rounded-3xl lg:rounded-none shadow-sm hover:bg-[#19a49113] lg:shadow-inherit border border-gray-100">
              {myOrders?.map((cart) => (
                <MyOrder key={cart._id} cart={cart}></MyOrder>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

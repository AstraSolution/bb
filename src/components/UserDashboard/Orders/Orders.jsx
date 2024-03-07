"use client";

import useSellerOrders from "@/Hooks/Orders/useSellerOrders";
import Order from "./Order";
import PageLoading from "@/components/Shared/loadingPageBook/PageLoading";


const Orders = () => {
  const { sellerOrders, orders, isPending, refetch } = useSellerOrders();
  
  if(isPending){
    return <PageLoading></PageLoading>
  }
  
  return (
    <div className="container duration-300">
      <div className="w-full rounded-2xl overflow-hidden lg:shadow-lg my-5 duration-300">
        <div className="bg-[#016961] duration-300 text-white ">
          <div className="grid grid-cols-11 items-center justify-between font-semibold border border-gray-100 px-10 py-5">
            <h5 className="text-center text-xs md:text-base col-span-1">Book Image</h5>
            <h5 className="text-center text-xs md:text-base col-span-2">Book Name</h5>
            <h5 className="text-center text-xs md:text-base col-span-1">Quantity</h5>
            <h5 className="text-center text-xs md:text-base col-span-1">Unit Price</h5>
            <h5 className="text-center text-xs md:text-base col-span-1">total Price</h5>
            <h5 className="text-center text-xs md:text-base col-span-1">Client</h5>
            <h5 className="text-center text-xs md:text-base col-span-3">Email</h5>
            <h5 className="text-center text-xs md:text-base col-span-1">Delivary Status</h5>
          </div>
        </div>
        <div className="flex-1 sm:flex-none grid grid-cols-1 gap-5 lg:gap-0">
          <div className="bg-white rounded-3xl lg:rounded-none shadow-sm hover:bg-[#19a49113] lg:shadow-inherit border border-gray-100">
           {
            sellerOrders?.map((order) => <Order key={order?.cart?._id} order = {order} refetch={refetch}></Order>)
           }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

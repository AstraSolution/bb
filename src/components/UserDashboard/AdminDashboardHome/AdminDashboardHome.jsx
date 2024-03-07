"use client";

import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import RecentOrderBookCard from "./RecentOrderBookCard";
import LowStockBooksCard from "./LowStockBooksCard";
export default function AdminDashboardHome() {
  const axiosSecure = useAxiosSecure();

  const {
    data: totalSales = [],
    isPending: totalSalesPending,
    refetch: totalSaleesRefetch,
  } = useQuery({
    queryKey: ["totalSales"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/total-sales`);
      return res.data;
    },
  });

  const {
    data: totalCustomers = [],
    isPending: totalCustomerPending,
    refetch: totalCustomerRefetch,
  } = useQuery({
    queryKey: ["totalCustomers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/total-customers`);
      return res.data;
    },
  });

  const {
    data: totalOrders = [],
    isPending: totalOrdersPendig,
    refetch: refetchTotalOrder,
  } = useQuery({
    queryKey: ["totalOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/total-orders`);
      return res.data;
    },
  });

  const {
    data: topSellingBooks = [],
    isPending: topSellingBooksPending,
    refetch: refetchTopSellingBooks,
  } = useQuery({
    queryKey: ["topSellingBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/top-selling-books`);
      return res.data;
    },
  });

  const {
    data: topBuyingCustomers = [],
    isPending: topBuyingCustomersPending,
    refetch: refetchTopBuyingCustomers,
  } = useQuery({
    queryKey: ["topBuyingCustomers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/top-buying-customers`);
      return res.data;
    },
  });

  const {
    data: recentOrderedBooks = [],
    isPending: recentOrderedBooksPending,
    refetch: refetchRecentOrderedBooks,
  } = useQuery({
    queryKey: ["recentOrderedBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/recent-ordered-books`);
      return res.data;
    },
  });

  const {
    data: lowStockBooks = [],
    isPending: lowStockBooksPending,
    refetch: lowStockBooksRefetch,
  } = useQuery({
    queryKey: ["lowStockBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/low-stock-books`);
      return res.data;
    },
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border p-5 rounded-lg shadow-sm space-y-3">
          <h3 className="uppercase text-xl font-semibold">Total Sales</h3>
          <h2 className="font-bold text-2xl">
            $ {totalSales && totalSales.totalSales ? totalSales.totalSales : 0}
          </h2>
        </div>
        <div className="border p-5 rounded-lg shadow-sm space-y-3">
          <h3 className="uppercase text-xl font-semibold">Total Orders</h3>
          <h2 className="font-bold text-2xl">
            {totalOrders && totalOrders.totalOrders
              ? totalOrders.totalOrders
              : 0}
          </h2>
        </div>
        <div className="border p-5 rounded-lg shadow-sm space-y-3">
          <h3 className="uppercase text-xl font-semibold">Total Customers</h3>
          <h2 className="font-bold text-2xl">
            {totalCustomers && totalCustomers.totalCustomers
              ? totalCustomers.totalCustomers
              : 0}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        <div className="border p-5 rounded-lg shadow-sm space-y-3">
          <h3 className="text-xl font-semibold flex items-center justify-between">
            Top selling Books{" "}
            <span>
              {topSellingBooks && topSellingBooks.topSellingBooks
                ? topSellingBooks.topSellingBooks.length
                : 0}
            </span>
          </h3>
          <div>
            <table className="table">
              <thead>
                <tr className="bg-base-200 rounded-lg">
                  <th>Cover Image</th>
                  <th>Title</th>
                  <th>Sales</th>
                </tr>
              </thead>

              <tbody>
                {topSellingBooks &&
                  topSellingBooks.topSellingBooks?.map((item) => (
                    <tr
                      key={item.bookId}
                      item={item}
                      className="space-x-2 border"
                    >
                      <td>
                        <img
                          src={item.bookDetails.cover_image}
                          className="w-12"
                          alt=""
                        />
                      </td>
                      <td>{item.bookDetails.title}</td>
                      <td>{item.totalQuantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border p-5 rounded-lg shadow-sm space-y-3">
          <div className="">
            <div className="flex items-center justify-between">
              <h3 className="mb-5 font-semibold text-xxl">
                Top Buying Customers
              </h3>
              <h3>
                {topBuyingCustomers &&
                  topBuyingCustomers.topBuyingCustomers?.length}
              </h3>
            </div>

            <table className="table">
              <thead>
                <tr className="bg-base-200 rounded-lg">
                  <th>Profile</th>
                  <th>Name & Email</th>
                  <th>Buy</th>
                </tr>
              </thead>

              <tbody>
                {topBuyingCustomers &&
                  topBuyingCustomers.topBuyingCustomers?.map((item) => (
                    <tr
                      key={item.email}
                      item={item}
                      className="space-x-2 border"
                    >
                      <td>
                        <img
                          src={item.image}
                          className="w-12 h-12 rounded-full"
                          alt=""
                        />
                      </td>
                      <td>
                        {item.name} <br /> {item.email}
                      </td>
                      <td>{item.totalPurchases}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border p-5 rounded-lg shadow-sm space-y-3">
          <h3 className="text-xl font-semibold flex justify-between items-center gap-5">
            Low Stock Books
            <span>
              {lowStockBooks && lowStockBooks.lowStockBooks
                ? lowStockBooks.lowStockBooks.length
                : 0}
            </span>
          </h3>
          <div>
            {lowStockBooks &&
              lowStockBooks.lowStockBooks?.map((item, i) => (
                <LowStockBooksCard key={item._id} item={item} />
              ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="border p-5 rounded-lg shadow-sm space-y-3">
          <h3 className="text-xl font-semibold">Recent Orders</h3>
          <div>
            {recentOrderedBooks &&
              recentOrderedBooks.recentOrders?.map((item) => (
                <RecentOrderBookCard key={item.id} item={item} />
              ))}
          </div>

        </div>
      </div>
    </div>
  );
}
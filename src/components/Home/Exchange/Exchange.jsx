"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import useExchangeBooksForHome from "@/Hooks/exchangeBooks/useExchangeBooksForHome";
import BookCardSkeleton from "@/components/Skeleton/BookCardSkeleton";
import ExchangeCard from "@/components/Shared/ExchangeBook/ExchangeCard";

const TestExchange = () => {
  const { exchangeBooks: books, isLoading } = useExchangeBooksForHome();

  if (isLoading) {
    return (
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from(Array(8).keys()).map((index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const transparentBanner = "https://i.ibb.co/GPmg3HB/Swap-Books-t.png";

  return (
    <div className="container mx-auto pt-5 rounded-lg px-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl text-[#016961] font-bold text-nowrap">
          Exchange Now
        </h2>
        <hr className="hr" />
        <div className="flex items-center justify-end gap-3 text-nowrap">
          {/* View All button */}
          <Link
            href="/exchangeAllBooks"
            className="button-color px-4 py-2 rounded-full text-sm md:text-base text-teal-50 flex items-center gap-1"
          >
            View All{" "}
            <span className="text-xl">
              <FiArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        <div className="col-span-2 hidden lg:block pt-[20px]">
          <div className="rounded-lg object-cover w-full h-full">
            <Image 
              className="rounded-lg object-cover md:w-full h-full border border-dashed border-[#016961]"
              src={transparentBanner}
              alt="alt"
              width={1200}
              height={3000}
            />
          </div>
        </div>

        <div className="col-span-full lg:col-span-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {books?.map((item) => (
              <ExchangeCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExchange;

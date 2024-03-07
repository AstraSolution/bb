"use client"

import React, { useState } from "react";
import PageLoading from "../../Shared/loadingPageBook/PageLoading";
import useExchangeBooks from "@/Hooks/exchangeBooks/useExchangeBooks";
import ExchangeBookCard from "@/components/Shared/ExchangeBook/ExchangeCard";



const AllExchangeBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { exchangeBooks, isLoading } = useExchangeBooks(currentPage, 14);

  if (isLoading) {
    return <PageLoading />;
  }

  const totalBooks = exchangeBooks?.totalBook;
  const books = exchangeBooks?.exchangeBooks || [];

  const pageNumbers = Array.from(
    { length: Math.ceil(totalBooks / 14) },
    (_, index) => index + 1
  );

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalBooks / 14)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-3">
      <div className="py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5">
          {books?.map((book) => (
            <ExchangeBookCard key={book?._id} item={book}></ExchangeBookCard>
          ))}
        </div>

        {pageNumbers?.length > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevPage}
              className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700"
            >
              Prev
            </button>
            {pageNumbers.map((_, index) => (
              <button
                key={index}
                onClick={() => handlePagination(index + 1)}
                className={`mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700 ${currentPage === index + 1 ? "bg-blue-700" : ""
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllExchangeBooks;

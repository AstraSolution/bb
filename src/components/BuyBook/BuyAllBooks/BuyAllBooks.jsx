"use client";

import BookCard from "../../Shared/BookCard";
import PageLoading from "../../Shared/loadingPageBook/PageLoading";
import useBuyBooks from "@/Hooks/buyBooks/useBuyBooks";
import { useState } from "react";
import { Helmet } from "react-helmet";

const BuyAllBooks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { buyBooksData, isLoading } = useBuyBooks(currentPage, 14)

  console.log(buyBooksData);

  if (isLoading) {
    return <PageLoading />;
  }

  const books = buyBooksData?.buyBooks || [];
  const totalBooks = buyBooksData?.totalBook || 0;


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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Buy Books</title>
        <link rel="canonical" href="/buyBooks" />
      </Helmet>
      <div className="py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5">
          {books?.map((book) => (
            <BookCard key={book?._id} item={book}></BookCard>
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

export default BuyAllBooks;

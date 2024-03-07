"use client";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import useExchangeBooks from "@/Hooks/api/useExchangeBooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const ExchangeBook = () => {
  const [exchangeBooks, refetch, isLoading] = useExchangeBooks();
  const axiosSecure = useAxiosSecure();

  // delete operation
  const handleDeleteExchangeBook = (id, title) => {
    Swal.fire({
      title: `Delete Book`,
      text: `Are you sure you want to delete the book "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/v1/exchange-books/${id}`)
          .then((response) => {
            if (response.data) {
              Swal.fire(
                "Deleted!",
                `Your book "${title}" has been deleted.`,
                "success"
              );
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error deleting Book:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the book.",
              "error"
            );
          });
      }
    });
  };

  if (isLoading) {
    return (
        <div className="text-center items-center justify-center flex flex-col min-h-screen ">
            <span className="loading loading-ball loading-lg"></span>
        </div>
    );
  }

  if (exchangeBooks.length === 0) {
    return (
        <div>
            <h1  className="text-center flex flex-col justify-center font-semibold md:text-3xl lg:text-4xl min-h-screen"> Books  Not Found....</h1>
        </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5">
        <div className="flex items-center justify-center">
          <div className="container duration-300">
            <div className="w-full rounded-2xl overflow-hidden lg:shadow-lg my-5 duration-300">
              <div className="hidden lg:block bg-[#016961] duration-300 text-white ">
                <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                  <h5 className="w-[40px] lg:mr-10"></h5>
                  <h5 className="w-full lg:mr-10">Title</h5>
                  <h5 className="w-full lg:mr-10">Writer</h5>
                  <h5 className="w-full lg:mr-10">Format</h5>
                  <h5 className="w-full lg:mr-10">Cover Type</h5>
                  <h5 className="w-full lg:mr-10">Actions</h5>
                </div>
              </div>
              <div className="flex-1 sm:flex-none grid grid-cols-1 gap-5 lg:gap-0">
                {exchangeBooks.map((book) => (
                  <div
                    key={book._id}
                    className="bg-white rounded-3xl lg:rounded-none shadow-sm hover:bg-[#19a49113] lg:shadow-inherit border border-gray-100"
                  >
                    <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-1  rounded-3xl lg:rounded-none px-6 lg:px-10 py-5 mx-auto duration-300">
                      <h5 className="w-full lg:mr-10 text-lg font-semibold text-center lg:text-start line-clamp-1 truncate text-wrap">
                        {book.title}
                      </h5>
                      <h5 className="w-full lg:mr-10 text-center lg:text-start">
                        {book.writer}
                      </h5>
                      <h5 className="w-full lg:mr-10 text-center lg:text-start">
                        {book.format}
                      </h5>
                      <h5 className="w-full lg:mr-10 text-center lg:text-start">
                        {book.cover_type}
                      </h5>
                      <div className="w-full flex justify-center lg:justify-start gap-3">
                        <Link
                          href={`/dashboard/updateExchangeBook/${book._id}`}
                        >
                          <button className="p-2 text-2xl bg-green-200 text-green-700 rounded-md hover:bg-green-300 hover:text-green-800">
                            <GrDocumentUpdate />
                          </button>
                        </Link>
                        <button
                          onClick={() =>
                            handleDeleteExchangeBook(book._id, book.title)
                          }
                          className="p-1 text-3xl bg-red-200 text-red-700 rounded-md hover:bg-red-300  hover:text-red-800"
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExchangeBook;

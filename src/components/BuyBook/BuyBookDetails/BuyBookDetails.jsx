"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { IoIosSend } from "react-icons/io";
import Related from "../../Shared/Related/Related";
import PageLoading from "../../Shared/loadingPageBook/PageLoading";
import { FaCartPlus } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import ReviewCard from "@/components/Shared/ReviewCard";
import Swal from "sweetalert2";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import useOneUser from "@/Hooks/Users/useOneUser";
import useReviews from "@/Hooks/Reviews/useReviews";
import useGetOneBuyBook from "@/Hooks/buyBooks/useGetOneBuyBook";
import useAuth from "@/Hooks/auth/useAuth";
import { useCallback, useEffect } from "react";
import SuggestedBooks from "../suggested books/SuggestedBooks";
import useGetMyCarts from "@/Hooks/Carts/useGetMyCarts";
import RelatedBooks from "../RelatedBooks/RelatedBooks";

const BuyBookDetails = () => {
  const { user } = useAuth();
  const { interest } = useOneUser();
  const param = useParams();
  const book_id = param.buyId;
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useOneUser();
  const { reviews, isPending, refetch } = useReviews(book_id);
  const {
    book,
    isLoading: bookLoading,
    refetch: bookRefetch,
  } = useGetOneBuyBook(book_id);
  const { refetch: cartRefetch } = useGetMyCarts();

  if (bookLoading || isPending) {
    return <PageLoading />;
  }

  // Handle comment form
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;

    const user_name = currentUser?.name;
    const user_email = currentUser?.email;
    const user_image = currentUser?.image;
    const rating = 5;
    const book_id = book?._id;

    const newComment = {
      user_name,
      user_email,
      user_image,
      rating,
      comment,
      book_id,
    };

    axiosSecure
      .post("/api/v1/reviews", newComment)
      .then((response) => {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Comment Added.",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Handle add to cart
  const handleCart = () => {
    const user_name = currentUser?.name;
    const user_email = currentUser?.email;
    const book_id = book?._id;
    const price = book?.price;
    const quantity = 1;

    const addCart = {
      user_name,
      user_email,
      owner_email: book?.owner_email,
      book_id,
      unit_price: price,
      total_price: price,
      quantity,
      isDeliverd: false,
      cover_image: book?.cover_image,
      title: book?.title,
      stock_limit: book?.stock_limit,
    };

    axiosSecure
      .post("/api/v1/carts", addCart)
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add book in the cart.",
          showConfirmButton: false,
          timer: 1500,
        });
        cartRefetch();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full bg-teal-50">
      {/* Banner */}
      <div className="relative bg-[#016961]">
        {/* bottom curve */}
        <div className="absolute inset-x-0 bottom-0 ">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-teal-50"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>

        {/* Information section */}
        <div className="text-center px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-5xl">
              Detail of &quot;{book?.title}&quot;
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-2">
        {/* book img and information section */}
        <div className="flex flex-col-reverse lg:flex-row items-start lg:mt-40 gap-3 lg:gap-7">
          {/* Related section */}
          <div className="w-full bg-50-50 mx-auto lg:w-fit h-[500px] px-3 overflow-y-scroll border border-teal-800 rounded-lg">
            <RelatedBooks CurrentlyViewing={book._id}> </RelatedBooks>
          </div>

          <div className="relative flex flex-col lg:flex-row-reverse justify-center p-5 bg-[#016961] rounded-lg w-full">
            {/* Book Image */}
            <div className="w-full lg:w-2/5 mb-4 lg:mb-0">
              <Image
                src={book?.cover_image}
                width={1000}
                height={1500}
                alt=""
                className="w-full lg:w-2/5 lg:absolute lg:bottom-5 lg:right-5 ring-0 border-none rounded-md shadow-xl transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Book Information */}
            <div className="lg:px-10 bg text-white w-full lg:w-3/5">
              <h2 className="text-4xl">{book?.title}</h2>
              <p className="text-xs">
                by <span className="font-bold text-sm">{book?.writer}</span>
              </p>
              <p className="text-3xl pt-3 pb-5">
                {book?.price} <span className="text-xs font-bold">$</span>
              </p>

              <div className="flex flex-wrap gap-3 pb-1">
                <p className="text-xs border rounded-md px-2 py-1 font-bold">
                  Category: Fiction
                </p>
                <p className="text-xs border rounded-md px-2 py-1 font-bold">
                  Language: {book?.language}
                </p>
                <p className="text-xs border rounded-md px-2 py-1 font-bold">
                  {book?.pages} page
                </p>
                <p className="text-xs border rounded-md px-2 py-1 font-bold">
                  Published Year: {book?.published_year}
                </p>
                <p className="text-xs border rounded-md px-2 py-1 font-bold">
                  book: {book?.book}
                </p>
                <p className="text-xs border rounded-md px-2 py-1 font-bold">
                  Edition: {book?.edition}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center mt-1">
                {/* Rating */}
                <div className="flex items-center text-white text-xl mr-2">
                  <span className="mr-1">&#9733;</span>
                  <span className="mr-1">&#9733;</span>
                  <span className="mr-1">&#9733;</span>
                  <span className="mr-1">&#9733;</span>
                  <span className="mr-1">&#9733;</span>
                </div>
                {/* Vote */}
                <span className="text-sm">(4.5/5)</span>
              </div>
              {/* Book Description */}
              <p className="text-xs text-justify">
                <span className="text-sm font-bold">Description: </span>
                {book?.description}
              </p>

              {/* User action */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCart}
                  className="mt-6 text-center cursor-pointer bg-white text-[#016961] font-semibold p-1 md:p-2 lg:p-2.5 text-lg md:text-xl lg:text-2xl rounded-full"
                >
                  <FaCartPlus />
                </button>
                <button className="mt-6 text-center cursor-pointer bg-white text-[#016961] font-semibold p-1 md:p-2 lg:p-2.5 text-lg md:text-xl lg:text-2xl rounded-full">
                  <FaHeartCirclePlus />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* You might like section */}
        <div className="max-w-6xl mx-auto">
          <SuggestedBooks CurrentlyViewing={book._id}></SuggestedBooks>
        </div>

        {/* review section */}
        <div className="max-w-6xl mx-auto p-8 border border-teal-800 rounded-lg">
          <div className="max-w-5xl mx-auto">
            {/* send review */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 pb-5"
            >
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="comment"
                className="w-full h-8 px-2 bg-transparent border-b focus:outline-none focus:border-teal-800"
              />
              <button type="submit" className="text-2xl text-[#016961]">
                <IoIosSend />
              </button>
            </form>

            {/* all review */}
            <div className="p-2 space-y-4">
              {reviews &&
                reviews?.map((commenter) => (
                  <ReviewCard
                    key={commenter?.user_email}
                    review={commenter}
                  ></ReviewCard>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyBookDetails;

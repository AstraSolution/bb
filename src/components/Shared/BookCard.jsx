"use client";

import { AuthContext } from "@/providers/AuthProvider";
import "./Card.css";
import Link from "next/link";
import { useContext } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import useWishListBook from "@/Hooks/wishList/useWishListBook";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import useOneUser from "@/Hooks/Users/useOneUser";

export default function ExchangeCard({ item }) {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const user_email = user?.email;
  const { currentUser } = useOneUser();

  const { _id, title, cover_image, price, writer, owner_email } = item || {};
  const [wishListBook, refetch] = useWishListBook();

  const filteredData = wishListBook.filter((book) => book.book_id === _id);

  const handleAddToWishlist = () => {
    const user_name = currentUser?.name;
    const quantity = 1;

    const wishlistData = {
      user_name,
      user_email,
      owner_email,
      book_id: _id,
      title,
      cover_image,
      writer,
      unit_price: price,
      total_price: price,
      quantity,
      isDeliverd: false,
    };

    // add operation
    axiosSecure
      .post("/api/v1/wishlist", wishlistData)
      .then((response) => {
        refetch();
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
      });
  };

  // delete operation
  const handleBookDelete = () => {
    axiosSecure
      .delete(`/api/v1/wishlist/remove/${filteredData[0]._id}`)
      .then((response) => {
        refetch();
      })
      .catch((error) => {
        console.error("Error removing item from wishlist:", error);
      });
  };

  return (
    <div className="l-container md:p-1">
      <div className="b-game-card ">
        <div
          className="b-game-card__cover book-cover-effect"
          style={{ backgroundImage: `url(${item?.cover_image})` }}
        >
          <div className="grid grid-cols-1 items-end justify-end gap-2 card__action">
            <Link href={`/buyBooks/${item?._id}`}>
              <button className=" text-white text-center text-xl border mb-2 border-gray-600 border-opacity-30 backdrop-blur-md p-3 bg-black/30 rounded-full">
                <MdOutlineShoppingCart />
              </button>
            </Link>

            <div>
              {filteredData.length > 0 ? (
                <button
                  onClick={handleBookDelete}
                  className="  text-red-700 text-center text-xl border mb-6 border-gray-600 border-opacity-30 backdrop-blur-md p-3 bg-black/30 rounded-full"
                >
                  <FaHeart />
                </button>
              ) : filteredData.length === 0 ? (
                <div>
                  <button
                    onClick={handleAddToWishlist}
                    className=" text-white text-center text-xl border mb-6 border-gray-600 border-opacity-30 backdrop-blur-md p-3 bg-black/30 rounded-full"
                  >
                    <FaRegHeart />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToWishlist}
                  className="text-white text-center text-xl border border-gray-600 border-opacity-30 backdrop-blur-md p-3 bg-black/30 rounded-full"
                ></button>
              )}
            </div>
          </div>

          <span className="price-tag">
            <span className="text-lg">&#2547; {item?.price}</span>
          </span>
        </div>
      </div>

      <div className="px-1">
        <div className="space-y-1 mt-2.5 pb-1">
          <h2 className="text-lg font-bold text-[#016961] line-clamp-1">
            {item?.title}
          </h2>
          <p className="text-[13px] text-[#626980] italic line-clamp-1">
            {" "}
            <span>-</span> {item?.writer}
          </p>
        </div>

        <div className="flex items-center truncate mt-1 text-[#62807b] text-sm">
          <div className="flex gap-[1px] -mt-[2px] mr-1.5">
            {Array.from(
              { length: Math.min(Math.floor(item?.avg_rating), 5) },
              (_, index) => (
                <span key={index} className="text-yellow-400">
                  <BsStarFill />
                </span>
              )
            )}
            {item?.avg_rating % 1 !== 0 && (
              <span className="text-yellow-400">
                <BsStarHalf />{" "}
              </span>
            )}
            {Array.from(
              { length: Math.max(5 - Math.ceil(item?.avg_rating), 0) },
              (_, index) => (
                <span key={index} className="text-gray-400">
                  <BsStar />
                </span>
              )
            )}
          </div>
          <p>
            {Math.min(item?.avg_rating, 5)} {Math.min(item?.avg_rating, 5) > 1 ? "Ratings" : "Rating"}
          </p>
        </div>

        <hr className="hr-card" />
        <div className="mt-2.5">
          <p className="text-sm text-[#62807b] line-clamp-3">
            {item?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

import { AuthContext } from "@/providers/AuthProvider";
import "./Card.css";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import { useContext } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import useWishListBook from "@/Hooks/wishList/useWishListBook";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { ImFire } from "react-icons/im";

import useOneUser from "@/Hooks/Users/useOneUser";
import useGetMyCarts from "@/Hooks/Carts/useGetMyCarts";

export default function ExchangeCard({ item }) {

  const { _id, title, cover_image, price, writer, owner_email, stock_limit, description, avg_rating } = item?.bookDetails || item || {};

  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const { user, isLoggedIn } = useContext(AuthContext);
  const user_email = user?.email;
  const { currentUser } = useOneUser();
  const { refetch: cartRefetch } = useGetMyCarts();
  const [wishListBook, refetch] = useWishListBook();

  const filteredData = wishListBook.filter((book) => book.book_id === _id);

  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'You need to log in to add items to your wishlist.',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/joinUs');
        }
      });
      return; 
    }
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

  // Handle add to cart
  const handleCart = () => {

    if (!isLoggedIn) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'You need to log in to add items to your wishlist.',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/joinUs');
        }
      });
      return; 
    }

    const user_name = currentUser?.name;
    const user_email = currentUser?.email;
    const book_id = _id;
    const bookPrice = price;
    const quantity = 1;

    const addCart = {
      user_name,
      user_email,
      owner_email: owner_email,
      book_id,
      unit_price: bookPrice,
      total_price: bookPrice,
      quantity,
      isDeliverd: false,
      cover_image: cover_image,
      title: title,
      stock_limit: stock_limit,
    };

    axiosSecure
      .post("/api/v1/carts", addCart)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Add book in the cart.",
            showConfirmButton: false,
            timer: 1500,
          });
          cartRefetch();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There was an error!',
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const isTopSelling = item.hasOwnProperty("totalQuantity");

  return (
    <div className="l-container md:p-1">
      <div className="b-game-card ">
        <div
          className="b-game-card__cover book-cover-effect"
          style={{ backgroundImage: `url(${cover_image})` }}
        >
          <div className="grid grid-cols-1 items-end justify-end gap-2 card__action">

            <button
              onClick={handleCart}
              className=" text-white text-center text-xl border mb-2 border-gray-600 border-opacity-30 backdrop-blur-md p-3 bg-black/30 rounded-full">
              <MdOutlineShoppingCart />
            </button>

            <div>
              {filteredData.length > 0 ? (
                <button
                  onClick={handleBookDelete}
                  className="  text-red-700 text-center text-xl border mb-6 border-gray-600 border-opacity-30 backdrop-blur-md p-3 bg-black/30 rounded-full"
                >
                  <FaHeart />
                </button>
              ) : (
                <button
                  onClick={handleAddToWishlist}
                  className=" text-white text-center text-xl border mb-6 border-gray-600 border-opacity-30 backdrop-blur-md p-3 bg-black/30 rounded-full"
                >
                  <FaRegHeart />
                </button>
              )}
            </div>
          </div>

          {isTopSelling && (
            <span className="top-selling-label w-32 "> <span className="text-[#ff9a00]"><ImFire /></span>Top Selling  </span>
          )}

          <span className="price-tag">
            <span className="text-lg">&#2547; {price}</span>
          </span>
        </div>
      </div>

      <Link href={`/buyBooks/${_id}`}>
        <div className="px-1">
          <div className="space-y-1 mt-2.5 pb-1">
            <h2 className="text-lg font-bold text-[#016961] line-clamp-1">
              {title}
            </h2>
            <p className="text-[13px] text-[#626980] italic line-clamp-1">
              {" "}
              <span>-</span> {writer}
            </p>
          </div>

          <div className="flex items-center truncate mt-1 text-[#62807b] text-sm">
            <div className="flex gap-[1px] -mt-[2px] mr-1.5">
              {Array.from(
                { length: Math.min(Math.floor(avg_rating), 5) },
                (_, index) => (
                  <span key={index} className="text-yellow-400">
                    <BsStarFill />
                  </span>
                )
              )}
              {avg_rating % 1 !== 0 && (
                <span className="text-yellow-400">
                  <BsStarHalf />{" "}
                </span>
              )}
              {Array.from(
                { length: Math.max(5 - Math.ceil(avg_rating), 0) },
                (_, index) => (
                  <span key={index} className="text-gray-400">
                    <BsStar />
                  </span>
                )
              )}
            </div>
            <p>
              {Math.min(avg_rating, 5)} {Math.min(avg_rating, 5) > 1 ? "Ratings" : "Rating"}
            </p>
          </div>

          <hr className="hr-card" />
          <div className="mt-2.5">
            <p className="text-sm text-[#62807b] line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

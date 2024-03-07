"use client";

import { MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import { LuUser2 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import useOneUser from "@/Hooks/Users/useOneUser";
import useGetMyCarts from "@/Hooks/Carts/useGetMyCarts";
import { AiOutlineHeart } from "react-icons/ai";
import useWishListBook from "@/Hooks/wishList/useWishListBook";
import PageLoading from "../../loadingPageBook/PageLoading";
import Swal from "sweetalert2";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import palesholderImage from "../../../../../public/placeholder.png"

const Navend = () => {
  const axiosSecure = useAxiosSecure();
  const [wishListBook] = useWishListBook()
  const { user, logOut } = useContext(AuthContext);
  const { currentUser } = useOneUser();
  let { myCarts, price, isPending, refetch } = useGetMyCarts();
  const totalCart = myCarts?.length;

  if (myCarts?.length > 3) {
    myCarts = myCarts.slice(0, 3);
  }

  console.log(currentUser);

  const { isFirstLogin } = currentUser
  console.log(isFirstLogin);

  useEffect(() => {
    if (currentUser.isFirstLogin) {
      const modal = document.getElementById('my_modal_1');
      if (modal) {
        modal.showModal();
      } else {
        console.error("Modal element not found");
      }
    }
  }, [currentUser.isFirstLogin]);



  const handleUpdateProfile = async (_id) => {
    const updateUserInformation = {
      isFirstLogin: false,
    };

    try {
      const response = await axiosSecure.patch(`/api/v1/users/${currentUser._id}`, updateUserInformation);
      if (response.data) {
        router.push('/');
      } else {
        console.error('Update failed: User not found or update unsuccessful');
      }
    } catch (error) {
      console.error('Error occurred during update:', error);
      
    }
  };



  //  delte cart
  const handleDeleteCart = (id, title) => {
    Swal.fire({
      title: "Delete Book",
      text: `Are you sure you want to delete the book ${title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/v1/delete-cart/${id}`)
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




  return (

    <>

      <div className="flex items-center gap-1">
        <Link href="/wishList">
          <div className="px-2">
            <span className="indicator-item badge badge-secondary"> {wishListBook.length} </span>
            <AiOutlineHeart className="mx-auto" />
          </div>
        </Link>

        {/* Drawer cart */}
        <div className="drawer drawer-end">
          <input
            id="cart-drawer"
            type="checkbox"
            className="drawer-toggle overflow-hidden"
          />
          <div className="drawer-content px-2">
            {/* Page content here */}
            {totalCart ?
              <span className="indicator-item badge badge-secondary">
                {totalCart}
              </span> :
              <span className="indicator-item badge badge-secondary">
                {0}
              </span>
            }
            <label htmlFor="cart-drawer" className="drawer-button">
              <MdOutlineShoppingCart className="mx-auto" />
            </label>
          </div>
          <div className="drawer-side overflow-hidden z-[2]">
            <label htmlFor="cart-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu w-1/3 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              {myCarts && myCarts?.map((cart) => (
                <li key={cart?._id}>
                  <div className="flex items-center justify-between rounded-lg p-2">
                    <div className="flex gap-5 items-center">
                      <Image
                        src={cart?.cover_image}
                        width={70}
                        height={100}
                        alt="book"
                        priority
                        style={{ width: "70px", height: "100px" }}
                        className="rounded-md"
                      />
                      <div>
                        <h2 className="font-bold text-lg">{cart?.title}</h2>
                        <h2 className="text-orange-700 font-bold text-lg">
                          {cart?.unit_price} BDT
                        </h2>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCart(cart?._id, cart.title)}
                      className="mt-5 button-color px-4 py-2 rounded-full text-sm md:text-base text-white flex items-center gap-1"
                    >
                      <RxCross2></RxCross2>
                    </button>
                  </div>
                  <hr />
                </li>
              ))}
              <li className="mx-auto">
                <h3 className="text-xl font-bold">Total: {price}</h3>
              </li>
              <li>
                <hr />
              </li>
              <li className="mx-auto">
                <div className="flex gap-5 items-center">
                  <Link href="/cart"
                    className="button-color px-4 py-2 rounded-full text-sm md:text-base text-white flex items-center gap-1"
                  >
                    View carts
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-end">
          {user ? (
            <div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src={currentUser.image}
                      alt="user"
                      priority
                      width={300}
                      height={300}
                      className="avatar online"
                    />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                    <Link href="/dashboard" className="px-4 py-2 hover:bg-base-300 rounded-lg text-black">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="cursor-pointer text-red-500 px-4 py-2 hover:bg-base-300 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link href="/joinUs">
              <div className="w-10 rounded-full">
                <Image
                  src={palesholderImage}
                  alt="user"
                  priority
                  width={300}
                  height={300}
                  className="avatar online"
                />
              </div>
            </Link>
          )}
        </div>
      </div>


      <dialog id="my_modal_1" className="modal">
        <div className="modal-box text-gray-700">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p>{currentUser.name} </p>
          <p className="py-4 text-lg font-bold "> Please Reading Now Term & Condition </p>
          <div className="text-[17px] ">
            <p> <span className="font-bold ">Acceptance of Terms:</span> By signing up on the website, users agree to abide by the terms and conditions outlined.</p>
            <p> <span className="font-bold ">Account Information:</span> Users are responsible for providing accurate and complete information during the signup process. They should also maintain the confidentiality of their account credentials. </p>
            <p> <span className="font-bold ">Data Privacy: </span> The website will collect and process personal information in accordance with its privacy policy. Users should review the privacy policy to understand how their data is handled.</p>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className=" flex  gap-2 ">
                <button onClick={()=>handleUpdateProfile(currentUser._id)} className="btn" > I well Do Letter </button>
                <Link href="/dashboard/profile-edit">
                  <button className="btn">Completed Profile </button>
                </Link>
              </div>
            </form>
          </div>
        </div>

      </dialog >

    </>







  );
};

export default Navend;
"use client";

import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import PageLoading from "@/components/Shared/loadingPageBook/PageLoading";
import useAllUsers from "@/Hooks/Users/useAllUsers";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({});
  const axiosSecure = useAxiosSecure();
  const { usersData, isLoading, refetch } = useAllUsers(currentPage, 14);

  if (isLoading) {
    return <PageLoading />;
  }

  const allUser = usersData?.users || [];
  const totalUser = usersData?.totalUser || 0;

  const pageNumbers = Array.from(
    { length: Math.ceil(totalUser / 14) },
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
    if (currentPage < Math.ceil(totalUser / 14)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const hendleUserRole = (id, role) => {
    axiosSecure
      .patch(`/api/v1/users/${id}`, { [role]: true })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Member updated successfully",
          });
          refetch();
          document.getElementById("role_modal").close();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to update member",
          });
          refetch();
          document.getElementById("role_modal").close();
        }
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error updating member",
        });
        refetch();
        document.getElementById("role_modal").close();
      });
  };

  const removeUserRole = (id, role) => {
    axiosSecure
      .patch(`/api/v1/users/${id}`, { [role]: false })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Member removed from role successfully",
          });
          refetch();
          document.getElementById("role_modal").close();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to remove member from role",
          });
          refetch();
          document.getElementById("role_modal").close();
        }
      })
      .catch((error) => {
        console.error("Error removing user from role:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error removing member from role",
        });
        refetch();
        document.getElementById("role_modal").close();
      });
  };


  return (
    <>
      <div className="grid grid-cols-1 gap-5">
        <div className="flex items-center justify-center">
          <div className="container duration-300">
            <div className="w-full rounded-2xl overflow-hidden lg:shadow-lg my-5 duration-300">
              <div className="hidden lg:block bg-[#016961] duration-300 text-white ">
                <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                  <h5 className="w-[40px] lg:mr-10"></h5>
                  <h5 className="w-full lg:mr-10">User</h5>
                  <h5 className="w-full lg:mr-10">Email</h5>
                  {/* <h5 className="w-full lg:mr-10">Register Date</h5> */}
                  <h5 className="w-full lg:mr-10">Roles</h5>
                  <h5 className="w-full lg:mr-10">View Profile</h5>
                </div>
              </div>
              <div className="flex-1 sm:flex-none grid grid-cols-1 gap-5 lg:gap-0">
                {allUser.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-3xl lg:rounded-none shadow-sm hover:bg-[#19a49113] lg:shadow-inherit border border-gray-100"
                  >
                    <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-1  rounded-3xl lg:rounded-none px-6 lg:px-10 py-5 mx-auto duration-300">
                      <div className="min-w-[40px] mr-2">
                        <Image
                          src={user?.image}
                          alt="profile"
                          priority
                          width={500}
                          height={500}
                          className="rounded-full p-1 mx-auto size-32 lg:size-10"
                        />
                      </div>
                      <h5 className="w-full lg:mr-10 text-lg font-semibold text-center lg:text-start line-clamp-1 truncate">
                        {user?.name}
                      </h5>
                      <h5 className="w-full lg:mr-10 text-center lg:text-start">
                        {user?.email}
                      </h5>
                      <h5 className="w-full lg:mr-10 text-center lg:text-start">
                        {user?.reg_date}
                      </h5>
                      <div className="w-full lg:mr-10 flex gap-1.5 text-sm text-black justify-center lg:justify-start">
                        {user?.isModerator && (
                          <p className="py-0.5 px-2 bg-orange-400 rounded-full my-1.5">
                            Moderator
                          </p>
                        )}
                        {user?.isPublisher && (
                          <p className="py-0.5 px-2 bg-sky-500 rounded-full my-1.5">
                            Publisher
                          </p>
                        )}
                        {user?.isSeller && (
                          <p className="py-0.5 px-2 bg-teal-500 rounded-full my-1.5">
                            Seller
                          </p>
                        )}
                      </div>
                      <button
                        className="w-full bg-[#016961] py-2 rounded-full lg:bg-transparent lg:mr-10 mt-2 lg:mt-auto text-center lg:text-start text-white lg:text-black"
                        onClick={() => {
                          setData(user);
                          document.getElementById("role_modal").showModal();
                        }}
                      >
                        Role Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="role_modal" className="modal">
        <div className="modal-box">




          <a
            href="#"
            className="relative block overflow-hidden rounded-lg border border-gray-300 p-4 sm:p-6 lg:p-8"
          >
            <span
              className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
            ></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {data?.name}
                </h3>

                <p className="pt-3"> Location: {data?.location?.street ? data.location.street : "Not Found"} </p>

                <p className="mt-1 text-md font-medium text-gray-600"> Gender  : {data?.gender ? data?.gender : "Not Found"}  </p>
              </div>

              <div class="hidden sm:block sm:shrink-0">
                <Image
                  alt=""
                  src={data?.image}
                  priority width={100} height={100}
                  className="size-20 rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>



            <dl className="mt-6 flex gap-4 sm:gap-6">

              <div className=" flex items-center gap-6 cursor-pointer">
                {data?.isModerator ? (
                  <button
                    onClick={() => removeUserRole(data._id, "isModerator")}
                    className="font-bold text-lg"
                  >
                    Remove Moderator
                  </button>
                ) : (
                  <button
                    onClick={() => hendleUserRole(data._id, "isModerator")}
                    className="font-bold text-lg"
                  >
                    Add Moderator
                  </button>
                )}
                {data?.isPublisher ? (
                  <button
                    onClick={() => removeUserRole(data._id, "isPublisher")}
                    className="font-bold text-lg"
                  >
                    Remove Publisher
                  </button>
                ) : (
                  <button
                    onClick={() => hendleUserRole(data._id, "isPublisher")}
                    className="font-bold text-lg"
                  >
                    Add Publisher
                  </button>
                )}
                {data?.isSeller ? (
                  <button
                    onClick={() => removeUserRole(data._id, "isSeller")}
                    className="font-bold text-lg"
                  >
                    Remove Seller
                  </button>
                ) : (
                  <button
                    onClick={() => hendleUserRole(data._id, "isSeller")}
                    className="font-bold text-lg"
                  >
                    Add Seller
                  </button>
                )}
              </div>

            </dl>
          </a>



          <div className="modal-action">
            <form method="dialog">
              <button className="btn">
                <AiOutlineClose className="text-xl text-red-600" />
              </button>
            </form>
          </div>
        </div>
      </dialog>

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
    </>
  );
};

export default Users;

"use client";

import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Image from "next/image";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useRef, useState } from "react";
import useImageURL from "@/Hooks/ImageURL/useImageURL";
import { useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

const MyBlogCard = ({ item, refetch }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { imageUrl, uploadImage } = useImageURL(selectedFile);
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);

  const handelDeleteBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`api/v1/blogs/${id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Your blog has been deleted.",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error deleting blog",
              });
            }
          })
          .catch((error) => {
            console.error("Error updating user role:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error deleting blog",
            });
          });
      }
    });
  };

  const handleUpdate = () => {
    modalRef.current.showModal();
  };

  const handleUpdateBlog = async (data) => {
    const { title, body, category, tags } = data;
    const url = await uploadImage();

    const updateBlogInfo = {
      title,
      body,
      category,
      tags,
      cover_image: url,
    };

    const res = await axiosSecure.patch(
      `api/v1/blogs/${item?._id}`,
      updateBlogInfo
    );

    if (res?.data) {
      modalRef.current.close();
      refetch();
    }
  };

  return (
    <div>
      <div className="rounded shadow-lg w-full h-full flex flex-col justify-between">
        <div>
          <Image 
            src={item?.cover_image}
            className="rounded h-[200px]"
            width={500}
            height={500}
            alt="latest"
          />
          <div className="p-4">
            <Link
              href={`/blogs/${item?._id}`}
              className="text-gray-600 hover:text-gray-800"
            >
              <h2 className="font-bold text-xl">{item?.title}</h2>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 px-4 py-2 border-t">
          <div>
            <h6 className="text-[#016961] font-bold">{item?.category}</h6>
          </div>
          <div className="space-x-2">
            <button
              onClick={handleUpdate}
              className="text-center cursor-pointer font-semibold text-xl text-gray-500 hover:text-gray-700"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handelDeleteBlog(item?._id)}
              className="text-center cursor-pointer font-semibold text-xl text-gray-500 hover:text-gray-700"
            >
              <RiDeleteBin6Fill />
            </button>
          </div>
        </div>
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-5/12 max-w-4xl bg-50-50">
          <h1 className="text-4xl font-bold text-[#016961] pb-5 ">
            Update Blog
          </h1>

          <div className="space-y-3 mb-3">
            <input
              className="h-10 w-full px-2 text-xs md:text-sm bg-teal-50/40 shadow-md border rounded-lg border-[#016961] focus:outline-none"
              {...register("title")}
              type="text"
              id="title"
              defaultValue={item?.title}
              required
              placeholder="Title"
            />
            <input
              className="h-10 w-full px-2 text-xs md:text-sm bg-teal-50/40 shadow-md border border-[#016961] rounded-lg focus:outline-none"
              {...register("tags")}
              id="tags"
              defaultValue={item?.tags}
              type="text"
              placeholder="Tags"
            />
          </div>

          <div>
            <textarea
              className="w-full p-2 text-xs md:text-sm bg-teal-50/40 shadow-md border border-[#016961] rounded-lg focus:outline-none"
              {...register("body")}
              id="body"
              defaultValue={item?.body}
              cols="30"
              rows="20"
              required
              placeholder="Description"
            ></textarea>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-3">
                <button className="flex items-center gap-2 w-full px-4 text-center cursor-pointer border border-[#016961] text-[#016961] font-medium p-2 text-sm rounded-lg shadow-md hover:shadow-none">
                  <FaChevronLeft /> <span>Close</span>
                </button>
                <button
                  onClick={handleSubmit(handleUpdateBlog)}
                  className="flex items-center gap-2 w-full px-4 text-center cursor-pointer border border-[#016961] text-[#016961] font-medium p-2 text-sm rounded-lg shadow-md hover:shadow-none"
                >
                  <span>Update</span> <FaChevronRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyBlogCard;

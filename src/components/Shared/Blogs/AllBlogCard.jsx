"use client";

import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Image from "next/image";
import { BsUpload } from "react-icons/bs";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";
import useImageURL from "@/Hooks/ImageURL/useImageURL";
import { useForm } from "react-hook-form";

const AllBlogCard = ({ item, refetch }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { imageUrl, uploadImage } = useImageURL(selectedFile);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();


  // create a preview as a side effect, whenever selected file is changed
  const onSelectFile = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setPreview(undefined);
      return;
    }

    const selectedImage = files[0];
    setSelectedFile(selectedImage);

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);
  };

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
    const modal = document.getElementById("update_blog_modal");
    modal.showModal();
  };

  const handleUpdateBlog = async (data) => {
    const { title, description: body, category, tags } = data;
    const url = await uploadImage();

    const updateBlogInfo = {
      title,
      body,
      category,
      tags,
      cover_image: url,
    };

    const res = await axiosSecure.patch(`api/v1/blogs/${item?._id}`, updateBlogInfo);

    if (res?.data) {
      refetch()
      document.getElementById("update_blog_modal").close();
      setSelectedFile(null)
      setPreview(null)
    }
  }

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
            <h2 className="font-bold text-xl text-gray-800">{item?.title}</h2>
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
      <dialog id="update_blog_modal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <h1 className="text-3xl text-center font-bold py-2">Update Blog</h1>
          {/* basic information div */}
          <div className=" border-2 border-[#016961] rounded-lg px-3 pb-3">
            {/* id */}

            {/* title */}
            <h3 className="text-sm font-light py-2">Blog Title:</h3>
            <input
              className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg border-[#016961] focus:outline-none"
              {...register("title")}
              type="text"
              id="title"
              defaultValue={item?.title}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-3">
            {/* book description div */}
            <div className="border-2 col-span-1 lg:col-span-2 border-[#016961] rounded-lg h-full w-full px-2 pb-1">
              {/* title */}
              <h3 className="text-sm font-light py-2">Blog Description:</h3>
              {/* blog description div name:description*/}
              <div>
                <textarea
                  className="w-full p-2 text-xs bg-transparent border-2 border-[#016961] rounded-lg focus:outline-none"
                  {...register("description")}
                  id="description"
                  defaultValue={item?.body}
                  cols="30"
                  rows="10"
                  required
                ></textarea>
              </div>
            </div>

            {/* image div */}
            <div className="border-2 flex flex-col border-[#016961] rounded-lg h-full w-full px-2 pb-3">
              {/* title */}
              <h3 className="text-sm font-light py-2">
                Upload blog cover image:
              </h3>
              {/* image */}
              <div className="w-full h-full border flex justify-center items-center border-[#016961] rounded-lg"
              >
                {!selectedFile ? (
                  <label htmlFor="imageFile"
                    className="border px-3 py-1 flex justify-center items-center gap-3 rounded-lg text-center text-sm  cursor-pointer"
                  >
                    <BsUpload /> <span> Upload Here</span>
                  </label>
                ) : (
                  <Image
                    src={preview}
                    width={500}
                    height={500}
                    alt="Image Preview"
                  />
                )}
                <input
                  id="imageFile"
                  type="file"
                  onChange={onSelectFile}
                  name="cover_image"
                  hidden
                />
              </div>
            </div>
          </div>

          {/* Blog category */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="border-2 border-[#016961] rounded-lg h-full w-full px-2 mt-3 pb-3">
              <h3 className="text-sm font-light py-2">Blog Category:</h3>

              <div className="grid grid-cols-1 gap-3">
                {/* blog Tags name:category*/}
                <input
                  className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                  {...register("category")}
                  id="category"
                  type="text"
                  defaultValue={item?.category}
                  required
                />
              </div>
            </div>
            <div className="border-2 border-[#016961] rounded-lg h-full w-full px-2 mt-3 pb-3">
              <h3 className="text-sm font-light py-2">Blog Tags:</h3>

              <div className="grid grid-cols-1 gap-3">
                {/* blog Tags name:tags*/}
                <input
                  className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                  {...register("tags")}
                  id="tags"
                  defaultValue={item?.tags}
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex gap-5">
                <button
                  onClick={handleSubmit(handleUpdateBlog)}
                  className="w-full px-4 mt-6 text-center cursor-pointer bg-[#016961] text-white font-medium p-2 text-sm rounded-full "
                >
                  Update
                </button>
                <button className="w-full px-4 mt-6 text-center cursor-pointer bg-[#016961] text-white font-medium p-2 text-sm rounded-full ">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};


export default AllBlogCard;
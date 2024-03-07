"use client";

import React, { useContext, useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { BsUpload } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";
import Image from "next/image";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useImageURL from "@/Hooks/ImageURL/useImageURL";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=7365e777963cf7664292cb83647a9d98`;

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { imageUrl, uploadImage } = useImageURL(selectedFile);
  const { user } = useContext(AuthContext);
  const owner_email = user?.email;


  const { data: categories = [], isPending, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/category`);
      return res.data;
    },
  });

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


  const onSubmit = async (data) => {
    const {
      title,
      description,
      writer,
      category,
      language,
      pages,
      price,
      publisher,
      published_year,
      edition,
      stock_limit,
    } = data;



    const cover_image = await uploadImage();



    const newBook = {
      title,
      description,
      writer,
      category,
      language,
      pages,
      price,
      publisher,
      published_year,
      edition,
      owner_email,
      stock_limit,
      upload_time: new Date().toISOString(),
      avg_rating: 4.2,
      cover_image,
    };

    const res = await axiosSecure.post("/api/v1/buy-books", newBook);

    if (res?.data) {
      reset();
      Swal.fire("Book upload successful");
    }
  };


  return (
    <div className="container mx-auto pb-10">
      <div className="border border-[#016961] rounded-lg text-[#016961] bg-50-50 p-5">
        <h1 className="text-3xl font-bold py-5 md:py-3 text-center md:text-start">
          Add Your Book
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* basic information start */}
          <h3 className="mb-3">Basic Information:</h3>
          <div className="space-y-5 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
              {/* book title */}
              <input
                className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("title")}
                placeholder="Book Title"
                type="text"
                required
              />

              {/* book writer */}
              <input
                className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("writer")}
                placeholder="Book writer"
                type="text"
                required
              />

              {/* book category */}
              <select
                className="h-11 w-full text-xs md:text-sm text-gray-400 px-2 bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("category")}
              >
                <option selected hidden value="">
                  Book Category
                </option>
                {categories?.map((category) => (
                  <option key={category?._id} value={category?.category_name}>
                    {category?.category_name}
                  </option>
                ))}
              </select>
              {/* book language */}
              <select
                className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] text-gray-400 rounded-lg focus:outline-none shadow-md"
                {...register("language")}
              >
                <option selected value="">
                  Book Language
                </option>
                <option value="english">English</option>
                <option value="bangla">Bangla</option>
                <option value="arabic">Arabic</option>
              </select>
            </div>
          </div>
          {/* basic information end */}


          {/* book information start */}
          <h3 className="mb-3">Basic Information:</h3>
          <div className="space-y-5 mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* book page count */}
              <input
                className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("pages")}
                placeholder="Book Page Count"
                type="number"
                required
              />

              {/* book publisher */}
              <input
                className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("publisher")}
                placeholder="Book Publisher"
                type="text"
                required
              />

              {/* book publication year */}
              <input
                className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("published_year")}
                placeholder="Book Publication Year"
                type="number"
                required
              />

              {/* book edition */}
              <input
                className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("edition")}
                placeholder="Book Edition"
                type="text"
                required
              />

              {/* book price */}
              <input
                className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("price")}
                placeholder="Book Price"
                type="number"
                required
              />

              {/* book Stock Limit */}
              <input
                className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("stock_limit")}
                placeholder="Book Stock"
                type="number"
                required
              />
            </div>


            {/* book information end */}

            <div className="grid grid-cols-1 gap-3">

              {/* other information end */}


              {/* book description */}
              <textarea
                className="w-full p-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                {...register("description")}
                placeholder="Book Description"
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* image section start */}
              <div>
                <h3 className="mb-3">Upload book cover Image:</h3>
                <div className="w-full min-h-[200px] border flex justify-center items-center border-[#016961] rounded-lg bg-teal-50/40 shadow-md">
                  {!selectedFile ? (
                    <label htmlFor="book_Image"
                      className="border px-3 py-1 flex justify-center items-center gap-3 rounded-lg text-center text-sm cursor-pointer"
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
                    type="file"
                    id="book_Image"
                    {...register("book_Image")}
                    onChange={onSelectFile}
                    hidden
                  />
                </div>
              </div>
              {/* image section end */}

            </div>

          </div>

          {/* button section start*/}
          <div className="flex justify-end md:justify-end items-center gap-3 pb-5">
            <button
              type="submit"
              className="px-3 py-2 border border-[#016961] rounded-lg uppercase bg-teal-50/40 shadow-md hover:shadow-none"
            >
              <span className="flex items-center gap-1 text-xs md:text-sm">
                <span>Publish</span> <SlArrowRight />
              </span>
            </button>
          </div>
          {/* button section end*/}
        </form>
      </div>
    </div>
  );
};

export default AddBook;


"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { BsUpload } from "react-icons/bs";
import Swal from "sweetalert2";
import useImageURL from "@/Hooks/ImageURL/useImageURL";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const ExchangeAdd = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [selectFile, setSelectFile] = useState();
  const [preview, setPreview] = useState(undefined);
  const { imageUrl, uploadImage } = useImageURL(selectFile);
  const axiosSecure = useAxiosSecure();

  const { data: categories = [], isPending, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/category`);
      return res.data;
    },
  });

  const addOnSelectFile = () => {
    const file = document.getElementById('imageFile').files[0];

    if (!file) {
      setSelectFile(undefined);
      setPreview(undefined);
      return;
    }
    setSelectFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleExchangeBook = async (data) => {
    const {
      cover_type,
      condition,
      format,
      category,
      title,
      writer,
      language,
      pages,
      cover_image = await uploadImage(),
      publisher,
      publication_year,
      edition,
      tags,
      description,
    } = data;

    // const newBook
    const newBook = {
      cover_type,
      owner_email: user?.email,
      condition,
      format,
      category,
      title,
      writer,
      language,
      pages,
      cover_image,
      publisher,
      publication_year,
      edition,
      tags,
      description,
      exchange_status: "available",
    };

    axiosSecure.post(
      "https://boi-binimoy-server.vercel.app/api/v1/exchange-books",
      newBook
    )
      .then((response) => {
        // Handle the success response
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add book successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to added writer",
        });
      });
  };

  return (
    <div className="bg-teal-50 text-[#016961] min-h-screen">
      <div className="container mx-auto">
        <div className="border-2 border-[#016961] rounded-lg px-3">
          <h1 className="text-2xl font-bold py-5 md:py-3 text-center md:text-start">
            Add Book for Exchange
          </h1>

          <form onSubmit={handleSubmit(handleExchangeBook)}>
            {/* basic information div */}
            <div className="border-2 border-gray-300 rounded-lg px-3 pb-3">
              {/* title */}
              <h3 className="text-sm font-light py-2">Basic Information:</h3>
              {/* information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* product type name:cover_type*/}
                <select
                  className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                  {...register("cover_type")} required
                >
                  <option hidden selected value="">Cover type</option>
                  <option value="paperback">Paperback</option>
                  <option value="abstract">Abstract Cover</option>
                  <option value="photographic">Photographic Cover</option>
                  <option value="illustrated">Illustrated Cover</option>
                </select>

                {/* product conditions name:bookCondition*/}
                <select
                  className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                  {...register("condition")} required
                >
                  <option hidden selected value="">Book Condition</option>
                  <option value="good">Good</option>
                  <option value="veryGood">Very Good</option>
                  <option value="notGoodOrBad">Not So Good or Bad</option>
                  <option value="bad">Bad</option>
                  <option value="veryBad">Very Bad</option>
                </select>

                {/* what you wants name:bookFormat*/}
                <select
                  className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                  {...register("format")} required
                >
                  <option value="" hidden selected>Book Format</option>
                  <option value="print">Print</option>
                  <option value="pdf">PDF</option>
                  <option value="audioBook">AudioBook</option>
                </select>

                {/* book category name:bookCategory*/}
                <select
                  className="h-10 w-full text-xs px-2 bg-transparent border rounded-lg focus:outline-none"
                  {...register("category")} required
                >
                  <option hidden selected value="">Book Category</option>
                  {
                    categories?.map(category => <option key={category?._id} value={category?.category_name}>{category?.category_name}</option>)
                  }
                </select>
              </div>
            </div>

            {/* book information and image div */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3 gap-3">
              {/* book information div */}
              <div className="border-2 col-span-1 lg:col-span-2 border-gray-300 rounded-lg h-full w-full px-2 pb-3">
                {/* title */}
                <h3 className="text-sm font-light py-2">Book Information:</h3>
                {/* information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {/* book title  name:title*/}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    {...register("title")}
                    placeholder="Book Title"
                    type="text"
                    required
                  />

                  {/* book author  name:writer*/}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    {...register("writer")}
                    placeholder="Book Author"
                    type="text"
                    required
                  />

                  {/* book language  name:language*/}
                  <select
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    {...register("language")} required
                  >
                    <option hidden selected value="">Book Language</option>
                    <option value="english">English</option>
                    <option value="bangla">Bangla</option>
                    <option value="arabic">Arabic</option>
                  </select>

                  {/* book page  name:pages*/}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    {...register("pages")}
                    placeholder="Book Pages"
                    type="number"
                    required
                  />

                  {/* book publisher name:publisher*/}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    {...register("publisher")}
                    placeholder="Book Publisher"
                    type="text"
                    required
                  />

                  {/* book publication year name:publication_year*/}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    {...register("publication_year")}
                    placeholder="Book Publication Year"
                    type="number"
                    required
                  />

                  {/* book edition name:edition*/}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    {...register("edition")}
                    placeholder="Book Edition"
                    type="text"
                    required
                  />

                </div>
                {/* book description div name:description*/}
                <div className="mt-3">
                  <textarea
                    className="w-full p-2 text-xs bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none"
                    {...register("description")}
                    placeholder="Book Description"
                    cols="30"
                    rows="10"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* image div */}
                <div className="border-2 col-span-1 border-gray-300 rounded-lg h-full w-full px-2">
                  {/* title */}
                  <h3 className="text-sm font-light my-2">
                    Upload book cover Image:
                  </h3>
                  {/* image */}
                  {/* image div start*/}
                  <div className="w-full h-[80%] border flex justify-center items-center border-[#016961] rounded-lg shadow-md"
                  >
                    {!selectFile ? (
                      <input
                        type="text"
                        readOnly
                        placeholder="No Image selected"
                        alt="Preview"
                        style={{
                          height: 'full',
                          width: 'full'
                        }}
                        className="text-center bg-teal-50/40"
                      />

                    ) : (
                      <Image
                        src={preview}
                        width={350}
                        height={300}
                        alt="Image Preview"
                        style={{
                          height: '350px',
                          width: '100%',
                          borderRadius: '5px'
                        }}
                      />
                    )}

                  </div>
                  <div className="mt-2">
                    <label htmlFor="imageFile"
                      className="bg-[#016961] text-white py-2 flex justify-center items-center gap-3 rounded-lg text-center text-xs md:text-sm  cursor-pointer"
                    >
                      <BsUpload /> <span> Upload Here</span>
                      <input
                        type="file"
                        id="imageFile"
                        onChange={addOnSelectFile}
                        hidden
                      />
                    </label>
                  </div>
                  {/* image div end */}
                </div>
              </div>
            </div>

            {/* go to home and submit buttons */}
            <div className="flex justify-center md:justify-end text-xs items-center mb-4 gap-3">
              <Link href="/dashboard">
                <button className="px-3 py-2 border-2 border-gray-300 rounded-lg uppercase">
                  <span className="flex items-center gap-1">
                    <SlArrowLeft /> <span>Go to Dashboard</span>
                  </span>
                </button>
              </Link>
              <button
                type="submit"
                className="px-3 py-2 border-2 border-gray-300 rounded-lg uppercase"
              >
                <span className="flex items-center gap-1">
                  <span>Submit</span> <SlArrowRight />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExchangeAdd;

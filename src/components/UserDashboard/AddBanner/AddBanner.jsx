"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { BsUpload } from "react-icons/bs";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import useImageURL from "@/Hooks/ImageURL/useImageURL";
import Image from "next/image";
import Swal from "sweetalert2";

const AddBanner = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [selectedFile, setSelectedFile] = useState();
  const [preview1, setPreview1] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [preview2, setPreview2] = useState();
  const { uploadImage } = useImageURL(selectedFile);
  const { uploadImage: thumbnel_image } = useImageURL(selectedFile2);

  // create a preview1 as a side effect, whenever selected file is changed
  const onSelectFile = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setPreview1(undefined);
      return;
    }
    const selectedImage = files[0];
    setSelectedFile(selectedImage);
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview1(objectUrl);
  };
  // create a preview1 as a side effect, whenever selected file is changed
  const onSelectFile2 = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setSelectedFile2(undefined);
      setPreview2(undefined);
      return;
    }
    const selectedImage = files[0];
    setSelectedFile2(selectedImage);
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview2(objectUrl);
  };

  // post banner data
  const onSubmit = async (data) => {
    const cover_image = await uploadImage();
    const thumbnail_img = await thumbnel_image();

    const {
      title,
      author,
      topic,
      see_more_button,
      buy_now_button,
      description,
      thumbnail_description,
    } = data;
    const blogInfo = {
      cover_image,
      title,
      author,
      topic,
      see_more_button,
      buy_now_button,
      description,
      thumbnail_description,
      thumbnail_img,
    };

    axiosSecure
      .post("/api/v1/banner", blogInfo)
      .then((response) => {
        // Handle the success response
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your banner has been published.",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <div className="text-[#016961] min-h-screen pb-10">
      <div className="container mx-auto">
        <div className="border border-[#016961] rounded-lg p-5 bg-50-50">
          <h1 className="text-3xl font-bold py-5 md:py-3 text-center md:text-start">
            Add Banner
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Cover Informations div */}
            <div className="">
              {/* <h3 className="text-lg font-semibold pb-3">
                Cover Informations:
              </h3> */}
              <div className="flex flex-col lg:flex-row items-center gap-3 ">
                <input
                  className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border rounded-lg border-[#016961] focus:outline-none shadow-md"
                  {...register("title")}
                  placeholder="Cover Title"
                  type="text"
                  required
                />
                <input
                  className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border rounded-lg border-[#016961] focus:outline-none shadow-md"
                  {...register("author")}
                  placeholder="Cover Book Author"
                  type="text"
                  required
                />
                <input
                  className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border rounded-lg border-[#016961] focus:outline-none shadow-md"
                  {...register("topic")}
                  placeholder="Cover Topic"
                  type="text"
                  required
                />
              </div>
              {/* SEE MORE and Buy Now button links */}
              <div className="flex flex-col lg:flex-row items-center gap-3 pt-3">
                <input
                  className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border rounded-lg border-[#016961] focus:outline-none shadow-md"
                  {...register("see_more_button")}
                  placeholder="SEE MORE button link"
                  type="url"
                />
                <input
                  className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border rounded-lg border-[#016961] focus:outline-none shadow-md"
                  {...register("buy_now_button")}
                  placeholder="Buy Now button link"
                  type="url"
                />
              </div>
              {/* Description and image upload */}
              <div className="flex  flex-col lg:flex-row gap-3 pt-3">
                <div className="w-full">
                  <textarea
                    className="w-full p-3 text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                    {...register("description")}
                    placeholder="Banner Cover Description"
                    cols="30"
                    rows="10"
                    required
                  ></textarea>
                </div>
                <div className="w-full lg:w-2/5 border flex justify-center items-center border-[#016961] rounded-lg bg-teal-50/40 shadow-md">
                  {!selectedFile ? (
                    <label htmlFor="cover_image"
                      className="border px-3 py-1 flex justify-center items-center gap-3 rounded-lg text-center text-sm cursor-pointer"
                    >
                      <BsUpload /> <span> Upload Here</span>
                    </label>
                  ) : (
                    <Image 
                      src={preview1}
                      width={500}
                      height={500}
                      alt="Image Preview1"
                    />
                  )}
                  <input
                    type="file"
                    id="cover_image"
                    {...register("cover_image")}
                    onChange={onSelectFile}
                    hidden
                  />
                </div>
              </div>
            </div>

            {/* Thumbnail information */}
            <div className="mt-3">
              {/* <h3 className="text-lg font-semibold pb-3">
                Thumbnail information:
              </h3> */}
              <div>
                <input
                  className="h-11 w-full px-2 text-sm md:text-sm bg-teal-50/40 border rounded-lg border-[#016961] focus:outline-none shadow-md"
                  {...register("thumbnail_title")}
                  placeholder="Thumbnail Title"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-3 pt-3">
                <div className="w-full">
                  <textarea
                    className="w-full p-3 text-sm md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                    {...register("thumbnail_description")}
                    placeholder="Thumbnail Description"
                    cols="30"
                    rows="10"
                    required
                  ></textarea>
                </div>
                <div className="w-full lg:w-2/5 border flex justify-center items-center border-[#016961] rounded-lg bg-teal-50/40 shadow-md">
                  {!selectedFile2 ? (
                    <label htmlFor="thumbnailImageFile"
                      className="border px-3 py-1 flex justify-center items-center gap-3 rounded-lg text-center text-sm cursor-pointer"
                    >
                      <BsUpload /> <span> Upload Here</span>
                    </label>
                  ) : (
                    <Image 
                      src={preview2}
                      width={500}
                      height={500}
                      alt="Image Preview2"
                    />
                  )}
                  <input
                    type="file"
                    id="thumbnailImageFile"
                    {...register("thumbnail_img")}
                    onChange={onSelectFile2}
                    hidden
                  />
                </div>
              </div>
            </div>

            {/* Go to home and submit buttons */}
            <div className="flex flex-col md:flex-row justify-center md:justify-end text-xs items-center my-4 gap-3">
              <Link href="/dashboard">
                <button className="px-3 py-2 border border-[#016961] rounded-lg uppercase shadow-md hover:shadow-none">
                  <span className="flex items-center gap-1">
                    <SlArrowLeft /> <span>GO to Dashboard</span>
                  </span>
                </button>
              </Link>
              <button
                type="submit"
                className="px-3 py-2 border border-[#016961] rounded-lg uppercase shadow-md hover:shadow-none"
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

export default AddBanner;

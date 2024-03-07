"use client";

import Link from "next/link";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { BsUpload } from "react-icons/bs";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useImageURL from "@/Hooks/ImageURL/useImageURL";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";

const AddBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { imageUrl, uploadImage } = useImageURL(selectedFile);
  const axiosSecure = useAxiosSecure();
  const submittingDateTime = new Date();



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

  // blogs submitting function
  const handleBlogSubmit = async (data) => {
    const { form, title, tags, body, category } = data;
    const uploadedImageUrl = await uploadImage();

    const newBlog = {
      form,
      title,
      category,
      tags,
      body,
      cover_image: uploadedImageUrl,
      user_name: "Admin",
      user_email: user?.email,
      publish_date: submittingDateTime.toLocaleDateString(),
      publish_time: submittingDateTime.toLocaleTimeString(),
    };

    axiosSecure
      .post("/api/v1/blogs", newBlog)
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your blog has been published.",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setSelectedFile(undefined);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <div className=" text-[#016961] min-h-screen">
      <div className="container mx-auto">
        <div className="border border-[#016961] rounded-lg p-5 bg-50-50">
          <h1 className="text-3xl font-bold py-5 md:py-3 text-center md:text-start">
            Add Blog
          </h1>
          <form onSubmit={handleSubmit(handleBlogSubmit)}>
            {/* Input start */}
            <div>
              <div>
                <input
                  className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border rounded-lg border-[#016961] focus:outline-none shadow-md"
                  {...register("title")}
                  placeholder="Blog Title"
                  type="text"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3 py-3">
                {/* blog category name:category */}
                <select
                  className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                  {...register("category")}
                  required
                >
                  <option value="" disabled selected hidden>
                    Select a Category
                  </option>
                  <option value="Reviews">Reviews</option>
                  <option value="Author Spotlight">Author Spotlight</option>
                  <option value="Recommendations">Recommendations</option>
                  <option value="Literary News">Literary News</option>
                  <option value="Genres">Genres</option>
                  <option value="Book-to-Film">Book-to-Film</option>
                  <option value="Classics">Classics</option>
                  <option value="New Releases">New Releases</option>
                  <option value="Book Club">Book Club</option>
                  <option value="Events">Events</option>
                  <option value="DIY Crafts">DIY Crafts</option>
                  <option value="Travel Reads">Travel Reads</option>
                  <option value="Children's Corner">
                    Children&apos;s Corner
                  </option>
                  <option value="Cover Design">Cover Design</option>
                  <option value="Quotes">Quotes</option>
                  <option value="Author Interviews">Author Interviews</option>
                  <option value="Gifts">Gifts</option>
                  <option value="Challenges">Challenges</option>
                  <option value="Historical Fiction">Historical Fiction</option>
                  <option value="Indie Spotlight">Indie Spotlight</option>
                  <option value="Bookstores">Bookstores</option>
                  <option value="Digital vs. Physical">
                    Digital vs. Physical
                  </option>
                  <option value="Festivals">Festivals</option>
                  <option value="Podcast Picks">Podcast Picks</option>
                  <option value="Subscription Boxes">Subscription Boxes</option>
                  <option value="Book Art">Book Art</option>
                  <option value="Analysis">Analysis</option>
                  <option value="Multilingual Picks">Multilingual Picks</option>
                  <option value="Organization Tips">Organization Tips</option>
                  <option value="Book Trading">Book Trading</option>
                </select>

                {/* blog Tags name:tags*/}
                <input
                  className="h-11 w-full px-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                  {...register("tags")}
                  placeholder="Blog Tags"
                  type="text"
                  required
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {/*description div start*/}
                <div className="col-span-1 lg:col-span-2 h-full w-full pb-1">
                  <div>
                    <textarea
                      className="w-full p-2 text-xs md:text-sm bg-teal-50/40 border border-[#016961] rounded-lg focus:outline-none shadow-md"
                      {...register("body")}
                      placeholder="Blog Description"
                      cols="30"
                      rows="20"
                      required
                    ></textarea>
                  </div>
                </div>
                {/*description div end*/}

                {/* image div start*/}
                <div className="flex flex-col h-full w-full pb-3">
                  <div className="w-full h-full border flex justify-center items-center border-[#016961] rounded-lg bg-teal-50/40 shadow-md"
                  >
                    {!selectedFile ? (
                      <label
                        for="imageFile"
                        className="w-full h-full flex justify-center items-center gap-3 rounded-lg text-center text-xs md:text-sm cursor-pointer"
                      >
                        <BsUpload /> <span> Upload Here</span>
                      </label>
                    ) : (
                      <Image
                        src={preview}
                        width={500}
                        height={500}
                        alt="Image Preview"
                        className="object-cover h-fit w-full"
                      />
                    )}
                    <input
                      type="file"
                      id="imageFile"
                      {...register("cover_image", {
                        required: "Cover Image is required",
                      })}
                      onChange={onSelectFile}
                      hidden
                      required
                    />
                  </div>
                </div>
                {/* image div end */}
              </div>
            </div>
            {/* Input end */}

            {/* go to home and submit buttons div start */}
            <div className="flex flex-col md:flex-row justify-center md:justify-end text-xs items-center my-4 gap-3">
              <Link href="/dashboard" className="w-full md:w-fit">
                <button className="px-3 py-2 w-full md:w-fit border border-[#016961] rounded-lg bg-teal-50/40 uppercase shadow-md hover:shadow-none">
                  <span className="flex justify-center items-center gap-1">
                    <SlArrowLeft /> <span>Go To Dashboard</span>
                  </span>
                </button>
              </Link>

              <button
                type="submit"
                className="px-3 py-2 w-full md:w-fit border border-[#016961] rounded-lg bg-teal-50/40 uppercase shadow-md hover:shadow-none"
              >
                <span className="flex justify-center items-center gap-1">
                  <span>Submit</span> <SlArrowRight />
                </span>
              </button>
            </div>
            {/* go to home and submit buttons div end */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;

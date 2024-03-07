"use client";

import useOneUser from "@/Hooks/Users/useOneUser";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import palesholderImage from "../../../../public/placeholder.png"



const Profile = () => {
  const { currentUser } = useOneUser();


  return (
    <section>
      <div className="rounded-lg h-full pb-5 mb-10 bg-teal-50">
        <div className="relative bg-[#016961] rounded-t-lg">
          {/* bottom curve */}
          <div className="absolute inset-x-0 bottom-0 ">
            <svg
              viewBox="0 0 224 12"
              fill="currentColor"
              className="w-full -mb-1 text-teal-50"
              preserveAspectRatio="none"
            >
              <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
            </svg>
          </div>

          {/* Information section */}
          <div className="text-white px-4 lg:px-8 pb-20">
            {/* wellcome and edit btton */}
            <div className="flex justify-between items-center py-3">
              <div>
                <h6 className="text-lg font-bold">
                  {currentUser.name ? (
                    <>
                      Welcome, to{" "}
                      <span className="text-xl">{currentUser.name}</span>
                    </>
                  ) : (
                    <></>
                  )}
                </h6>
              </div>
              <div>
                <button className="text-xl md:text-2xl">
                  <IoMdAdd />
                </button>
              </div>
            </div>

            {/* User profile and profile information */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
              {/* user profile */}

              <div className="mb-4">
                {currentUser?.image ? (
                  <Image 
                    src={currentUser?.image}
                    priority width={100} height={100}
                    alt="Profile"
                    className="h-40 w-40 rounded-full mx-auto"
                  />
                ) : (
                  <Image 
                    src={palesholderImage}
                    priority width={100} height={100}
                    alt="Placeholder"
                    className="h-40 w-40 rounded-full bg-gray-300 mx-auto"
                  />
                )}
              </div>


              {/* <Image 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                className="object-cover w-40 h-40 mb-2 rounded-full shadow"
                alt=""
                width={500}
                height={500}
              /> */}


              {/* profile information */}
              <div className="text-center md:text-start">
                <h2 className="text-3xl md:text-4xl lg:text-5xl">
                  {" "}
                  {currentUser.name}
                </h2>
                <p className="font-sans text-xs md:text-sm font-normal text-gray-100 pt-2 pb-1">
                  30k Exchange | 15k Sell | 34k Post
                </p>
                <p className="max-w-sm font-light">{currentUser.email} </p>
                <p className="max-w-sm font-light">01800-000000</p>
              </div>
            </div>
          </div>
        </div>

        {/* personal information and contact Address */}
        <div className="max-w-4xl mx-auto space-y-5 mt-3 px-5 py-3 text-[#016961]">
          {/* personal information */}
          <div className="w-full border-2 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold pb-2 text-[#016961]">
                Personal Information
              </h3>
              <Link href="/dashboard/profile-edit">
                {" "}
                <button className="text-xl md:text-2xl">
                  <CiEdit />
                </button>
              </Link>
            </div>
            <div className="space-y-5 mt-3">
              {/* user name */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded text-xs text-[#016961] px-2">
                  Full Name
                </p>
                <h6 className="text-lg font-bold">
                  {currentUser?.name ? (
                    <>
                      {" "}
                      <span className="text-lg">{currentUser.name}</span>
                    </>
                  ) : (
                    <> User Name </>
                  )}
                </h6>
              </div>

              {/* user Email */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded text-xs text-[#016961] px-2">
                  Email
                </p>

                <h6 className="text-lg font-bold">
                  {currentUser?.email ? (
                    <>
                      {" "}
                      <span className="text-lg">{currentUser?.email}</span>
                    </>
                  ) : (
                    <> example@gmail.com </>
                  )}
                </h6>
              </div>

              {/* user Email */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded text-xs text-[#016961] px-2">
                  Phone
                </p>
                {currentUser.phone_number ? (
                  <> <span className="text-lg">{currentUser.phone_number}</span></>
                ) : (
                  <> 01******** </>
                )}
              </div>

              {/* user dob */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded text-xs text-[#016961] px-2">
                  Date Of Birth
                </p>
                {currentUser.date_of_birth ? (
                  <> <span className="text-lg">{currentUser.date_of_birth}</span></>
                ) : (
                  <> Not set yet </>
                )}
              </div>

              {/* user gander */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded text-xs text-[#016961] px-2">
                  Gender
                </p>
                {currentUser.gender ? (
                  <> <span className="text-lg uppercase">{currentUser.gender}</span></>
                ) : (
                  <> Not set yet </>
                )}
              </div>

              {/* user Profession */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded text-xs text-[#016961] px-2">
                  Profession
                </p>
                {currentUser.profession ? (
                  <> <span className="text-lg ">{currentUser.profession}</span></>
                ) : (
                  <> Not set yet </>
                )}
              </div>
            </div>
          </div>

          {/* Address information */}
          <div className="w-full border-2 rounded-lg p-3 text-[#016961]">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold pb-2 text-[#016961]">
                Address Info
              </h3>
              <Link href="/dashboard/profile-edit">
                {" "}
                <button className="text-xl md:text-2xl">
                  <CiEdit />
                </button>
              </Link>
            </div>

            <div className="space-y-5 mt-3">
              {/* user City */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded text-xs text-[#016961] px-2">
                  Street
                </p>
                {currentUser?.location?.street ? (
                  <> <span className="text-lg uppercase">{currentUser?.location?.street}</span></>
                ) : (
                  <> Not set yet </>
                )}
              </div>

              {/* user Street */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded  text-xs text-[#016961]  px-2">
                  Upozela / Thana
                </p>
                {currentUser?.location?.upozela ? (
                  <> <span className="text-lg uppercase">{currentUser?.location?.upozela}</span></>
                ) : (
                  <> Not set yet </>
                )}
              </div>

              {/* user Country */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded  text-xs text-[#016961]  px-2">
                  District
                </p>
                {currentUser?.location?.district ? (
                  <> <span className="text-lg uppercase">{currentUser?.location?.district}</span></>
                ) : (
                  <> Not set yet </>
                )}
              </div>

              {/* user Address */}
              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded  text-xs text-[#016961]  px-2">
                  Division
                </p>
                {currentUser?.location?.division ? (
                  <> <span className="text-lg uppercase">{currentUser?.location?.division}</span></>
                ) : (
                  <> Not set yet </>
                )}
              </div>

              <div className="relative py-3 px-5 border-2 w-full rounded-md">
                <p className="absolute top-[-8px] ring-0 bg-gray-200 rounded  text-xs text-[#016961]  px-2">
                  Country
                </p>
                {currentUser?.location?.country ? (
                  <> <span className="text-lg uppercase">{currentUser?.location?.country}</span></>
                ) : (
                  <> Not set yet </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

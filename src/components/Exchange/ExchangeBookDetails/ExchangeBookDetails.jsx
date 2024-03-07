"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoIosSend } from "react-icons/io";
import Related from "../../Shared/Related/Related";
import Link from 'next/link'
import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle";

const ExchangeBookDetails = () => {

    const [book, setBook] = useState([]);
    const param = useParams();

    useEffect(() => {
        axios.get(`https://boi-binimoy-server.vercel.app/api/v1/exchange-books/${param?.exchangeId}`)
            .then(function (response) {
                // handle success
                setBook(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [param?.exchangeId])

    return (
        <div className="">
            <SectionTitle heading={`Details of "${book?.title}"`}></SectionTitle>

            <div className="max-w-6xl mx-auto py-10 px-2">
                {/* book img and information section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* book img section */}
                    <div className="w-full">
                        <Image 
                            src={book?.cover_image}
                            alt="book"
                            width={500}
                            height={500}
                            priority
                            className="object-cover w-full rounded-lg"
                        />
                    </div>

                    {/* book information section */}
                    <div className="p-8 space-y-2 border-2 rounded-lg">
                        <h2 className="text-4xl">{book?.title}</h2>
                        <p className="text-xs">
                            by <span className="font-bold">{book?.writer}</span>
                        </p>

                        <div className="flex flex-wrap gap-3 pb-1">
                            <p className="text-xs border rounded-sm px-2 py-1 font-bold">
                                Category: {book?.category}
                            </p>
                            <p className="text-xs border rounded-sm px-2 py-1 font-bold">
                                Language: {book?.language}
                            </p>
                            <p className="text-xs border rounded-sm px-2 py-1 font-bold">
                                Pages: {book?.pages} page
                            </p>
                            <p className="text-xs border rounded-sm px-2 py-1 font-bold">
                                Published Year: {book?.publication_year}
                            </p>
                            <p className="text-xs border rounded-sm px-2 py-1 font-bold">
                                Publisher: {book?.publisher}
                            </p>
                            <p className="text-xs border rounded-sm px-2 py-1 font-bold">
                                Edition: {book?.edition}
                            </p>
                            <p className="text-xs border rounded-sm px-2 py-1 font-bold">
                                Cover Type: {book?.cover_type}
                            </p>
                            <p className="text-xs border rounded-sm px-2 py-1 font-bold">
                                Format: {book?.format}
                            </p>
                            <p className="text-xs border rounded-sm px-2 py-1 font-bold">
                                Condition: {book?.condition}
                            </p>
                        </div>

                        <p className="text-xs">
                            <span className="text-sm font-bold text-justify">
                                Description:
                            </span> {book?.description}
                        </p>

                        <div className="flex justify-center sm:justify-end gap-3 pt-10">
                            <Link href={`/exchangeAllBooks/${book?._id}/exchangeRequest`} className="button-color px-4 py-2 rounded-full text-sm md:text-base text-white flex items-center gap-1">
                                Exchange Request
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related section */}
                <Related />

                {/* review section */}
                <div className="w-full p-8 border-2 rounded-lg">
                    <div className="max-w-5xl mx-auto">
                        {/* send review */}
                        <form className="flex items-center gap-3 pb-5">
                            <input
                                type="text"
                                name="Comment"
                                placeholder="Comment"
                                id=""
                                className="w-full h-8 px-2 bg-transparent border-b focus:outline-none focus:border-black"
                            />
                            <button type="submit" className="text-2xl text-[#016961]">
                                <IoIosSend />
                            </button>
                        </form>

                        {/* all review */}
                        <div className="p-2 space-y-4">
                            {/* review 1 */}
                            <div className="flex items-center gap-3 px-3 py-1 shadow-sm rounded-lg">
                                {/* user image */}
                                <div className="">
                                    <Image 
                                        className="object-cover w-12 h-12 mb-2 rounded-full shadow"
                                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                                        width={500}
                                        height={500}
                                        alt="Person"
                                    />
                                </div>
                                {/* user name, review */}
                                <div>
                                    <h5 className="text-md font-bold">Mr. jhon</h5>
                                    <p className="text-xs">
                                        Dolor sit amet, consectetur adipisicing elit.r adipisicing
                                        elitr adipisicing elit
                                    </p>
                                </div>
                                <hr />
                            </div>

                            {/* review 2 */}
                            <div className="flex items-center gap-3 px-3 py-1 shadow-sm rounded-lg">
                                {/* user image */}
                                <div className="">
                                    <Image 
                                        className="object-cover w-12 h-12 mb-2 rounded-full shadow"
                                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                                        width={500}
                                        height={500}
                                        alt="Person"
                                    />
                                </div>
                                {/* user name, review */}
                                <div>
                                    <h5 className="text-md font-bold">Mr. jhon</h5>
                                    <p className="text-xs">
                                        Dolor sit amet, consectetur adipisicing elit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExchangeBookDetails;
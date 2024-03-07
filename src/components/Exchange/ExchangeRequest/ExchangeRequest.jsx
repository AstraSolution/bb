"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoIosSend } from "react-icons/io";
import Related from "../../Shared/Related/Related";
import { AuthContext } from "@/providers/AuthProvider";
import Swal from 'sweetalert2'
import Link from 'next/link'
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";

const ExchangeRequest = () => {
    const [book, setBook] = useState([]);
    const [bookByEmail, setBookByEmail] = useState([]);
    const param = useParams();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

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

    useEffect(() => {
        const email = localStorage.getItem("email")
        axios.get(`https://boi-binimoy-server.vercel.app/api/v1/exchange-books-individual/${email}`)
            .then(function (response) {
                // handle success
                setBookByEmail(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [user?.email])

    const handleRequest = () => {

        const owner_name = book?.owner;
        const owner_email = book?.owner_email;
        const requester_name = user?.name;
        const requester_email = user?.email;
        const owner_book_id = book?._id;
        const requester_book_id = document.getElementById('bookTitle').value;
        const req_message = document.getElementById('message').value;
        const status = "pending";

        const request = {
            owner_name, owner_email, requester_name, requester_email, owner_book_id, requester_book_id, req_message, status
        }

        axiosSecure.post("api/v1/request-books", request)
            .then((response) => {
                // Handle the success response
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Request successful.",
                    showConfirmButton: false,
                    timer: 1500
                });
                document.getElementById('bookTitle').value.reset();
                document.getElementById('message').value.rest();
            })
            .catch((error) => {
                // Handle errors
                console.error("Error:", error);
            });
    }

    

    return (
        <div className="w-full bg-teal-50">
            {/* Banner */}
            <div className="relative bg-[#016961]">
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
                <div className="text-center px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
                        <h2 className="mb-6 text-3xl font-bold text-white sm:text-5xl">
                            Detail of &quot;{book?.title}&quot;
                        </h2>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-10 px-2">
                {/* book img and information section */}
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    {bookByEmail.length === 0 ?
                        <div className="flex flex-col justify-center">
                            <h1 className="text-4xl text-center">OOPS! It seems like you don&apos;t have any book listed for exchange yet.</h1>
                            <p className="text-xl text-center mt-10">Don&apos;t worry, you can easily add a book to your exchange list by clicking on the &apos;Add a Book&apos; button below. Share the joy of reading and start exchanging books with fellow book lovers today!</p>
                            <Link href="/dashboard/add-book" className="button-color w-1/2 mx-auto py-2 mt-5 rounded-full text-sm md:text-base text-white text-center">Add book</Link>
                        </div> : <div className="p-8 space-y-2 border-2 rounded-lg">
                            <h2 className="text-4xl">Select the book you want to exchange</h2>
                            <select
                                className="h-10 w-full px-2 text-xs lg:text-sm text-gray-400 bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                                name="bookTitle"
                                id="bookTitle"
                            >
                                <option hidden selected value="bookValue">
                                    Your Books
                                </option>
                                {
                                    bookByEmail.map(book => <option key={book?._id} value={book?._id}>
                                        {book?.title}
                                    </option>)
                                }
                            </select>

                            {/* book description div name:description*/}
                            <h3 className="py-2">Write a message for the owner :</h3>
                            <div className="my-3">
                                <textarea
                                    className="w-full p-2 text-xs lg:text-sm bg-transparent border-2 border-[#016961] rounded-lg focus:outline-none"
                                    name="message"
                                    id="message"
                                    placeholder="Your Message"
                                    cols="30"
                                    rows="10"
                                ></textarea>
                            </div>
                            <div className="flex justify-center sm:justify-end gap-3 pt-5">
                                <button onClick={handleRequest} className="button-color px-4 py-2 rounded-full text-sm md:text-base text-white flex items-center gap-1">
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default ExchangeRequest;
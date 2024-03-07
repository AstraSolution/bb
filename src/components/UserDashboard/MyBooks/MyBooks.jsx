"use client"

import Swal from "sweetalert2";
import useSpecificUserBook from "@/Hooks/api/useSpecificUserBook";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Link from "next/link";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

// Convert UTC time string to local time string
function convertToLocalTime(utcTimeString) {
    const utcTime = new Date(utcTimeString);
    const localTime = new Date(utcTime.getTime() - (utcTime.getTimezoneOffset() * 60));
    return localTime.toLocaleString(); 
}

const MyBooks = () => {

    // Fetch specific user books from the backend
    const [specificBooks, refetch, isLoading] = useSpecificUserBook();
    const axiosSecure = useAxiosSecure();
    

    // Handle book deletion
    const handleBookDelete = (id, title) => {
        Swal.fire({
            title: `Delete Book`,
            text: `Are you sure you want to delete the book "${title}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/api/v1/buy-books/${id}`)
                    .then((response) => {
                        if (response.data) {
                            Swal.fire(
                                "Deleted!",
                                `Your book "${title}" has been deleted.`,
                                "success"
                            );
                            refetch();
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting Book:", error);
                        Swal.fire(
                            "Error!",
                            "An error occurred while deleting the book.",
                            "error"
                        );
                    });
            }
        });
    };

    // Render loading state if data is loading
    if (isLoading) {
        return (
            <div className="text-center items-center justify-center flex flex-col min-h-screen">
                <span className="loading loading-ball loading-lg"></span>
            </div>
        );
    }

    // Render message if specific books are not found
    if (specificBooks.length === 0) {
        return (
            <div>
                <h1 className="text-center flex flex-col justify-center font-semibold md:text-3xl lg:text-4xl min-h-screen"> Books Not Found....</h1>
            </div>
        );
    }

    // Render specific books
    return (
        <div>
            <div className="grid grid-cols-1 gap-5">
                <div className="flex items-center justify-center">
                    <div className="container duration-300">
                        <div className="w-full rounded-2xl overflow-hidden lg:shadow-lg my-5 duration-300">
                            <div className="hidden lg:block bg-[#016961] duration-300 text-white">
                                <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                                    <h5 className="w-[40px] lg:mr-10"></h5>
                                    <h5 className="w-full lg:mr-10">Title</h5>
                                    <h5 className="w-full lg:mr-10">Writer</h5>
                                    <h5 className="w-full lg:mr-10">Category</h5>
                                    <h5 className="w-full lg:mr-10">Upload Time</h5>
                                    <h5 className="w-full lg:mr-10">Actions</h5>
                                </div>
                            </div>
                            <div className="flex-1 sm:flex-none grid grid-cols-1 gap-5 lg:gap-0">
                                {specificBooks.map((book) => (
                                    <div
                                        key={book._id}
                                        className="bg-white rounded-3xl lg:rounded-none shadow-sm hover:bg-[#19a49113] lg:shadow-inherit border border-gray-100"
                                    >
                                        <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-1 rounded-3xl lg:rounded-none px-6 lg:px-10 py-5 mx-auto duration-300">
                                            <h5 className="w-full lg:mr-10 text-lg font-semibold text-center lg:text-start line-clamp-1 truncate">
                                                {book.title}
                                            </h5>
                                            <h5 className="w-full lg:mr-10 text-center lg:text-start">
                                                {book.writer}
                                            </h5>
                                            <h5 className="w-full lg:mr-10 text-center lg:text-start">
                                                {book.category}
                                            </h5>
                                            <h5 className="w-full lg:mr-10 text-center lg:text-start">
                                                {convertToLocalTime(book.upload_time)}
                                            </h5>
                                            <div className="w-full flex justify-center lg:justify-start gap-3">
                                                <Link href={`/dashboard/updateBook/${book._id}`}>
                                                    <button className="p-2 text-2xl bg-green-200 text-green-700 rounded-md hover:bg-green-300 hover:text-green-800">
                                                        <GrDocumentUpdate />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleBookDelete(book._id, book.title)}
                                                    className="p-2 text-2xl bg-red-200 text-red-700 rounded-md hover:bg-red-300  hover:text-red-800"
                                                >
                                                    <MdDeleteOutline />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the MyBooks component
export default MyBooks;

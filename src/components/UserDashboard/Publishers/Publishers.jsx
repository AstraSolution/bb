"use client"

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import useImageURL from "@/Hooks/ImageURL/useImageURL";
import { BsUpload } from "react-icons/bs";

const Publishers = () => {

    const axiosSecure = useAxiosSecure();
    const [current, setCurrent] = useState([]);
    const [selectFile, setSelectFile] = useState();
    const [preview, setPreview] = useState(undefined);
    const { imageUrl, uploadImage } = useImageURL(selectFile);

    const { data: publishers = [], isPending, refetch } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/publishers`);
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

    const updateOnSelectFile = () => {
        const file = document.getElementById('updateImageFile').files[0];

        if (!file) {
            setSelectFile(undefined);
            setPreview(undefined);
            return;
        }
        setSelectFile(file);
        setPreview(URL.createObjectURL(file));
    };

    // Add functionality checked
    const handleAdd = async (e) => {
        e.preventDefault();
        const publisher = document.getElementById('publisherName').value;
        const description = document.getElementById('description').value;
        const logo = await uploadImage();
        const newPublisher = {
            publisher,
            description,
            logo
        }

        axiosSecure.post("api/v1/publishers", newPublisher)
            .then(res => {
                if (res.data._id) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Publisher added successfully",
                    });
                    refetch();
                    document.getElementById("publisherName").value = "";
                    document.getElementById("description").value = "";
                    setSelectFile(undefined);
                    document.getElementById("add_modal").close();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to added publisher",
                    });
                    document.getElementById("publisherName").value = "";
                    document.getElementById("description").value = "";
                    setSelectFile(undefined);
                    document.getElementById("add_modal").close();
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to added publisher",
                });
                document.getElementById("publisherName").value = "";
                document.getElementById("description").value = "";
                setSelectFile(undefined);
                document.getElementById("add_modal").close();
            })
    }

    const handleUpdate = (id, publisher, logo, description) => {
        setCurrent({ id, publisher, logo, description });

        const modal = document.getElementById('update_modal');
        modal.showModal();

        document.getElementById('updateName').value = publisher;
        document.getElementById('updateDescription').value = description;
        setPreview(logo);
    }

    // Update functionality checked
    const handleSubmit = async () => {

        const publisher = document.getElementById('updateName').value;
        const description = document.getElementById('updateDescription').value;
        const logo = await uploadImage();
        const updatePublisher = {
            publisher,
            description,
            logo
        }

        axiosSecure.patch(`api/v1/publishers/${current?.id}`, updatePublisher)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Publisher updated successfully',
                    });
                    refetch();
                    document.getElementById('update_modal').close();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to update publisher',
                    });
                    document.getElementById('update_modal').close();
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update publisher',
                });
                document.getElementById('update_modal').close();
            });
    };

    // Delete functionality checked
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`api/v1/publishers/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Publisher has been deleted.',
                            });
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Error deleting publisher',
                            });
                        }
                        refetch();
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error deleting publisher',
                        });
                    });
            }
        });
    }

    return (
        <div className="container pb-10">
            <div className="text-center">
                <button className="btn bg-[#016961] text-white mb-5" onClick={() => document.getElementById('add_modal').showModal()}>Add Publisher</button>
            </div>
            <div className="grid grid-cols-1 gap-5">
                {
                    publishers.map(publisher =>
                        <div key={publisher?._id} className="border-2 border-black rounded-lg p-5 flex flex-col justify-between">
                            <div className="flex flex-col md:flex-row items-center gap-5">
                                <Image
                                    src={publisher?.logo}
                                    alt="Publisher"
                                    priority
                                    width={150}
                                    height={150}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '100%'
                                    }}
                                    className="border border-[#016961]"
                                />
                                <div className="flex-1">
                                    <h5 className="text-xl font-bold text-center my-3">{publisher?.publisher}</h5>
                                    <h5 className="text-justify text-md font-normal">{publisher?.description}</h5>
                                    <div className="flex gap-5 pt-3">
                                        <button onClick={() => handleUpdate(publisher?._id, publisher?.publisher, publisher?.logo, publisher?.description)} className="btn flex-1 bg-[#016961] text-white">Update</button>
                                        <button onClick={() => handleDelete(publisher?._id)} className="btn flex-1 bg-[#016961] text-white">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <dialog id="add_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form onSubmit={handleAdd}>
                        <div className="border-2 border-gray-300 rounded-lg px-3 py-3">
                            {/* image div start*/}
                            <div className="w-[200px] h-[200px] mx-auto border border-[#016961] rounded-full flex justify-center items-center "
                            >
                                {!selectFile ? (
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder="No Image selected"
                                        alt="Preview"
                                        className="w-[200px] h-[200px] text-center bg-teal-50/40 border border-[#016961] rounded-full"
                                    />

                                ) : (
                                    <Image
                                        src={preview}
                                        width={300}
                                        height={300}
                                        alt="Image Preview"
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            borderRadius: '100%'
                                        }}
                                    />
                                )}

                            </div>
                            <div className="mt-3 w-1/2 mx-auto">
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
                            <h3 className="text-sm font-light py-2">Publisher Name</h3>
                            <input
                                className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                                placeholder="Publisher name"
                                id="publisherName"
                                type="text"
                                required
                            />
                            <h3 className="text-sm font-light py-2">Description</h3>
                            <input
                                className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                                id="description"
                                placeholder="Description"
                                type="text"
                                required
                            />
                        </div>
                        <div className="float-right mt-3 flex gap-1">
                            <button type="submit" className="btn btn-sm bg-[#016961] text-white">Submit</button>
                            <button onClick={() => {
                                document.getElementById("add_modal").close();
                                document.getElementById("publisherName").value = "";
                                document.getElementById("description").value = "";
                                setSelectFile(undefined);
                            }} className="btn btn-sm bg-[#016961] text-white">Close</button>
                        </div>
                    </form>
                </div>
            </dialog >

            <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="border-2 border-gray-300 rounded-lg px-3 py-3">
                        <div className="mx-auto w-[200px] h-[200px] border flex justify-center items-center border-[#016961] rounded-full shadow-md"
                        >
                            {preview &&
                                <Image
                                    src={preview}
                                    width={300}
                                    height={300}
                                    id="updateImage"
                                    alt="Image Preview"
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                    }}
                                    className="rounded-full"
                                />}
                        </div>
                        <div className="mt-3 w-1/2 mx-auto">
                            <label htmlFor="updateImageFile"
                                className="bg-[#016961] text-white py-2 flex justify-center items-center gap-3 rounded-lg text-center text-xs md:text-sm  cursor-pointer"
                            >
                                <BsUpload /> <span> Upload Here</span>
                                <input
                                    type="file"
                                    id="updateImageFile"
                                    onChange={updateOnSelectFile}
                                    hidden
                                />
                            </label>
                        </div>
                        <h3 className="text-sm font-light py-2">Publisher Name</h3>
                        <input
                            className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                            placeholder="Publisher name"
                            id="updateName"
                            type="text"
                        />
                        <h3 className="text-sm font-light py-2">Description</h3>
                        <input
                            className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                            placeholder="Description"
                            id="updateDescription"
                            type="text"
                        />
                    </div>
                    <div className="modal-action gap-5">
                        <form method="dialog">
                            <button onClick={handleSubmit} className="btn btn-sm bg-[#016961] text-white">Update</button>
                            <button className="btn btn-sm bg-[#016961] text-white">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div >
    );
};

export default Publishers;
"use client"

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import useImageURL from "@/Hooks/ImageURL/useImageURL";
import { BsUpload } from "react-icons/bs";

const Writers = () => {

    const axiosSecure = useAxiosSecure();
    const [current, setCurrent] = useState([]);
    const [selectFile, setSelectFile] = useState();
    const [preview, setPreview] = useState(undefined);
    const { imageUrl, uploadImage } = useImageURL(selectFile);

    const { data: allWriters = [], isPending, refetch } = useQuery({
        queryKey: ["writers"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/writers`);
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
        const writer_name = document.getElementById('writerName').value;
        const birth = document.getElementById('dateOfBirth').value;
        const death = document.getElementById('dateOfDeath').value;
        const bio = document.getElementById('bio').value;
        const profile = await uploadImage();
        const newWriter = {
            writer_name,
            birth,
            death,
            follower: 0,
            bio,
            profile,
        }

        axiosSecure.post("api/v1/writers", newWriter)
            .then(res => {
                if (res.data._id) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Writer added successfully",
                    });
                    refetch();
                    document.getElementById("writerName").value = "";
                    document.getElementById("dateOfBirth").value = "";
                    document.getElementById("dateOfDeath").value = "";
                    document.getElementById("bio").value = "";
                    setSelectFile(undefined);
                    document.getElementById("add_modal").close();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to added writer",
                    });
                    document.getElementById("writerName").value = "";
                    document.getElementById("dateOfBirth").value = "";
                    document.getElementById("dateOfDeath").value = "";
                    document.getElementById("bio").value = "";
                    setSelectFile(undefined);
                    document.getElementById("add_modal").close();
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to added writer",
                });
                document.getElementById("writerName").value = "";
                document.getElementById("dateOfBirth").value = "";
                document.getElementById("dateOfDeath").value = "";
                document.getElementById("bio").value = "";
                setSelectFile(undefined);
                document.getElementById("add_modal").close();
            })
    }

    const handleUpdate = (id, name, profile, dateBirth, dateDeath, followers, biography) => {
        setCurrent({ id, name, profile, dateBirth, dateDeath, followers, biography });

        const modal = document.getElementById('update_modal');
        modal.showModal();

        document.getElementById('updateName').value = name;
        document.getElementById('updateBirth').value = dateBirth;
        document.getElementById('updateDeath').value = dateDeath;
        document.getElementById('updateFollowers').value = followers;
        document.getElementById('updateBio').value = biography;
        setPreview(profile);
    }

    // Update functionality checked
    const handleSubmit = async () => {

        const writer_name = document.getElementById('updateName').value;
        const birth = document.getElementById('updateBirth').value;
        const death = document.getElementById('updateDeath').value;
        const follower = document.getElementById('updateFollowers').value;
        const bio = document.getElementById('updateBio').value;
        const profile = await uploadImage();
        const updateWriter = {
            writer_name,
            birth,
            death,
            follower,
            bio,
            profile
        }

        axiosSecure.patch(`api/v1/writers/${current?.id}`, updateWriter)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Writer updated successfully',
                    });
                    refetch();
                    document.getElementById('update_modal').close();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to update writer',
                    });
                    document.getElementById('update_modal').close();
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update writer',
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
                axiosSecure.delete(`api/v1/writers/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Writer has been deleted.',
                            });
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Error deleting writer',
                            });
                        }
                        refetch();
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error deleting writer',
                        });
                    });
            }
        });
    }

    return (
        <div className="container">
            <div className="text-center">
                <button className="btn bg-[#016961] text-white mb-5" onClick={() => document.getElementById('add_modal').showModal()}>Add Writer</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {
                    allWriters.map(writer =>
                        <div key={writer?._id} className="border-2 border-black rounded-lg p-5 flex flex-col justify-between">
                            <div>
                                <Image
                                    src={writer?.profile}
                                    alt="writer"
                                    priority
                                    width={100}
                                    height={100}
                                    className="rounded-full p-1 mx-auto w-32 h-32 mb-3"
                                />
                                <h5 className="w-full text-md font-semibold">Name: <span className="font-normal">{writer?.writer_name}</span></h5>
                                <h5 className="w-full text-md font-semibold">Date of Birth: <span className="font-normal">{writer?.birth}</span></h5>
                                <h5 className="w-full text-md font-semibold">Death: <span className="font-normal">{writer?.death === "" ? "N/A" : writer?.death}</span></h5>
                                <h5 className="w-full text-md font-semibold">Followers: <span className="font-normal">{writer?.follower}</span></h5>
                                <h5 className="w-full text-md font-semibold">Bio: <span className="font-normal">{writer?.bio.slice(0, 150)}...</span> </h5>
                            </div>
                            <div className="flex w-full gap-5 pt-3">
                                <button onClick={() => handleUpdate(writer?._id, writer?.writer_name, writer?.profile, writer?.birth, writer?.death, writer?.follower, writer?.bio)} className="btn flex-1 bg-[#016961] text-white">Update</button>
                                <button onClick={() => handleDelete(writer?._id)} className="btn flex-1 bg-[#016961] text-white">Delete</button>
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
                            <div className="w-[150px] h-[150px] mx-auto border flex justify-center items-center border-[#016961] rounded-full shadow-md"
                            >
                                {!selectFile ? (
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder="No Image selected"
                                        alt="Preview"
                                        style={{
                                            height: '150px',
                                            width: '150px'
                                        }}
                                        className="text-center bg-teal-50/40 rounded-full"
                                    />

                                ) : (
                                    <Image
                                        src={preview}
                                        width={150}
                                        height={150}
                                        alt="Image Preview"
                                        style={{
                                            width: '150px',
                                            height: '150px',
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
                            <h3 className="text-sm font-light py-2">Writer Name</h3>
                            <input
                                className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                                placeholder="Writer name"
                                id="writerName"
                                type="text"
                                required
                            />
                            <h3 className="text-sm font-light py-2">Date of Birth</h3>
                            <input
                                className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                                id="dateOfBirth"
                                type="date"
                                required
                            />
                            <h3 className="text-sm font-light py-2">Date of Death</h3>
                            <input
                                className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                                id="dateOfDeath"
                                type="date"
                            />
                            <h3 className="text-sm font-light py-2">Bio</h3>
                            <input
                                className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                                placeholder="Bio"
                                id="bio"
                                type="text"
                                required
                            />
                        </div>
                        <div className="float-right mt-3 flex gap-1">
                            <button type="submit" className="btn btn-sm bg-[#016961] text-white">Submit</button>
                            <button onClick={() => {
                                document.getElementById("writerName").value = "";
                                document.getElementById("dateOfBirth").value = "";
                                document.getElementById("dateOfDeath").value = "";
                                document.getElementById("bio").value = "";
                                setSelectFile(undefined);
                                document.getElementById("add_modal").close();
                            }} className="btn btn-sm bg-[#016961] text-white" >Close</button>
                        </div>
                    </form>
                </div>
            </dialog >

            <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="border-2 border-gray-300 rounded-lg px-3 py-3">
                        <div className="mx-auto w-[150px] h-[150px] border flex justify-center items-center border-[#016961] rounded-full shadow-md"
                        >
                            {preview &&
                                <Image
                                    src={preview}
                                    width={150}
                                    height={150}
                                    id="updateImage"
                                    alt="Image Preview"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '100%'
                                    }}
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
                        <h3 className="text-sm font-light py-2">Writer Name</h3>
                        <input
                            className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                            placeholder="Writer name"
                            id="updateName"
                            type="text"
                            required
                        />
                        <h3 className="text-sm font-light py-2">Date of Birth</h3>
                        <input
                            className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                            id="updateBirth"
                            type="date"
                            required
                        />
                        <h3 className="text-sm font-light py-2">Date of Death</h3>
                        <input
                            className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                            id="updateDeath"
                            type="date"
                        />
                        <h3 className="text-sm font-light py-2">Followers</h3>
                        <input
                            className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                            placeholder="Followers"
                            id="updateFollowers"
                            type="number"
                            required
                        />
                        <h3 className="text-sm font-light py-2">Bio</h3>
                        <input
                            className="h-10 w-full px-2 text-xs bg-transparent border border-[#016961] rounded-lg focus:outline-none"
                            placeholder="Bio"
                            id="updateBio"
                            type="text"
                            required
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

export default Writers;
"use client"

import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";

const Notification = () => {

    const { user } = useContext(AuthContext);
    const [fetchData, setFetchData] = useState(true);
    const [incoming, setIncoming] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (fetchData) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        `https://boi-binimoy-server.vercel.app/api/v1/request-books`
                    );;
                    setIncoming(response.data.filter(data => data.owner_email = user?.email));
                } catch (error) {
                    console.error("Error:", error);
                }
            };

            fetchData();
        }
    }, [user?.email, fetchData]);


    const handleAccept = (id) => {
        axiosSecure.patch(`/api/v1/request-books/${id}`, { status: 'Accept' })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Request accepted.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed',
                    });
                }
            })
            .catch(error => {
                console.error("Status:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error',
                });
            });
    }

    return (
        <div className='grid grid-cols-3 gap-5'>
            {
                incoming?.map(notify => <div className='border-2 border-black rounded-lg p-2' key={notify?._id}>
                    <h3>Owner Name: {notify?.owner_name}</h3>
                    <h3>Owner Email: {notify?.owner_email}</h3>
                    <h3>Requester Name: {user?.name}</h3>
                    <h3 className='text-nowrap'>Requester Email: {notify?.requester_email}</h3>
                    <h3>Status: {notify?.status}</h3>
                    <h3 className='font-bold'>Message: {notify?.req_message}</h3>
                    {
                        notify?.status === 'pending' && <div className='flex gap-5'>
                            <button onClick={() => handleAccept(notify?._id)} className="w-full px-4 mt-6 text-center cursor-pointer bg-[#016961] text-white font-medium p-2 text-sm rounded-full ">
                                Accept
                            </button>
                            <button onClick={() => handleDecline(notify?._id)} className="w-full px-4 mt-6 text-center cursor-pointer bg-[#016961] text-white font-medium p-2 text-sm rounded-full ">
                                Decline
                            </button>
                        </div>
                    }
                </div>)
            }
        </div>
    );
};

export default Notification;
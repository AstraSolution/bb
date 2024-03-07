"use client";

import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Image from "next/image";
import Swal from "sweetalert2";

const Order = ({order, refetch}) => {
  const axiosSecure = useAxiosSecure();
  console.log(order);
  
  const handleDelivary = async (id, title) => {
    Swal.fire({
      title: `Delivery Book`,
      text: `Are you sure is delivered the book "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delivered!",
    }).then( async(result) => {
      if (result.isConfirmed) {

        try{ 
          const res = await  axiosSecure.patch(`/api/v1/seller-orders/${id}`);
          if(res.data){
            Swal.fire(
              "Done",
              `Your book "${title}" has been delivered.`,
              "success"
            );
            refetch();
          }
        } catch (error){
          console.log(error)
          Swal.fire(
            "Error!",
            "An error occurred while delivery the book.",
            "error"
          );
        }
      }
    });
  }

  return (
    <div className="grid grid-cols-11 items-center text-center font-semibold border border-gray-100 p-5">
      <Image
        src={order?.cover_image}
        width={150}
        height={200}
        alt="book"
        priority
        style={{ width: "50%", height: "100%" }}
        className="mx-auto col-span-1"
      />
      <h5 className=" col-span-2">{order?.title}</h5>
      <h5 className=" col-span-1"> {order?.quantity} </h5>
      <h5 className=" col-span-1"> {order?.unit_price} BDT</h5>
      <h5 className=" col-span-1"> {order?.total_price} BDT</h5>
      <h5 className=" col-span-1"> {order?.user_name}</h5>
      <h5 className=" col-span-3"> {order?.user_email}</h5>
      <h5 className=" col-span-1">
        {
           !order?.isDeliverd ? <button onClick={() => handleDelivary(order?.book_id, order?.title)} className="btn btn-sm">Pending</button>

           :
           <button className="btn btn-sm">Done</button>

        }
      </h5>
    </div>
  );
};

export default Order;

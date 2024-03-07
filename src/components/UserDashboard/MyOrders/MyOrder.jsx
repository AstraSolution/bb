"use client";

import Image from "next/image";

const MyOrder = ({ cart }) => {

  return (
    <div className="grid grid-cols-9 items-center justify-between text-center font-semibold border border-gray-100 p-5">
      <Image
        src={cart?.cover_image}
        width={150}
        height={200}
        alt="book"
        priority
        style={{ width: "50%", height: "100%" }}
        className="mx-auto col-span-1"
      />

      <h5 className=" col-span-2">{cart?.title}</h5>
      <h5 className=" col-span-1">{cart?.quantity}</h5>
      <h5 className=" col-span-1">{cart?.unit_price} BDT</h5>
      <h5 className=" col-span-1">{cart?.total_price} BDT</h5>
      <h5 className=" col-span-2">{cart?.owner_email}</h5>
      <h5 className=" col-span-1">
        {cart?.isDeliverd ? (
          <button>Done</button>
        ) : (
          <button>Pendingd</button>
        )}
      </h5>
    </div>
  );
};

export default MyOrder;

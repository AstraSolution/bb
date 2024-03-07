"use client";
import React from "react";



function convertToLocalTime(utcTimeString) {
  const utcTime = new Date(utcTimeString);
  const localTime = new Date(utcTime.getTime() - (utcTime.getTimezoneOffset() * 60));
  return localTime.toLocaleString();
}

export default function RecentOrderBookCard({ item }) {
  const {
    _id,
    carts,
    clientEmail,
    orderDate,
    totalBooks,
    totalPrice,
    tranjectionId,
  } = item;
  return (
    <div key={_id} className="border p-4 rounded-lg grid grid-cols-3 gap-3">
      <div className="flex items-center gap-4">
        {carts.map((image, index) => (
          <img key={index} className="w-14" src={image.cover_image} alt={`Cover ${index}`} />
        ))}
      </div>

      <p>{clientEmail}</p>
      <p> {convertToLocalTime(orderDate)}</p>
    </div>
  );
}

"use client";

import React from "react";

export default function TopSellingBooksCard({ item }) {
  const { totalQuantity, bookDetails } = item;
  const { title, cover_image } = bookDetails;

  return (
    <tr className="flex justify-between items-center gap-4 mb-5 border p-3 rounded-lg">
      <td>
        <img className="w-12" src={cover_image} alt="" />
      </td>
      <td>
        <h2>{title}</h2>
      </td>
      <td>
        <p>{totalQuantity}</p>
      </td>
    </tr>
  );
}

"use client";
import React from "react";

export default function LowStockBooksCard({ item }) {
  const { cover_image, title, stock_limit } = item;
  return (
    <div className="flex items-center justify-between border p-3 rounded-lg gap-4 mb-5">
      <img className="w-12" src={cover_image} alt="" />
      <h3>{title}</h3>
      <p>{stock_limit}</p>
    </div>
  );
}

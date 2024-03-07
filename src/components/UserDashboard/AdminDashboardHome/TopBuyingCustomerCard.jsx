"use client";

import React from "react";

export default function TopBuyingCustomerCard({ item }) {
  const { email, image, name, gender, totalPurchases } = item;

  return (
    <div className="flex justify-between items-center gap-4 border p-3 rounded-lg mb-5">
      <img className="w-12 h-12 rounded-full" src={image} alt="" />
      <div className="text-left">
        <h4 className="font-semibold text-xl capitalize">{name}</h4>
        <p>{email}</p>
      </div>
      <p>$ {totalPurchases}</p>
    </div>
  );
}

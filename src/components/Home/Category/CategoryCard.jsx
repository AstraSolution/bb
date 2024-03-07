"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }) {

  return (
    <Link href={`/categories/${category?.category_name}`}>
      <div className="p-6 border rounded-full w-36 h-36 mx-auto ">
        <Image
          className="mx-auto mt-6 -z-20"
          src={category?.category_image}
          alt="category image"
          width={200}
          height={200}
          style={{ width: '100px', height: '100px', borderRadius: '10%' }}
        />
      </div>
      <h3 className="text-teal-800 font-semibold text-center mt-3">
        {category?.category_name}
      </h3>
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

export default function PublisherCard({ item }) {
  return (
    <Link href={`/publisher/${item?._id}`} className="space-y-3">
      <Image 
        src={item?.logo}
        width={200}
        height={200}
        priority
        className="size-20 object-cover md:size-24 lg:size-32 border-4 border-teal-200 p-1 rounded-full mx-auto shadow-xl"
        alt="writer profile"
      />
      <h3
        title={item.publisher}
        className="text-center font-semibold text-xs lg:text-base"
      >
        {item?.publisher.length > 15
          ? `${item?.publisher.slice(0, 15)}..`
          : item?.publisher}
      </h3>
    </Link>
  );
}

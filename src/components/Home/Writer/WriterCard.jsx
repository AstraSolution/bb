"use client";

import Image from "next/image";
import Link from "next/link";

export default function WriterCard({ item }) {

  return (
    <Link href={`/writers/${item?._id}`}>
      <div className="space-y-3">
        <Image 
          src={item?.profile}
          width={100}
          height={100}
          priority
          className="size-20 object-cover md:size-24 lg:size-32 border-4 border-teal-200 p-1 rounded-full mx-auto shadow-xl"
          alt="writer profile"
        />
        <h3
          title={item.writer_name}
          className="text-center font-semibold text-xs lg:text-base"
        >
          {item?.writer_name.length > 15
            ? `${item?.writer_name?.slice(0, 15)}..`
            : item?.writer_name}
        </h3>
      </div>
    </Link>
  );
}

"use client";

import Image from "next/image";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex gap-3 py-1 shadow-sm rounded-lg">
      {/* user image */}
      <div className="w-20 md:w-16">
        <Image
          className="object-cover size-12 mb-2 rounded-full shadow"
          src={review?.user_image}
          priority
          width={500}
          height={500}
          alt="Person"
        />
      </div>
      {/* user name, review */}
      <div className="w-full">
        <h5 className="text-md font-bold">{review?.user_name}</h5>
        <p className="text-xs">{review?.comment}</p>
      </div>
      <hr />
    </div>
  );
};

export default ReviewCard;

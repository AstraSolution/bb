import Image from "next/image";
import Link from "next/link";

const AllWriterCard = ({ item }) => {
  return (
    <div>
      <Link href={`/writers/${item?._id}`}>
        <div className="flex items-center border-4 border-teal-200 py-1 px-2 mx-auto shadow-xl rounded-full hover:bg-teal-200 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="w-1/3">
            <Image 
              src={item?.profile}
              width={100}
              height={100}
              priority
              className="size-16 object-cover rounded-full"
              alt="writer profile"
            />
          </div>
          <div className="w-2/3 text-teal-800 space-y-1">
            <h2 className="text-xl font-bold truncate">{item?.writer_name}</h2>
            <h2 className="text-xs">4.5k Followers</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AllWriterCard;

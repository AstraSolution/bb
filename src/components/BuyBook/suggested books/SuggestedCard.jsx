import Image from "next/image";
import Link from "next/link";

const CardBgColors = ["#EB5757", "#A4E0EB", "#EDB9D6", "#FDCA95", "#CBB5E2"];

const SuggestedCard = ({ cardInfo, index }) => {
  const colorIndex = index % CardBgColors.length;

  return (
    <div className="pb-16">
      <div
        style={{ backgroundColor: CardBgColors[colorIndex] }}
        className="relative flex flex-col md:flex-row justify-center p-5 rounded-lg w-full mb-8 md:mb-24"
      >
        {/* Book Image */}
        <div className="flex-shrink-0 w-44 hidden lg:flex">
          <Image
            src={cardInfo?.cover_image}
            priority
            width={1000}
            height={1500}
            alt="author"
            className="absolute top-5 ring-0 w-48 border-none rounded-md shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Book Information */}
        <div className="px-4 md:px-10 text-white">
          {/* Book title */}
          <div title={cardInfo?.title} className="font-semibold text-lg cursor-pointer">
            {cardInfo?.title.length < 27
              ? cardInfo?.title
              : `${cardInfo?.title.slice(0, 27)}..`}
          </div>
          {/* Author Name */}
          <div className="book-author text-sm">by {cardInfo?.writer}</div>
          {/* Rating and Vote */}
          <div className="flex items-center mt-1">
            {/* Rating */}
            <div className="flex items-center text-white text-xl mr-2">
              <span className="mr-1">&#9733;</span>
              <span className="mr-1">&#9733;</span>
              <span className="mr-1">&#9733;</span>
              <span className="mr-1">&#9733;</span>
              <span className="mr-1">&#9733;</span>
            </div>
            {/* Vote */}
            <span className="text-sm">1,987 voters</span>
          </div>
          {/* Book Description */}
          <div className="book-sum mt-5 text-sm overflow-hidden line-clamp-3">
            {cardInfo?.description}
          </div>
          {/* User action */}
          <Link href={`/buyBooks/${cardInfo?._id}`}>
            <div
              style={{ color: CardBgColors[colorIndex] }} // Use background color from array
              className="mt-6 text-center cursor-pointer bg-white font-semibold p-2 text-sm w-40 rounded-full "
            >
              See The Book
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCard;

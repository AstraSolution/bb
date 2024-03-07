import Image from "next/image";

const RelatedCard = ({ cardInfo }) => {
    return (
        <div>
            <div
                style={{ backgroundColor: `${cardInfo.color}` }}
                className="relative flex justify-center p-5 rounded-lg w-full mb-24"
            >
                {/* Book Image */}
                <div className="flex-shrink-0 w-44">
                    <Image 
                        src={cardInfo?.img}
                        priority
                        width={1000}
                        height={1500}
                        alt="author"
                        className="absolute top-5 ring-0 w-48 border-none rounded-md shadow-xl transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Book Information */}
                <div className="px-10 text-white">
                    {/* Book title */}
                    <div className="font-semibold text-lg">{cardInfo.title}</div>
                    {/* Auther Name */}
                    <div className="book-author text-sm">
                        by {cardInfo.auther}
                    </div>
                    {/* Reating and Vote */}
                    <div className="flex items-center mt-1">
                        {/* Reating */}
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
                        {cardInfo.details}
                    </div>
                    {/* User action */}
                    <div
                        style={{ color: `${cardInfo.color}` }}
                        className="mt-6 text-center cursor-pointer bg-white  font-semibold p-2 text-sm w-40 rounded-full "
                    >
                        See The Book
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedCard;
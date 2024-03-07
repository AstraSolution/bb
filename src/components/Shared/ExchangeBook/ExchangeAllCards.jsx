"use client"

import "../Card.css";
import Link from "next/link";
import { FaCartPlus, FaExchangeAlt } from "react-icons/fa";

const ExchangeAllCards = ({ item }) => {

    return (
        <div className="l-container md:p-1 ">
            <div className="b-game-card ">
                <div
                    className="b-game-card__cover book-cover-effect"
                    style={{ backgroundImage: `url(${item?.cover_image})` }}
                >
                    <div className="grid grid-cols-1 items-end justify-end gap-2 card__action">
                        <Link href={`/exchangeAllBooks/${item?._id}`} className=" text-white text-center text-xl border border-gray-600 border-opacity-30 backdrop-blur-md p-3 bg-black/30 rounded-full">
                            <FaExchangeAlt />
                        </Link>

                        <button className=" text-white text-center text-xl border border-gray-600 border-opacity-30 backdrop-blur-md p-3 bg-black/30 rounded-full">
                            <FaCartPlus />
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-1">
                <div className="space-y-1 mt-2.5 pb-1">
                    <h2 className="text-lg font-bold text-[#016961] line-clamp-1">
                        {item?.title}
                    </h2>
                    <p className="text-[13px] text-[#626980] italic line-clamp-1"> <span>-</span> {item?.writer}</p>
                </div>

                <hr className="hr-card" />
                <div className="mt-2.5">
                    <p className="text-sm text-[#62807b] line-clamp-3"> {item?.description}</p>
                </div>

            </div>
        </div>
    );
};

export default ExchangeAllCards;
import Image from 'next/image';

const Card = ({ source, title, author, rating, price }) => {
    return (
        <div className="flex flex-col border-x-[1px] border-gray-200">
            <Image  src={source} alt="card" priority width={500} height={500} style={{
                width: 'auto',
                height: '400px',
            }} className='rounded-2xl p-3' />
            <div className="flex flex-col pl-2">
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="rating rating-sm my-3">
                    <input className="mask mask-star-2 bg-orange-400" readOnly />
                    <input className="mask mask-star-2 bg-orange-400" readOnly />
                    <input className="mask mask-star-2 bg-orange-400" readOnly />
                    <input className="mask mask-star-2 bg-orange-400" readOnly />
                    <input className="mask mask-star-2 bg-orange-400" readOnly checked />
                    <p className='pl-3'>{rating}</p>
                </div>
                <p className='text-gray-500'>{author}</p>
                <p className='text-lg font-semibold text-[#f65d4e] mt-3'>${price}</p>
            </div>
        </div>
    );
};

export default Card;
import { Link } from "react-router-dom";

import { Rating } from "../../components";

import star1 from '../../assets/img/star-1.svg'
import { object } from "prop-types";

export default function ContentListCard({ book }) {
    return (
        <div className='flex mb-8'>
            <Link>
                <div className='w-[6.5625rem] h-[10.0625rem] sm:w-[9.375rem] sm:h-[14.375rem]'>
                    <img src={book.cover} alt={`${book.title} cover`} className="w-full h-full" />
                </div>
            </Link>
            <div className="ml-8">
                <Link>
                    <h2 className="mb-2">{book.title}</h2>
                </Link>
                <div className="mb-2">{book.author?.name}</div>
                <div className='flex mb-8'>
                    <span className="hidden sm:flex">
                        <Rating rating={book.avg_rating} addRatingClassName='w-[37px]' />
                    </span>
                    <span className="flex sm:hidden">
                        <img src={star1} alt="Full star" />
                    </span>
                </div>
                <div className="mb-[0.625rem]">{book.short_description}</div>
                <div className="mb-4 text-gray-dark">{book.published_at}</div>
                <hr className="border-gray-line" />
            </div>
        </div>
    )
}

ContentListCard.propTypes = {
    book: object,
}
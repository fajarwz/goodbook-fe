import { Link } from "react-router-dom";

import { Rating } from "../../components";

import star1 from '../../assets/img/star-1.svg'
import { object } from "prop-types";
import { Cover } from "../../components/Image";

export default function ContentListCard({ book }) {
    return (
        <div className='flex mb-8'>
            <Link to={`/browse/${book.slug}`}>
                <Cover book={book.title} cover={book.cover} />
            </Link>
            <div className="ml-8">
                <Link to={`/browse/${book.slug}`}>
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
import { Link } from "react-router-dom";

import { Rating } from "../../../components";

import { func, object } from "prop-types";
import { Cover } from "../../../components/Image";

export default function ContentListCard({ review, handleClickEdit, handleClickDelete }) {
    return (
        <>
            <div className='flex mb-8'>
                <Link to={`/browse/${review.book.slug}`}>
                    <Cover book={review.book.title} cover={review.book.cover} />
                </Link>
                <div className="ml-8 w-full">
                    <Link to={`/browse/${review.book.slug}`}>
                        <h2 className="mb-2 break-all sm:break-normal">{review.book.title}</h2>
                    </Link>
                    <div className="mb-2">{review.book.author.name}</div>
                    <div className="text-gray-default mb-8">{`Avg. Rating ${review.book.avg_rating}`}</div>
                    <div className={`mb-2 ${!review.review ? 'italic text-gray-default' : ''}`}>{review.review ?? 'No review given.'}</div>
                    <div className="flex mb-2">
                        <Rating rating={review.rating} ratingLabel='' />
                    </div>
                    <div className="mb-5 text-gray-dark text-sm">{`Updated ${review.updated_at}`}</div>
                    <div className="flex gap-2 mb-4 text-sm">
                        <button onClick={(e) => { e.stopPropagation(); handleClickEdit({ id: review.id, review: review.review }) }} className="text-sm hover:text-orange-default">Edit</button>
                        <button onClick={(e) => { e.stopPropagation(); handleClickDelete({ id: review.id, name: review.book.title }) }} className="text-sm hover:text-orange-default">Delete</button>
                    </div>
                    <hr className="border-gray-line w-full" />
                </div>
            </div>
        </>
    )
}

ContentListCard.propTypes = {
    review: object,
    handleClickEdit: func,
    handleClickDelete: func,
}
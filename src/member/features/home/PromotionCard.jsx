import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import star1 from '../../assets/img/star-1.svg'
import Rating from '../../components/Rating';
import { Cover } from '../../components/Image';

export default function PromotionCard({ book }) {
    return (
        <div className='flex'>
            <Link to={`/browse/${book.slug}`}>
                <Cover book={book.title} cover={book.cover} />
            </Link>
            <div className="ml-8">
                <Link to={`/browse/${book.slug}`}>
                    <h2 className="mb-2">{book.title}</h2>
                </Link>
                <p className="mb-2">{book.author.name}</p>
                <div className='flex'>
                    <span className="hidden sm:flex">
                        <Rating rating={book.avg_rating} addRatingClassName='w-[37px]' />
                    </span>
                    <span className="flex sm:hidden">
                        <img src={star1} alt="Full star" />
                    </span>
                </div>
            </div>
        </div>
    )
}

PromotionCard.propTypes = {
    book: PropTypes.object,
}
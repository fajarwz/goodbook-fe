import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import star1 from '../../assets/img/star-1.svg'
import Rating from '../../components/Rating';

export default function Card({ book }) {
    return (
        <div className='flex'>
            <Link>
                <div className='w-[6.5625rem] h-[10.0625rem] sm:w-[9.375rem] sm:h-[14.375rem]'>
                    <img src={book.cover} alt={`${book.title} cover`} className="w-full h-full" />
                </div>
            </Link>
            <div className="ml-8">
                <Link>
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

Card.propTypes = {
    book: PropTypes.object,
}
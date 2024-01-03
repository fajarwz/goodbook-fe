import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import star0 from '../../assets/img/star-0.svg'
import star14 from '../../assets/img/star-14.svg'
import star12 from '../../assets/img/star-12.svg'
import star34 from '../../assets/img/star-34.svg'
import star1 from '../../assets/img/star-1.svg'
import starNotSet from '../../assets/img/star-not-set.svg'

export default function Card({ book }) {
    const getStar = (rating) => {
        let stars = []

        if (rating === 0) return stars.push(<img src={starNotSet} alt="not-set star icon" />)

        const headRating = Math.floor(rating)
        stars = [...Array(headRating)].map(() => <img src={star1} alt="1 star icon" key={Math.random() * 100} />)

        const tailRating = (rating * 100) - headRating * 100
        const randomKey = Math.random() * 100
        if (tailRating >= 75) stars.push(<img src={star34} alt="3/4 star icon" key={randomKey} />)
        else if (tailRating >= 50) stars.push(<img src={star12} alt="1/2 star icon" key={randomKey} />)
        else if (tailRating >= 25) stars.push(<img src={star14} alt="1/4 star icon" key={randomKey} />)
        else if (tailRating > 0) stars.push(<img src={star0} alt="0 star icon" key={randomKey} />)

        const missingRating = 5 - Math.ceil(rating)

        stars.push(...[...Array(missingRating)].map(() => <img src={star0} alt="0 star icon" key={Math.random() * 100} />))

        return stars
    }

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
                    <span className="mr-2">{book.avg_rating}</span>
                    <span className="hidden sm:flex">
                        {getStar(book.avg_rating)}
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
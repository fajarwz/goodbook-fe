import { number, oneOfType, string } from 'prop-types';

import star0 from '../assets/img/star-0.svg'
import star14 from '../assets/img/star-14.svg'
import star12 from '../assets/img/star-12.svg'
import star34 from '../assets/img/star-34.svg'
import star1 from '../assets/img/star-1.svg'
import starNotSet from '../assets/img/star-not-set.svg'

export default function Rating({ rating = 0, addRatingClassName }) {
    const getStar = (rating) => {
        let stars = []

        if (rating === 0) {
            return [...Array(5)].map(() => <img src={starNotSet} alt="not-set star icon" key={Math.random() * 100} />)
        }

        const headRating = Math.floor(rating)
        stars = [...Array(headRating)].map(() => <img src={star1} alt="full star icon" key={Math.random() * 100} />)

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
        <>
            <span className={`inline-block ${addRatingClassName}`}>{rating}</span>
            <div className="flex gap-0.5">
                {getStar(rating)}
            </div>
        </>
    )
}

Rating.propTypes = {
    rating: oneOfType([
        number,
        string,
    ]).isRequired,
    addRatingClassName: string,
}
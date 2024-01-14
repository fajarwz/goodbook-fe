import star1 from '../../../assets/img/star-1.svg'
import starNotSet from '../../../assets/img/star-not-set.svg'
import { PrimaryLink } from '../../../components/Button'
import { ErrorBlock, LoadingIndicator, SuccessBlock } from '../../../../common/components'
import { isAuth } from '../../../utils/token'
import { useBookBySlug } from '../../../hooks/useBook'
import { useParams } from 'react-router-dom'
import { useBookReviewsCheck } from '../../../hooks/useBookReview'
import { array, func } from 'prop-types'

export default function ContentDetailReviewsAuth({ setStarChoosen, starFill, setStarFill }) {
    const { data: dataBook } = useBookBySlug(useParams().slug)
    const bookId = dataBook.id
    const {
        data: dataReviewsCheck,
        isLoading: isLoadingReviewsCheck,
        isError: isErrorReviewsCheck,
        error: errorReviewsCheck
    } = useBookReviewsCheck(bookId)

    const handleMouseHoverStar = (index) => {
        setStarFill((prevStates) => prevStates.map((fill, i) => i <= index ? true : fill));
    };

    const handleMouseLeaveStar = (index) => {
        setStarFill((prevStates) =>
            prevStates.map((fill, i) => i <= index ? false : fill));
    };

    const handleStarClicked = (index) => {
        setStarChoosen(index)
    };

    const generateStar = () => {
        return [...Array(5)].map((_, index) => (
            <img
                key={index}
                src={starFill[index] ? star1 : starNotSet}
                alt={`star-${index + 1}`}
                onMouseEnter={() => handleMouseHoverStar(index)}
                onMouseLeave={() => handleMouseLeaveStar(index)}
                onClick={() => handleStarClicked(index)}
                className='w-[1.625rem] h-[1.625rem]'
            />
        ))
    }

    let content = <></>
    if (isLoadingReviewsCheck) {
        content = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isErrorReviewsCheck) {
        content = <ErrorBlock title={errorReviewsCheck.message} />
    }

    if (dataReviewsCheck?.is_reviewed_by_user) {
        content = <SuccessBlock title='You have reviewed this book.' />
    }
    else {
        let cta = <>
            <div className='mb-4'>Sign in to give review</div>
            <PrimaryLink to='/sign-in' addClassName='w-28'>Sign In</PrimaryLink>
        </>

        if (isAuth()) {
            cta = (
                <div className='flex gap-0.5'>
                    {generateStar()}
                </div>
            )
        }

        content = (
            <section className="mb-10 bg-white p-8 flex flex-col items-center justify-center rounded-xl">
                <h3 className="mb-4">What do you think?</h3>
                {cta}
            </section>
        )
    }

    return content
}

ContentDetailReviewsAuth.propTypes = {
    setStarChoosen: func, 
    starFill: array, 
    setStarFill: func,
}
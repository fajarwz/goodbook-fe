import star1 from '../../../assets/img/star-1.svg'
import starNotSet from '../../../assets/img/star-not-set.svg'
import { useContext, useState } from "react"
import Modal from '../../../components/Modal'
import { Rating } from '../../../components'
import { PrimaryButton, PrimaryLink, SecondaryButton } from '../../../components/Button'
import { BookReviewsContext } from '../../../hooks/context/browse/browse-detail'
import { ErrorBlock, LoadingIndicator, SuccessBlock } from '../../../../common/components'
import { isAuth } from '../../../utils/token'

export default function ContentDetailReviewsAuth() {
    const [starFill, setStarFill] = useState(Array(5).fill(false))
    const { 
        dataReviewsCheck,
        isLoadingReviewsCheck,
        isErrorReviewsCheck,
        errorReviewsCheck,
        starChoosen, 
        setStarChoosen, 
        handleSubmitReview, 
        isPending, 
        isError, 
        error,
    } = useContext(BookReviewsContext)

    const handleMouseHoverStar = (index) => {
        setStarFill((prevStates) => prevStates.map((fill, i) => i <= index ? true : fill));
    };

    const handleMouseLeaveStar = (index) => {
        setStarFill((prevStates) => prevStates.map((fill, i) => i === index && i > starChoosen ? false : fill));
    };

    const handleStarClicked = (index) => {
        setStarChoosen(index);
    };

    const handleCancelReview = () => {
        setStarChoosen(-1);
    };

    let notif = <></>
    if (isError) {
        if (error instanceof Error) {
            notif = <div className='w-full'>
                <ErrorBlock title={error.message} message='' />
            </div>
        }
        else {
            notif = <div className='w-full'>
                <ErrorBlock title='' message={
                    <ul className='mb-0'>
                        {Object.entries(error).map(([key, message]) => (
                            <li className='list-disc' key={key}>{message}</li>
                        ))}
                    </ul>
                } />
            </div>
        }
    }

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
                {notif}
                {cta}
                {starChoosen >= 0 && <Modal onClose={handleCancelReview}>
                    <h3 className="mb-4">What do you think?</h3>
                    <form onSubmit={handleSubmitReview} className='w-full'>
                        <div className='mb-8'>
                            <div className='flex items-center justify-center gap-0.5'>
                                <Rating rating={starChoosen + 1} ratingLabel='' addStarClassName='w-[1.625rem] h-[1.625rem]' addClassName='mb-4' />
                                <input type='hidden' name='rating' value={starChoosen + 1} />
                            </div>
                            <textarea name='review' rows={3} className='w-full border rounded-md border-gray-default p-3 bg-transparent'></textarea>
                        </div>
                        <div className='text-center flex flex-col md:flex-row justify-center'>
                            <PrimaryButton type='submit' addClassName={`px-7 md:mr-2 mb-2 md:mb-0 ${isPending ? 'disabled': ''}`}>{isPending ? 'Submitting...' : 'Submit Review'}</PrimaryButton>
                            <SecondaryButton type='button' addClassName='w-full md:w-28' onClick={handleCancelReview}>Cancel</SecondaryButton>
                        </div>
                    </form>
                </Modal>}
            </section>
        )
    }

    return content
}

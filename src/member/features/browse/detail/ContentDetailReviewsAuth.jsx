import star1 from '../../../assets/img/star-1.svg'
import starNotSet from '../../../assets/img/star-not-set.svg'
import { useContext, useState } from "react"
import Modal from '../../../components/Modal'
import { Rating } from '../../../components'
import { PrimaryButton, SecondaryButton } from '../../../components/Button'
import { BookReviewsContext } from '../../../hooks/context/browse/browse-detail'
import { ErrorBlock } from '../../../../common/components'

export default function ContentDetailReviewsAuth() {
    const [starFill, setStarFill] = useState(Array(5).fill(false))
    const { 
        starChoosen, 
        setStarChoosen, 
        handleSubmitReview, 
        isPending, 
        isError, 
        error 
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

    let errorNotif = <></>
    if (isError) {
        if (error instanceof Error) {
            errorNotif = <ErrorBlock title={error.message} message='' />
        }
        else {
            errorNotif = <ErrorBlock title='' message={
                <ul className='mb-0'>
                    {Object.entries(error).map(([key, message]) => (
                        <li className='list-disc' key={key}>{message}</li>
                    ))}
                </ul>
            } />
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
    // if (isReviewed) {
    //     content = <SuccessBlock title='You already reviewed this book.' />
    // }
    // else {
        content = (
            <section className="mb-10 bg-white p-8 flex flex-col items-center justify-center rounded-xl">
                <h3 className="mb-4">What do you think?</h3>
                {errorNotif}
                <div className='flex gap-0.5'>
                    {generateStar()}
                </div>
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
    // }

    // return (isReviewed && content)
    return content
}

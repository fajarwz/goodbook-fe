import star1 from '../../../assets/img/star-1.svg'
import starNotSet from '../../../assets/img/star-not-set.svg'
import { useState } from "react"
import Modal from '../../../components/Modal'
import { Rating } from '../../../components'
import { PrimaryButton, SecondaryButton } from '../../../components/Button'

export default function ContentDetailReviewsAuth() {
    const [starFill, setStarFill] = useState(Array(5).fill(false))
    const [starChoosen, setStarChoosen] = useState(-1)
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    const handleSubmitReview = () => {
        setIsSubmitting(true)



        setIsSubmitting(false)
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

    return (
        <section className="mb-10 bg-white p-8 flex flex-col items-center justify-center rounded-xl">
            <h3 className="mb-4">What do you think?</h3>
            <div className='flex gap-0.5'>
                {generateStar()}
            </div>
            {starChoosen >= 0 && <Modal onClose={handleCancelReview}>
                <h3 className="mb-4">What do you think?</h3>
                <form onSubmit={handleSubmitReview} className='w-full'>
                    <div className='mb-8'>
                        <div className='flex items-center justify-center gap-0.5'>
                            <Rating rating={starChoosen + 1} ratingLabel='' addStarClassName='w-[1.625rem] h-[1.625rem]' addClassName='mb-4' />
                        </div>
                        <textarea name='review' rows={3} className='w-full border rounded-md border-gray-default p-3 bg-transparent'></textarea>
                    </div>
                    <div className='text-center'>
                        <PrimaryButton type='submit' addClassName='px-7 mr-2'>{isSubmitting ? 'Submitting...' : 'Submit Review'}</PrimaryButton>
                        <SecondaryButton type='button' onClick={handleCancelReview}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>}
        </section>
    )
}

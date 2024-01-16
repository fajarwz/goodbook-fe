import { useEffect, useState } from "react"

import star1 from '../../../assets/img/star-1.svg'
import starNotSet from '../../../assets/img/star-not-set.svg'
import { useUpdateMyReview } from "../../../hooks/useMy"
import { ErrorBlock } from "../../../../common/components"
import { PrimaryButton, SecondaryButton } from "../../../components/Button"
import { bool, func, object } from "prop-types"
import { Modal } from "../../../components"

export default function ContentModaledit({ isEditing, reviewForm, handleCloseEditModal }) {
    const handleCancelEdit = () => {
        resetStarChoosen()
        handleCloseEditModal()
        resetStarFill()
    }

    const [starFill, setStarFill] = useState(Array(5).fill(false))

    const resetStarFill = () => setStarFill(Array(5).fill(false))

    const handleMouseHoverStar = (index) => {
        setStarFill((prevStates) => prevStates.map((fill, i) => i <= index ? true : fill));
    };

    const handleMouseLeaveStar = (index) => {
        setStarFill((prevStates) => prevStates.map((fill, i) => i <= index && i > starChoosen ? false : fill));
    };

    const [starChoosen, setStarChoosen] = useState(-1)

    const resetStarChoosen = () => {
        setStarChoosen(-1);
    };

    const handleStarClicked = (index) => {
        setStarChoosen(index);
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

    const handleSubmitReview = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        let data = Object.fromEntries(formData);
        data.rating = starChoosen + 1
        const { id } = reviewForm

        mutate({ id, formData: data })
    }

    const {
        mutate,
        isPending,
        isError,
        error,
        isSuccess
    } = useUpdateMyReview()
    
    const [errorNotif, setErrorNotif] = useState()
    useEffect(() => {
        if (isSuccess) {
            handleCloseEditModal()
            resetStarChoosen()
    
            resetStarFill()
        }
        if (isError) {
            if (error instanceof Error) {
                setErrorNotif({
                    title: error.message,
                    message: '',
                })
            }
            else {
                setErrorNotif({
                    title: '',
                    message: error,
                })
            }
        }
    }, [isError, error, isSuccess, handleCloseEditModal])

    return <Modal isOpen={isEditing}>
        <h3 className="mb-4">What do you think?</h3>
        <form onSubmit={handleSubmitReview} className='w-full'>
            <div className='mb-8'>
                {errorNotif && <ErrorBlock title={errorNotif.title} message={errorNotif.message} />}
                <div className='flex items-center justify-center gap-0.5 mb-4'>
                    {generateStar()}
                </div>
                <textarea name='review' rows={3} defaultValue={reviewForm.review} className='w-full border rounded-md border-gray-default p-3 bg-transparent'></textarea>
            </div>
            <div className='text-center flex flex-col md:flex-row justify-center'>
                <PrimaryButton type='submit' addClassName={`px-7 md:mr-2 mb-2 md:mb-0 ${isPending ? 'disabled' : ''}`}>{isPending ? 'Submitting...' : 'Submit Review'}</PrimaryButton>
                <SecondaryButton type='button' addClassName='w-full md:w-28' onClick={handleCancelEdit}>Cancel</SecondaryButton>
            </div>
        </form>
    </Modal>
}

ContentModaledit.propTypes = {
    isEditing: bool, 
    reviewForm: object, 
    handleCloseEditModal: func,
}
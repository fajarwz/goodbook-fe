import { Modal, Rating } from '../../../components'
import { PrimaryButton, SecondaryButton } from '../../../components/Button'
import { ErrorBlock } from '../../../../common/components'
import { useBookBySlug } from '../../../hooks/useBook'
import { useParams } from 'react-router-dom'
import { useSubmitReview } from '../../../hooks/useReview'
import { func, number } from 'prop-types'
import { useEffect, useState } from 'react'

export default function ContentDetailReviewsForm({ setStarFill, starChoosen, setStarChoosen }) {
    const { data: dataBook } = useBookBySlug(useParams().slug)
    const bookId = dataBook.id

    const emptyStarFill = Array(5).fill(false)

    const handleCloseReview = () => {
        setStarChoosen(-1);
    };

    const handleCancelReview = () => {
        handleCloseReview()
        setStarFill(emptyStarFill)
    };

    const handleSubmitReview = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        let data = Object.fromEntries(formData);
        data.book_id = bookId

        mutate({ formData: data })
    }

    const {
        mutate,
        isPending,
        isError,
        error,
        isSuccess
    } = useSubmitReview(bookId)

    const [errorNotif, setErrorNotif] = useState()
    useEffect(() => {
        if (isSuccess) {
            handleCloseReview()
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
    }, [isError, error, isSuccess, handleCloseReview])

    return (
        <>
            {errorNotif && <ErrorBlock title={errorNotif.title} message={errorNotif.message} />}
            <Modal isOpen={starChoosen > -1} >
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
                        <PrimaryButton type='submit' addClassName={`px-7 md:mr-2 mb-2 md:mb-0 ${isPending ? 'disabled' : ''}`}>
                            {isPending ? 'Submitting...' : 'Submit Review'}
                        </PrimaryButton>
                        <SecondaryButton type='button' addClassName='w-full md:w-28' onClick={handleCancelReview}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </>
    )
}

ContentDetailReviewsForm.propTypes = {
    setStarChoosen: func, 
    starChoosen: number,
    setStarFill: func,
}
import { Footer, Modal, Navbar } from '../../components'

import star1 from '../../assets/img/star-1.svg'
import starNotSet from '../../assets/img/star-not-set.svg'

import config from '../../utils/config'
import { useTitle } from '../../../common/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { deleteMyReview, fetchMyBooks, updateMyReview } from '../../api/my'
import { useSearchParams } from 'react-router-dom'
import { BooksContext } from '../../hooks/context/my/books'
import { Content, Header } from '../../features/my/books'
import queryClient from '../../../common/utils/queryClient'
import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { ErrorBlock } from '../../../common/components'
import toast, { Toaster } from 'react-hot-toast'

export default function MyBooks() {
    useTitle('My Books | ' + config.app.name)

    const toastOptions = { duration: 5000 }

    // ========
    // FETCHING
    // ========

    const [initialPage, setInitialPage] = useState(0);
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams()

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const radioButtonsRefs = useRef([]);
    useEffect(() => {
        if (searchParams.get('reset_filter')) {
            setStartDate()
            setEndDate()

            radioButtonsRefs.current.forEach((radioButton) => {
                if (radioButton) {
                    radioButton.checked = false;
                }
            });
            // any rating checked by default
            if (radioButtonsRefs.current[0]) {
                radioButtonsRefs.current[0].checked = true;
            }

            setSearchParams(new URLSearchParams({}), { replace: true });
        }
    }, [searchParams, setSearchParams])

    const now = new Date()
    const monthYear = new Date(now.getFullYear(), now.getMonth())
    const monthYearPast = new Date(1970, 0)
    const dateConfig = { month: 'long', year: 'numeric' }
    const fromDefault = monthYearPast.toLocaleString('en-US', dateConfig)
    const untilDefault = monthYear.toLocaleString('en-US', dateConfig)

    const search = searchParams.get('search') ?? ''
    const updatedFrom = searchParams.get('updated_form') ?? fromDefault
    const updatedUntil = searchParams.get('updated_until') ?? untilDefault
    const rating = searchParams.get('rating') ?? 0

    const handlePageClick = ({ selected }) => {
        setInitialPage(selected)
        setPage(selected + 1)
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['my', 'books', { search, page, updatedFrom, updatedUntil, rating }],
        queryFn: ({ signal, queryKey }) => fetchMyBooks({ signal, ...queryKey[2] }),
        onSuccess: window.scrollTo(0, 0),
    })

    const isSearching = () => {
        setInitialPage(0)
        setPage(1)
    }

    const handleFilter = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        setSearchParams(prev => {
            prev.set('updated_form', data.updated_form ? data.updated_form : fromDefault)
            prev.set('updated_until', data.updated_until ? data.updated_until : untilDefault)
            prev.set('rating', data.rating)
            return prev
        }, { replace: true })

        isSearching()
    }

    // ========
    // EDITING
    // ========

    let modalNotif = <></>

    const [isEditing, setIsEditing] = useState(false)
    const [reviewForm, setReviewForm] = useState({ id: null, review: '' })

    const handleClickEdit = (review) => {
        setIsEditing(true)
        setReviewForm(review)
    }

    const handleCancelEdit = () => {
        resetStarChoosen()
        handleCloseModal()
        resetStarFill()
    }

    const handleCloseModal = () => {
        setIsEditing(false)
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

        mutateSubmitReview({ id, formData: data })
    }

    const {
        mutate: mutateSubmitReview,
        isPending: isPendingSubmitReview,
        isError: isErrorSubmitReview,
        error: errorSubmitReview,
    } = useMutation({
        mutationFn: updateMyReview,
        onSuccess: () => {
            // close submit review modal
            resetStarChoosen()
            handleCloseModal()
            resetStarFill()

            queryClient.invalidateQueries(['my', 'books', { search, page, updatedFrom, updatedUntil, rating }])
            toast.success('Review updated successfully.', toastOptions);
        },
    })

    let modalContent = <></>
    if (isEditing) {
        if (isErrorSubmitReview) {
            if (errorSubmitReview instanceof Error) {
                modalNotif = <div className='w-full'>
                    <ErrorBlock title={errorSubmitReview.message} message='' />
                </div>
            }
            else {
                modalNotif = <div className='w-full'>
                    <ErrorBlock title='' message={
                        <ul className='mb-0'>
                            {Object.entries(errorSubmitReview).map(([key, message]) => (
                                <li className='list-disc' key={key}>{message}</li>
                            ))}
                        </ul>
                    } />
                </div>
            }
        }

        modalContent = <Modal onClose={handleCancelEdit}>
            <h3 className="mb-4">What do you think?</h3>
            <form onSubmit={handleSubmitReview} className='w-full'>
                <div className='mb-8'>
                    {modalNotif}
                    <div className='flex items-center justify-center gap-0.5 mb-4'>
                        {generateStar()}
                    </div>
                    <textarea name='review' rows={3} defaultValue={reviewForm.review} className='w-full border rounded-md border-gray-default p-3 bg-transparent'></textarea>
                </div>
                <div className='text-center flex flex-col md:flex-row justify-center'>
                    <PrimaryButton type='submit' addClassName={`px-7 md:mr-2 mb-2 md:mb-0 ${isPendingSubmitReview ? 'disabled' : ''}`}>{isPendingSubmitReview ? 'Submitting...' : 'Submit Review'}</PrimaryButton>
                    <SecondaryButton type='button' addClassName='w-full md:w-28' onClick={handleCancelEdit}>Cancel</SecondaryButton>
                </div>
            </form>
        </Modal>
    }

    // ========
    // DELETING
    // ========

    const handleDeleteReview = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        let { id } = Object.fromEntries(formData);

        mutateDeleteReview({ id })
    }

    const {
        mutate: mutateDeleteReview,
        isPending: isPendingDeleteReview,
        isError: isErrorDeleteReview,
        error: errorDeleteReview,
    } = useMutation({
        mutationFn: deleteMyReview,
        onSuccess: () => {
            // close submit review modal
            handleCloseDeleteModal()

            queryClient.invalidateQueries(['my', 'books', { search, page, updatedFrom, updatedUntil, rating }])
            toast.success('Review deleted successfully.', toastOptions);
        },
    })

    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteForm, setDeleteForm] = useState({ id: null })

    const handleClickDelete = (deleteForm) => {
        setIsDeleting(true)
        setDeleteForm(deleteForm)
    }

    const handleCancelDelete = () => {
        handleCloseDeleteModal()
    }

    const handleCloseDeleteModal = () => {
        setIsDeleting(false)
    }

    if (isDeleting) {
        modalNotif = <></>
        if (isErrorDeleteReview) {
            if (errorDeleteReview instanceof Error) {
                modalNotif = <div className='w-full'>
                    <ErrorBlock title={errorDeleteReview.message} message='' />
                </div>
            }
            else {
                modalNotif = <div className='w-full'>
                    <ErrorBlock title='' message={
                        <ul className='mb-0'>
                            {Object.entries(errorDeleteReview).map(([key, message]) => (
                                <li className='list-disc' key={key}>{message}</li>
                            ))}
                        </ul>
                    } />
                </div>
            }
        }

        modalContent = <Modal onClose={handleCancelDelete}>
            <h3 className="mb-4">Are you sure?</h3>
            <form onSubmit={handleDeleteReview} className='w-full'>
                <div className='mb-8'>
                    {modalNotif}
                    <div className='text-center'>You want to delete your &ldquo;{deleteForm.name}&rdquo; review?</div>
                    <input type="hidden" name='id' defaultValue={deleteForm.id} />
                </div>
                <div className='text-center flex flex-col md:flex-row justify-center'>
                    <PrimaryButton type='submit' addClassName={`px-7 md:mr-2 mb-2 md:mb-0 ${isPendingDeleteReview ? 'disabled' : ''}`}>{isPendingDeleteReview ? 'Deleting...' : 'Delete Review'}</PrimaryButton>
                    <SecondaryButton type='button' addClassName='w-full md:w-28' onClick={handleCancelDelete}>Cancel</SecondaryButton>
                </div>
            </form>
        </Modal>
    }

    return (
        <div className='bg-customWhite-warm'>
            <Navbar isSearching={isSearching} />
            <Toaster />
            <Header title='My Books' subtitle='List of all reviews and ratings that I have given' />
            <BooksContext.Provider value={{
                radioButtonsRefs,
                startDate,
                endDate,
                setStartDate,
                setEndDate,
                data,
                isLoading,
                isError,
                error,
                handlePageClick,
                initialPage,
                handleFilter,
                handleClickEdit,
                handleSubmitReview,
                handleClickDelete,
            }} >
                <Content />
            </BooksContext.Provider>
            {modalContent}
            <Footer />
        </div>
    )
}
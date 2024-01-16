import { useState } from "react";
import ContentFilter from "./ContentFilter";
import ContentList from "./ContentList";
import { useSearchParams } from "react-router-dom";
import { useMyBook } from "../../../hooks/useMy";
import ContentModaledit from "./ContentModaledit";
import ContentModaldelete from "./ContentModaldelete";

export default function Content() {
    const [initialPage, setInitialPage] = useState(0);
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams()

    // const [startDate, setStartDate] = useState();
    // const [endDate, setEndDate] = useState();
    

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

    const { data, isLoading, isError, error } = useMyBook({ search, page, updatedFrom, updatedUntil, rating })

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



    const [isEditing, setIsEditing] = useState(false)
    const [reviewForm, setReviewForm] = useState({ id: null, review: '' })
    
    const handleClickEdit = (review) => {
        setIsEditing(true)
        setReviewForm(review)
    }

    const handleCloseEditModal = () => {
        setIsEditing(false)
    }



    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteForm, setDeleteForm] = useState({ id: null })

    const handleClickDelete = (deleteForm) => {
        setIsDeleting(true)
        setDeleteForm(deleteForm)
    }

    const handleCloseDeleteModal = () => {
        setIsDeleting(false)
    }

    return (
        <section className="mb-20">
            <div className="container grid grid-cols-1 md:grid-cols-12">
                <ContentFilter 
                    className='col-span-4 mb-8' 
                    handleFilter={handleFilter}
                />
                <ContentList 
                    className='col-span-8 lg:ml-10' 
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    initialPage={initialPage}
                    handlePageClick={handlePageClick}
                    handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                />
                <ContentModaledit 
                    handleClickEdit={handleClickEdit}
                    isEditing={isEditing}
                    reviewForm={reviewForm}
                    handleCloseEditModal={handleCloseEditModal}
                />
                <ContentModaldelete 
                    handleClickDelete={handleClickDelete}
                    isDeleting={isDeleting}
                    deleteForm={deleteForm}
                    handleCloseDeleteModal={handleCloseDeleteModal}
                />
            </div>
        </section>
    )
}

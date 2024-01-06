import { Footer, Navbar } from '../../components'

import config from '../../utils/config'
import { useTitle } from '../../../common/hooks'
import { Content } from '../../features/browse/detail'
import { useQuery } from '@tanstack/react-query'
import { fetchBookBySlug, fetchReviewsByBookId } from '../../api/books'
import { useParams } from 'react-router-dom'
import { BookContext, BookReviewsContext } from '../../hooks/browse/BrowseDetail'
import { useState } from 'react'

export default function BrowseDetail() {
    const { slug } = useParams()

    const { data: dataBook, isLoading: isLoadingBook, isError: isErrorBook, error: errorBook } = useQuery({
        queryKey: ['books', { slug }],
        queryFn: ({ signal, queryKey }) => fetchBookBySlug({ signal, ...queryKey[1] }),
    })
    
    useTitle(`${dataBook?.title} Book | ${config.app.name}`)
    
    const [reviewsInitialPage, setReviewsInitialPage] = useState(0);
    const [reviewsPage, setReviewsPage] = useState(1);

    const bookId = dataBook?.id

    const { data: dataReviews, isLoading: isLoadingReviews, isError: isErrorReviews, error: errorReviews } = useQuery({
        queryKey: ['book_ratings', { bookId, reviewsPage }],
        queryFn: ({ signal, queryKey }) => fetchReviewsByBookId({ signal, ...queryKey[1] }),
        enabled: !!bookId,
    })

    const handleReviewsPageClick = ({ selected }) => {
        setReviewsInitialPage(selected)
        setReviewsPage(selected + 1)
    }

    return (
        <div className='bg-customWhite-warm'>
            <Navbar />
            <BookContext.Provider value={{
                dataBook, 
                isLoadingBook, 
                isErrorBook,
                errorBook,
            }} >
                <BookReviewsContext.Provider value={{ 
                    dataReviews, 
                    isLoadingReviews, 
                    isErrorReviews, 
                    errorReviews, 
                    handleReviewsPageClick,
                    reviewsInitialPage,
                }} >
                    <Content />
                </BookReviewsContext.Provider>
            </BookContext.Provider>
            <Footer />
        </div>
    )
}
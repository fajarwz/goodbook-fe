import { Footer, Navbar } from '../../components'

import config from '../../utils/config'
import { useTitle } from '../../../common/hooks'
import { Header, Content } from '../../features/browse'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchBooks } from '../../api/books'
import { useSearchParams } from 'react-router-dom'

export default function Browse() {
    useTitle('Browse | ' + config.app.name)

    const [initialPage, setInitialPage] = useState(0);
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams({ search: '' })
    const search = searchParams.get('search')

    const [publishedFrom, setPublishedFrom] = useState('');
    const [publishedUntil, setPublishedUntil] = useState('');
    const [rating, setRating] = useState(0);

    const handlePageClick = ({ selected }) => {
        setInitialPage(selected)
        setPage(selected + 1)
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['books', { search, page, publishedFrom, publishedUntil, rating }],
        queryFn: ({ signal, queryKey }) => fetchBooks({ signal, ...queryKey[1] }),
        onSuccess: window.scrollTo(0, 0),
    })

    const handleFilter = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const now = new Date()
        const monthYear = new Date(now.getFullYear(), now.getMonth())
        const monthYearPast = new Date(1970, 0)

        setPublishedFrom(data.published_from ? data.published_from : monthYearPast.toLocaleString('en-US', { month: 'long', year: 'numeric' }))
        setPublishedUntil(data.published_until ? data.published_until : monthYear.toLocaleString('en-US', { month: 'long', year: 'numeric' }))

        setRating(data.rating);
    }

    return (
        <div className='bg-customWhite-warm'>
            <Navbar />
            <Header title='Discover Great Reads' subtitle='Dive into a sea of great titles' />
            <Content 
                books={data} 
                isLoading={isLoading} 
                isError={isError} 
                error={error} 
                handlePageClick={handlePageClick} 
                initialPage={initialPage} 
                handleFilter={handleFilter}
            />
            <Footer />
        </div>
    )
}
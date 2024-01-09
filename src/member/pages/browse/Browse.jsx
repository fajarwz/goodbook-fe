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

    const now = new Date()
    const monthYear = new Date(now.getFullYear(), now.getMonth())
    const monthYearPast = new Date(1970, 0)
    const dateConfig = { month: 'long', year: 'numeric' }
    const fromDefault = monthYearPast.toLocaleString('en-US', dateConfig)
    const untilDefault = monthYear.toLocaleString('en-US', dateConfig)

    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search') ?? ''
    const publishedFrom = searchParams.get('published_from') ?? fromDefault
    const publishedUntil = searchParams.get('published_until') ?? untilDefault
    const rating = searchParams.get('rating') ?? 0

    console.log(search)
    console.log(publishedFrom)
    console.log(publishedUntil)
    console.log(rating)

    const handlePageClick = ({ selected }) => {
        setInitialPage(selected)
        setPage(selected + 1)
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['books', { search, page, publishedFrom, publishedUntil, rating }],
        queryFn: ({ signal, queryKey }) => fetchBooks({ signal, ...queryKey[1] }),
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
            prev.set('published_from', data.published_from ? data.published_from : fromDefault)
            prev.set('published_until', data.published_until ? data.published_until : untilDefault)
            prev.set('rating', data.rating)
            return prev
        }, { replace: true })

        isSearching()
    }

    return (
        <div className='bg-customWhite-warm'>
            <Navbar isSearching={isSearching} />
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
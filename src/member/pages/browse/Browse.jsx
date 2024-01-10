import { Footer, Navbar } from '../../components'

import config from '../../utils/config'
import { useTitle } from '../../../common/hooks'
import { Header, Content } from '../../features/browse'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { fetchBooks } from '../../api/books'
import { useSearchParams } from 'react-router-dom'
import { BooksContext } from '../../hooks/context/browse/browse'

export default function Browse() {
    useTitle('Browse | ' + config.app.name)
    console.log('here')

    const [initialPage, setInitialPage] = useState(0);
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams()

    const searchRef = useRef()
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const radioButtonsRefs = useRef([]);
    useEffect(() => {
        if (searchParams.get('reset_filter')) {
            searchRef.current.value = ''

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
    const publishedFrom = searchParams.get('published_from') ?? fromDefault
    const publishedUntil = searchParams.get('published_until') ?? untilDefault
    const rating = searchParams.get('rating') ?? 0

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
            <Navbar isSearching={isSearching} searchRef={searchRef} />
            <Header title='Discover Great Reads' subtitle='Dive into a sea of great titles' />
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
            }} >
                <Content />
            </BooksContext.Provider>
            <Footer />
        </div>
    )
}
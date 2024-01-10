import { Footer, Navbar } from '../../components'

import config from '../../utils/config'
import { useTitle } from '../../../common/hooks'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { fetchMyBooks } from '../../api/my'
import { useSearchParams } from 'react-router-dom'
import { BooksContext } from '../../hooks/context/my/books'
import { Content, Header } from '../../features/my/books'

export default function MyBooks() {
    useTitle('My Books | ' + config.app.name)

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

    return (
        <div className='bg-customWhite-warm'>
            <Navbar isSearching={isSearching} />
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
            }} >
                <Content />
            </BooksContext.Provider>
            <Footer />
        </div>
    )
}
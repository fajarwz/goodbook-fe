import { Footer, Navbar } from '../components'

import config from '../utils/config'
import { useTitle } from '../../common/hooks'
import { Header, Content } from '../features/browse'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchBooks } from '../api/books'

export default function Browse() {
    useTitle('Browse | ' + config.app.name)

    const [initialPage, setInitialPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    // const handleSearch = (event) => {
    //     event.preventDefault();

    //     const formData = new FormData(event.target);
    //     const data = Object.fromEntries(formData);
    //     setSearch(data.search)
    // }

    const handlePageClick = ({ selected }) => {
        setInitialPage(selected)
        setPage(selected + 1)
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['books', { search }, { page }],
        queryFn: ({ signal, queryKey }) => fetchBooks({ signal, ...queryKey[1], ...queryKey[2] }),
        onSuccess: window.scrollTo(0, 0),
    })

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
            />
            <Footer />
        </div>
    )
}
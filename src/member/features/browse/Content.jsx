import { useEffect, useState } from "react";
import ContentFilter from "./ContentFilter";
import ContentList from "./ContentList";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../api/books";

export default function Content() {
    const [initialPage, setInitialPage] = useState(0);
    const [page, setPage] = useState(1);

    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.has('search')) {
            setInitialPage(0)
            setPage(1)
        }
    }, [searchParams])

    const search = searchParams.get('search') ?? ''
    const publishedFrom = searchParams.get('published_from')
    const publishedUntil = searchParams.get('published_until')
    const rating = searchParams.get('rating')

    const handlePageClick = ({ selected }) => {
        setInitialPage(selected)
        setPage(selected + 1)
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['books', { search, page, publishedFrom, publishedUntil, rating }],
        queryFn: ({ signal, queryKey }) => fetchBooks({ signal, ...queryKey[1] }),
        onSuccess: window.scrollTo(0, 0),
    })

    return (
        <section className="mb-20">
            <div className="container grid grid-cols-1 md:grid-cols-12">
                <ContentFilter className='col-span-4 mb-8' />
                <ContentList 
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    initialPage={initialPage}
                    handlePageClick={handlePageClick}
                    className='col-span-8 lg:ml-10' 
                />
            </div>
        </section>
    )
}

import { array, bool, func, number, object } from "prop-types";
import ContentFilter from "./ContentFilter";
import ContentList from "./ContentList";

export default function Content({ books, isLoading, isError, error, handlePageClick, initialPage }) {
    return (
        <section className="mb-20">
            <div className="container grid grid-cols-1 md:grid-cols-12">
                <ContentFilter className='col-span-4' />
                <ContentList 
                    className='col-span-8 ml-10' 
                    books={books} 
                    isLoading={isLoading} 
                    isError={isError} 
                    error={error} 
                    handlePageClick={handlePageClick} 
                    initialPage={initialPage} 
                />
            </div>
        </section>
    )
}

Content.propTypes = {
    books: array,
    isLoading: bool,
    isError: bool,
    error: object,
    initialPage: number.isRequired,
    handlePageClick: func.isRequired,
    pageCount: number,
}
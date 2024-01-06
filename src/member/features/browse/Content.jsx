import { bool, func, number, object } from "prop-types";
import ContentFilter from "./ContentFilter";
import ContentList from "./ContentList";

export default function Content({ books, isLoading, isError, error, handlePageClick, initialPage, handleFilter }) {
    return (
        <section className="mb-20">
            <div className="container grid grid-cols-1 md:grid-cols-12">
                <ContentFilter handleFilter={handleFilter} className='col-span-4 mb-8' />
                <ContentList
                    className='col-span-8 lg:ml-10'
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
    books: object,
    isLoading: bool,
    isError: bool,
    error: object,
    initialPage: number.isRequired,
    handlePageClick: func.isRequired,
    pageCount: number,
    handleFilter: func,
}
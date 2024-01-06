import { bool, func, number, object } from "prop-types";
import ContentListCard from "./ContentListCard";
import { ErrorBlock, LoadingIndicator } from "../../../common/components";
import ReactPaginate from "react-paginate";

export default function ContentList({ books, isLoading, isError, error, handlePageClick, initialPage, ...attributes }) {
    let content = <div className="text-center">No data found.</div>

    if (isLoading) {
        content = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        content = <ErrorBlock title={error.message} />
    }

    if (books?.data.length > 0) {
        const pageCount = books.meta.last_page ?? 1
        content = 
        <>
            {books.data.map(book => {
                return <ContentListCard key={book.id} book={book} />
            })}
            <ReactPaginate
                initialPage={initialPage}
                activeClassName={'items-center text-orange-default cursor-pointer flex text-sm justify-center'}
                breakClassName={'items-center cursor-pointer flex text-sm justify-center'}
                breakLabel={'...'}
                containerClassName={'items-left flex flex-row justify-center list-none'}
                disabledClassName={'text-gray-default'}
                marginPagesDisplayed={2}
                nextClassName={"items-center text-black-default cursor-pointer flex p-3 text-sm justify-center"}
                nextLabel="next&nbsp;>"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                pageClassName={'items-center text-black-default cursor-pointer flex text-sm justify-center font-bold'}
                pageLinkClassName={'p-3'}
                pageRangeDisplayed={2}
                previousClassName={"items-center text-black-default cursor-pointer flex p-3 text-sm justify-center"}
                previousLabel="<&nbsp;prev"
                renderOnZeroPageCount={null}
            />
        </>
    }

    return (
        <section {...attributes}>
            {content}
        </section>
    )
}

ContentList.propTypes = {
    books: object,
    isLoading: bool,
    isError: bool,
    error: object,
    initialPage: number.isRequired,
    handlePageClick: func.isRequired,
    pageCount: number,
}
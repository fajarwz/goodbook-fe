import ContentListCard from "./ContentListCard";
import { ErrorBlock, LoadingIndicator } from "../../../common/components";
import ReactPaginate from "react-paginate";
import { useContext } from "react";
import { BooksContext } from "../../hooks/context/browse/browse";

export default function ContentList({ ...attributes }) {
    const {
        data: books, 
        isLoading, 
        isError, 
        error, 
        initialPage, 
        handlePageClick 
    } = useContext(BooksContext)

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

import { Rating } from "../../../components"
import { ErrorBlock, LoadingIndicator } from "../../../../common/components"
import { useState } from "react"
import ReactPaginate from "react-paginate"
import { useReviewsByBookId } from "../../../hooks/useBookReview"
import { useBookBySlug } from "../../../hooks/useBook"
import { useParams } from "react-router-dom"

export default function ContentDetailReviewsUsers() {
    const [reviewsInitialPage, setReviewsInitialPage] = useState(0);
    const [reviewsPage, setReviewsPage] = useState(1);

    const { data: dataBook } = useBookBySlug(useParams().slug)
    const bookId = dataBook?.id

    const { data, isLoading, isError, error } = useReviewsByBookId({ bookId, reviewsPage })

    const handleReviewsPageClick = ({ selected }) => {
        setReviewsInitialPage(selected)
        setReviewsPage(selected + 1)
    }

    let content = <div className="text-center">No data found.</div>

    if (isLoading) {
        content = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        content = <ErrorBlock title={error.message} />
    }

    if (data?.data.length > 0) {
        const pageCount = data.meta.last_page ?? 1
        content = <>
            {data.data.map(data => {
                return (
                    <div key={data.id} className="grid grid-cols-1 md:grid-cols-12 mb-6">
                        <div className="col-span-3 mr-4">
                            <img src={data.user.image} alt={data.user.name} className="rounded-full mb-4" />
                            <div className="font-bold mb-2">{data.user.name}</div>
                            <div>{`${data.user.review_count} Reviews`}</div>
                        </div>
                        <div className="col-span-9">
                            <Rating rating={data.rating} ratingLabel="" addClassName="mb-3" />
                            <div className={`mb-5 ${!data.review ? 'italic text-gray-default' : ''}`}>{data.review ?? 'No review given.'}</div>
                            <div className="mb-4 text-gray-default">{data.updated_at}</div>
                            <hr className="border-gray-line" />
                        </div>
                    </div>
                )
            })}
            <ReactPaginate
                initialPage={reviewsInitialPage}
                activeClassName={'items-center text-orange-default cursor-pointer flex text-sm justify-center'}
                breakClassName={'items-center cursor-pointer flex text-sm justify-center'}
                breakLabel={'...'}
                containerClassName={'items-left flex flex-row justify-center list-none mb-0'}
                disabledClassName={'text-gray-default'}
                marginPagesDisplayed={2}
                nextClassName={"items-center text-black-default cursor-pointer flex p-3 text-sm justify-center"}
                nextLabel="next&nbsp;>"
                onPageChange={handleReviewsPageClick}
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
        <section>
            {content}
        </section>
    )
}

import { useQuery } from "@tanstack/react-query"
import { object } from "prop-types"
import { fetchReviewsByBookId } from "../../../api/books"
import { Rating } from "../../../components"
import { ErrorBlock, LoadingIndicator } from "../../../../common/components"
import { useState } from "react"

export default function ContentDetailReviewsUsers() {
    // const [initialPage, setInitialPage] = useState(0);
    const [page, setPage] = useState(1);

    // const handlePageClick = ({ selected }) => {
    //     setInitialPage(selected)
    //     setPage(selected + 1)
    // }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['book_ratings', { page }],
        queryFn: ({ signal, queryKey }) => fetchReviewsByBookId({ signal, ...queryKey[1] }),
    })

    let content = <div className="text-center">No data found.</div>

    if (isLoading) {
        content = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        content = <ErrorBlock title={error.message} />
    }
console.log(data)
    if (data?.data.length > 0) {
        // const pageCount = books.meta.last_page ?? 1
        content = <>
            {data.data.maps(data => {
                return (
                    <div className="flex">
                        <div>
                            <img src={data.user.name} alt={data.user.name} />
                            <div className="font-bold">{data.user.name}</div>
                            <div>{data.user.review_count}</div>
                        </div>
                        <div>
                            <Rating rating={data.rating} />
                            <div>{data.review ?? 'No review given'}</div>
                            <div>{data.updated_at}</div>
                        </div>
                    </div>
                )
            })}
        </>
    }

    return (
        <section>
            {content}
        </section>
    )
}

ContentDetailReviewsUsers.propTypes = {
    data: object.isRequired,
}
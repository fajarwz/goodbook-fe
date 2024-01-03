import { array } from "prop-types";
import ContentListCard from "./ContentListCard";
import { ErrorBlock, LoadingIndicator } from "../../../common/components";

export default function ContentList({ books, isLoading, isError, error, ...attributes }) {
    let loadingOrErrorPlaceholder = <></>

    if (isLoading) {
        loadingOrErrorPlaceholder = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        loadingOrErrorPlaceholder = <ErrorBlock
            title="An error occured"
            message={error.info?.message || 'Failed to fetch data'}
        />
    }

    return (
        <section {...attributes}>
            {loadingOrErrorPlaceholder}
            {books?.data.map(book => {
                return <ContentListCard key={book.id} book={book} />
            })}
            {/* Pagination */}
        </section>
    )
}

ContentList.propTypes = {
    book: array,
}
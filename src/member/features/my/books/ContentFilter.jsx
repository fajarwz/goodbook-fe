import { func } from "prop-types";
import ContentFilterButton from "./ContentFilterButton";
import ContentFilterUpdated from "./ContentFilterUpdated";
import ContentFilterRating from "./ContentFilterRating";
import { useContext } from "react";
import { BooksContext } from "../../../hooks/context/my/books";

export default function ContentFilter({ ...attributes }) {
    const { handleFilter } = useContext(BooksContext)

    return (
        <section {...attributes}>
            <h2 className="mb-3">Filter</h2>
            <form onSubmit={handleFilter} id="browse-filter-form">
                <ContentFilterUpdated />
                <ContentFilterRating />
                <ContentFilterButton />
            </form>
        </section>
    )
}

ContentFilter.propTypes = {
    handleFilter: func,
}
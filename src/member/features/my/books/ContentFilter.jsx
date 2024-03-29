import { func } from "prop-types";
import ContentFilterButton from "./ContentFilterButton";
import ContentFilterUpdated from "./ContentFilterUpdated";
import ContentFilterRating from "./ContentFilterRating";

export default function ContentFilter({ handleFilter, ...attributes }) {
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
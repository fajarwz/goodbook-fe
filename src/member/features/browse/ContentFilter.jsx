import ContentFilterApply from "./ContentFilterApply";
import ContentFilterPublished from "./ContentFilterPublished";
import ContentFilterRating from "./ContentFilterRating";

export default function ContentFilter({ handleFilter, ...attributes }) {
    return (
        <section {...attributes}>
            <h2 className="mb-3">Filter</h2>
            <form onSubmit={handleFilter}>
                <ContentFilterPublished />
                <ContentFilterRating />
                <ContentFilterApply />
            </form>
        </section>
    )
}
import ContentFilterPublished from "./ContentFilterPublished";
import ContentFilterRating from "./ContentFilterRating";

export default function ContentFilter() {
    return (
        <section>
            <h2 className="mb-3">Filter</h2>
            <div>
                <ContentFilterPublished />
                <ContentFilterRating />
            </div>
        </section>
    )
}
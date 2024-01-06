import ContentDetailAuthor from "./ContentDetailAuthor"
import ContentDetailInfo from "./ContentDetailInfo"
import ContentDetailReviews from "./ContentDetailReviews"

export default function ContentDetail() {
    return (
        <section className="md:col-span-8">
            <ContentDetailInfo />
            <ContentDetailAuthor />
            <ContentDetailReviews />
        </section>
    )
}

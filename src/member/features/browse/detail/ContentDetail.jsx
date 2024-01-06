import { object } from "prop-types"
import ContentDetailAuthor from "./ContentDetailAuthor"
import ContentDetailInfo from "./ContentDetailInfo"
import ContentDetailReviews from "./ContentDetailReviews"

export default function ContentDetail({ data }) {
    return (
        <section className="md:col-span-8">
            <ContentDetailInfo data={data} />
            <ContentDetailAuthor data={data} />
            <ContentDetailReviews data={data} />
        </section>
    )
}

ContentDetail.propTypes = {
    data: object.isRequired,
}
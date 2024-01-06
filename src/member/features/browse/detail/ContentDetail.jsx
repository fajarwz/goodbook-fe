import { object } from "prop-types"
import ContentDetailAuthor from "./ContentDetailAuthor"
import ContentDetailInfo from "./ContentDetailInfo"

export default function ContentDetail({ data }) {
    return (
        <section className="md:col-span-8 mb-10">
            <ContentDetailInfo data={data} />
            <ContentDetailAuthor data={data} />
        </section>
    )
}

ContentDetail.propTypes = {
    data: object.isRequired,
}
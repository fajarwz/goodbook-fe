import { bool, object } from "prop-types"
import { ErrorBlock, LoadingIndicator } from "../../../../common/components"
import ContentCover from "./ContentCover"
import ContentDetail from "./ContentDetail"

export default function Content({ data, isLoading, isError, error }) {
    let content = <div className="text-center">No data found.</div>

    if (isLoading) {
        content = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        console.log(error)
        content = <ErrorBlock
            title={error.message}
        />
    }

    if (data) {
        content = <div className="grid grid-cols-1 md:grid-cols-12 mb-20">
            <ContentCover img={data.cover} title={data.title} />
            <ContentDetail data={data} />
        </div>
    }

    return (
        <section className="container">
            {content}
        </section>
    )
}

Content.propTypes = {
    data: object,
    isLoading: bool,
    isError: bool,
    error: object,
}
import { ErrorBlock, LoadingIndicator } from "../../../../common/components"
import ContentCover from "./ContentCover"
import ContentDetail from "./ContentDetail"
import { useBookBySlug } from "../../../hooks/useBook"
import { useParams } from "react-router-dom"

export default function Content() {
    const { data, isLoading, isError, error } = useBookBySlug(useParams().slug)

    let content = <div className="text-center">No data found.</div>

    if (isLoading) {
        content = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        content = <ErrorBlock title={error.message}
        />
    }

    if (data) {
        content = <div className="grid grid-cols-1 md:grid-cols-12 mb-20">
            <ContentCover />
            <ContentDetail />
        </div>
    }

    return (
        <section className="container">
            {content}
        </section>
    )
}

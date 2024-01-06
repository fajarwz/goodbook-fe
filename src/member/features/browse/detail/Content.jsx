import { ErrorBlock, LoadingIndicator } from "../../../../common/components"
import ContentCover from "./ContentCover"
import ContentDetail from "./ContentDetail"
import { useContext } from "react"
import { BookContext } from "../../../hooks/browse/BrowseDetail"

export default function Content() {
    const { dataBook: data, isLoadingBook: isLoading, isErrorBook: isError, errorBook: error } = useContext(BookContext)

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

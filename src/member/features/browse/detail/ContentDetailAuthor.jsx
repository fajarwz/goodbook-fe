import { useBookBySlug } from "../../../hooks/useBook"
import { useParams } from "react-router-dom"

export default function ContentDetailAuthor() {
    const { data } = useBookBySlug(useParams().slug)

    return (
        <section className="mb-10">
            <h2 className="mb-6">Author</h2>
            <div className="flex items-center">
                <img src={data.author.image} alt={data.author.name} className="rounded-full mr-5 h-24 w-24" />
                <div>
                    <h3 className="mb-2">{data.author.name}</h3>
                    <div>{`${data.author.book_count} ${data.author.book_count > 1 ? 'Books' : 'Book'}`}</div>
                </div>
            </div>
        </section>
    )
}

import { object } from "prop-types"

export default function ContentDetailAuthor({ data }) {
    return (
        <section className="md:col-span-8">
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

ContentDetailAuthor.propTypes = {
    data: object.isRequired,
}
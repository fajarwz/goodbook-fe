import { Rating } from "../../../components"
import { useBookBySlug } from "../../../hooks/useBook"
import { useParams } from "react-router-dom"

export default function ContentDetailInfo() {
    const { data } = useBookBySlug(useParams().slug)

    return (
        <section className="mb-10">
            <div className="mb-9">
                <h1 className="mb-3">{data.title}</h1>
                <div className="text-2xl mb-3">{data.author.name}</div>
                <div className="flex">
                    <Rating rating={data.avg_rating} addRatingClassName='text-2xl mr-3' addStarClassName='w-[1.875rem] h-[1.875rem]' />
                </div>
            </div>
            <article className="mb-9">
                {data.description}
            </article>
            <div>
                <ul className="flex flex-wrap gap-x-8 gap-y-2 mb-4">
                    {data.genres.map(genre => {
                        return <li key={genre.id} className="font-bold">{genre.name}</li>
                    })}
                </ul>
                <div className="text-gray-dark mb-4">
                    {`${data.number_of_pages} Pages, ${data.cover_type.name}`}
                </div>
                <div className="mb-4">
                    {`Published ${data.published_at}`}
                </div>
            </div>
        </section>
    )
}

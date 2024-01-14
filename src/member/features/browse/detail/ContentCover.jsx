import { useBookBySlug } from "../../../hooks/useBook"
import { useParams } from "react-router-dom"

export default function ContentCover() {
    const { data } = useBookBySlug(useParams().slug)

    return (
        <section className="max-w-[23.4375rem] max-h-[35.9375rem] col-span-12 md:col-span-4 md:mr-[52px] mb-8 md:mb-0">
            <img src={data.cover} alt={`${data.title}'s cover`} className="rounded-[1.25rem]" />
        </section>
    )
}

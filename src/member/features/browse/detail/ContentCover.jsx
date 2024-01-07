import { useContext } from "react"
import { BookContext } from "../../../hooks/context/browse/browse-detail"

export default function ContentCover() {
    const { dataBook: data } = useContext(BookContext)

    return (
        <section className="w-[23.4375rem] h-[35.9375rem] md:col-span-4">
            <img src={data.cover} alt={`${data.title}'s cover`} className="rounded-[1.25rem]" />
        </section>
    )
}

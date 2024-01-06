import { string } from "prop-types"

export default function ContentCover({ img, title }) {
    return (
        <section className="w-[23.4375rem] h-[35.9375rem] md:col-span-4">
            <img src={img} alt={`${title}'s cover`} className="rounded-[1.25rem]" />
        </section>
    )
}

ContentCover.propTypes = {
    img: string.isRequired,
    title: string,
}
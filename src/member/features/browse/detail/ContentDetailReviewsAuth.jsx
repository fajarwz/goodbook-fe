import { object } from "prop-types"
import { Rating } from "../../../components"

export default function ContentDetailReviewsAuth() {
    return (
        <section className="mb-10 bg-white p-8 flex flex-col items-center justify-center">
            <h3 className="mb-4">What do you think?</h3>
            <Rating rating={0} addClassName='items-center justify-center' addStarClassName='w-[1.625rem] h-[1.625rem]' />
        </section>
    )
}

ContentDetailReviewsAuth.propTypes = {
    data: object.isRequired,
}
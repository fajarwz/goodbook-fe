import { number, object } from "prop-types";
import { Rating } from "../../components";
import { InputRadio } from "../../components/Form";

export default function ContentFilterRating({ radioButtonsRefs }) {
    const getContent = () => {
        return [0, 5, 4, 3, 2, 1].map(i => {
            return <InputRadio key={i} name='rating' ref={(el) => radioButtonsRefs.current[i] = el} value={i} addClassName='mb-3'>
                {i === 0 ? 'Any Rating' : <Rating rating={i} ratingLabel={i < 5 ? `${i}+` : i} addRatingClassName='w-6' />}
            </InputRadio>
        })
    }

    return (
        <div className="mb-4">
            {getContent()}
        </div>
    )
}

ContentFilterRating.propTypes = {
    rating: number,
    radioButtonsRefs: object,
}
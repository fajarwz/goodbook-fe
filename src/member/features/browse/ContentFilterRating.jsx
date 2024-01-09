import { Rating } from "../../components";
import { InputRadio } from "../../components/Form";

export default function ContentFilterRating() {
    const getContent = () => {
        return [0, 5, 4, 3, 2, 1].map(i => {
        return <InputRadio key={i} name='rating' value={i} defaultChecked={i === 0 ? true : false} addClassName='mb-3'>
            {i === 0 ? 'Any Rating' : <Rating rating={i} ratingLabel={i < 5 ? `${i}+` : i } addRatingClassName='w-6' />}
        </InputRadio>
        })
    }

    return (
        <div className="mb-4">
            {getContent()}
        </div>
    )
}
import { Rating } from "../../components";
import { InputCheckbox } from "../../components/Form";

export default function ContentFilterRating() {
    const getContent = () => {
        return [5, 4, 3, 2, 1].map(i => {
        return <InputCheckbox key={i} name={`rating_${i}`} addClassName='mb-3'>
            <Rating rating={i} addRatingClassName='w-4' />
        </InputCheckbox>
        })
    }

    return (
        <div className="mb-8">
            {getContent()}
        </div>
    )
}
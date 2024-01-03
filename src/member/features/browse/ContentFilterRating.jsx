import { Rating } from "../../components";
import { InputCheckbox } from "../../components/Form";

export default function ContentFilterRating() {
    return (
        <div>
            <InputCheckbox addClassName='mb-3'>
                <Rating rating={5} addRatingClassName='w-4' />
            </InputCheckbox>
            <InputCheckbox addClassName='mb-3'>
                <Rating rating={4} addRatingClassName='w-4' />
            </InputCheckbox>
            <InputCheckbox addClassName='mb-3'>
                <Rating rating={3} addRatingClassName='w-4' />
            </InputCheckbox>
            <InputCheckbox addClassName='mb-3'>
                <Rating rating={2} addRatingClassName='w-4' />
            </InputCheckbox>
            <InputCheckbox addClassName='mb-3'>
                <Rating rating={1} addRatingClassName='w-4' />
            </InputCheckbox>
        </div>
    )
}
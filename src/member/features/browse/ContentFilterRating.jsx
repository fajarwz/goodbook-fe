import { useContext } from "react";
import { Rating } from "../../components";
import { InputRadio } from "../../components/Form";
import { BooksContext } from "../../hooks/context/browse/browse";

export default function ContentFilterRating() {
    let { radioButtonsRefs } = useContext(BooksContext)

    const getContent = () => {
        console.log(radioButtonsRefs.current)
        return [0, 5, 4, 3, 2, 1].map(i => {
            return <InputRadio key={i} name='rating' ref={(el) => radioButtonsRefs.current[i] = el} value={i} defaultChecked={i === 0 ? true : false} addClassName='mb-3'>
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
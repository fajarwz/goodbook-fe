import { useEffect, useRef } from "react";
import { Rating } from "../../../components";
import { InputRadio } from "../../../components/Form";
import { useSearchParams } from "react-router-dom";

export default function ContentFilterRating() {
    const [searchParams, setSearchParams] = useSearchParams()

    const radioButtonsRefs = useRef([]);

    useEffect(() => {
        if (searchParams.get('reset_filter')) {
            radioButtonsRefs.current.forEach((radioButton) => {
                if (radioButton) {
                    radioButton.checked = false;
                }
            });
            // any rating checked by default
            if (radioButtonsRefs.current[0]) {
                radioButtonsRefs.current[0].checked = true;
            }

            setSearchParams(new URLSearchParams({}), { replace: true });
        }
    }, [searchParams, setSearchParams])

    const getContent = () => {
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
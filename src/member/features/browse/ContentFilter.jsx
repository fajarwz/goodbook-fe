import ContentFilterButton from "./ContentFilterButton";
import ContentFilterPublished from "./ContentFilterPublished";
import ContentFilterRating from "./ContentFilterRating";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function ContentFilter({ ...attributes }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const now = new Date()
    const monthYear = new Date(now.getFullYear(), now.getMonth())
    const monthYearPast = new Date(1970, 0)
    const dateConfig = { month: 'long', year: 'numeric' }
    const fromDefault = monthYearPast.toLocaleString('en-US', dateConfig)
    const untilDefault = monthYear.toLocaleString('en-US', dateConfig)

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const radioButtonsRefs = useRef([]);
    useEffect(() => {
        if (searchParams.get('published_from'))
            setStartDate(new Date(searchParams.get('published_from')))
        if (searchParams.get('published_until'))
            setEndDate(new Date(searchParams.get('published_until')))

        if (searchParams.get('rating')) {
            radioButtonsRefs.current[parseInt(searchParams.get('rating'))].checked = true;
        }
        else {
            radioButtonsRefs.current[0].checked = true;
        }

        if (searchParams.get('reset_filter')) {
            setStartDate()
            setEndDate()
            radioButtonsRefs.current[0].checked = true

            setSearchParams(new URLSearchParams({}), { replace: true });
        }
    }, [searchParams, setSearchParams])

    const handleFilter = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        setSearchParams(prev => {
            if (!prev.get('search')) {
                prev.set('search', '')
            }
            prev.set('published_from', !data.published_from ? fromDefault : data.published_from)
            prev.set('published_until', !data.published_until ? untilDefault : data.published_until)
            prev.set('rating', !data.rating ? 0 : data.rating)
            return prev
        }, { replace: true })
    }

    return (
        <section {...attributes}>
            <h2 className="mb-3">Filter</h2>
            <form onSubmit={handleFilter} id="browse-filter-form">
                <ContentFilterPublished 
                    startDate={startDate} 
                    setStartDate={setStartDate} 
                    endDate={endDate} 
                    setEndDate={setEndDate} 
                />
                <ContentFilterRating radioButtonsRefs={radioButtonsRefs} />
                <ContentFilterButton />
            </form>
        </section>
    )
}

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useSearchParams } from 'react-router-dom';

export default function ContentFilterUpdated() {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.get('reset_filter')) {
            setStartDate()
            setEndDate()
        }
    }, [searchParams])

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <DatePicker
                placeholderText='Updated from...'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className='h-11 border rounded-md border-gray-default p-3 bg-transparent w-[185px]'
                name='updated_form'
            />
            <DatePicker
                placeholderText='Updated until...'
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className='h-11 border rounded-md border-gray-default p-3 bg-transparent w-[185px]'
                name='updated_until'
            />
        </div>
    )
}
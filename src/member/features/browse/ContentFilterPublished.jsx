import { useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function ContentFilterPublished() {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const getLastDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0)
    }

    return (
        <div className="flex mb-4">
            <DatePicker
                placeholderText='Published from...'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className='h-11 border rounded-md border-gray-default p-3 bg-transparent min-w-[185px] md:mb-2 md:mr-4'
            />
            <DatePicker
                placeholderText='Published until...'
                selected={endDate}
                onChange={(date) => setEndDate(getLastDayOfMonth(date))}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className='h-11 border rounded-md border-gray-default p-3 bg-transparent min-w-[185px]'
            />
        </div>
    )
}
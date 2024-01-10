import { useContext } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BooksContext } from '../../hooks/context/browse/browse';

export default function ContentFilterPublished() {
    const { startDate, endDate, setStartDate, setEndDate } = useContext(BooksContext)

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <DatePicker
                placeholderText='Published from...'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className='h-11 border rounded-md border-gray-default p-3 bg-transparent w-[185px]'
                name='published_from'
            />
            <DatePicker
                placeholderText='Published until...'
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className='h-11 border rounded-md border-gray-default p-3 bg-transparent w-[185px]'
                name='published_until'
            />
        </div>
    )
}
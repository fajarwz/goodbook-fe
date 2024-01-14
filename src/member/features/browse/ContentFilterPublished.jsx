import { func, instanceOf } from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function ContentFilterPublished({ startDate, setStartDate, endDate, setEndDate }) {
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

ContentFilterPublished.propTypes = {
    startDate: instanceOf(Date),
    setStartDate: func,
    endDate: instanceOf(Date),
    setEndDate: func,
}
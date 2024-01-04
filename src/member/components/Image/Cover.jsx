import { string } from "prop-types"

export default function Cover({ cover, title }) {
    return <div className='w-[6.5625rem] h-[10.0625rem] sm:w-[9.375rem] sm:h-[14.375rem]'>
        <img src={cover} alt={`${title} cover`} className="w-full h-full rounded-md" />
    </div>
}

Cover.propTypes = {
    cover: string,
    title: string,
}
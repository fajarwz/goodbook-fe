import { Footer, Navbar } from '../../components'

import config from '../../utils/config'

import { useTitle } from '../../../common/hooks'
import { Content } from '../../features/browse/detail'
import { useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useBookBySlug } from '../../hooks/useBook';

export default function BrowseDetail() {
    const { data: dataBook } = useBookBySlug(useParams().slug)

    useTitle(`${dataBook?.title} Book | ${config.app.name}`)

    return (
        <div className='bg-customWhite-warm'>
            <Navbar />
            <Toaster />
            <Content />
            <Footer />
        </div>
    )
}
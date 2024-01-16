import { Footer, Navbar } from '../../components'

import config from '../../utils/config'
import { useTitle } from '../../../common/hooks'
import { Content, Header } from '../../features/my/books'
import { Toaster } from 'react-hot-toast'

export default function MyBooks() {
    useTitle('My Books | ' + config.app.name)

    return (
        <div className='bg-customWhite-warm'>
            <Navbar />
            <Toaster />
            <Header title='My Books' subtitle='List of all reviews and ratings that I have given' />
            <Content />
            <Footer />
        </div>
    )
}
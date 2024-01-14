import { Footer, Navbar } from '../../components'

import config from '../../utils/config'
import { useTitle } from '../../../common/hooks'
import { Header, Content } from '../../features/browse'
export default function Browse() {
    useTitle('Browse and discover Great Reads | ' + config.app.name)

    return (
        <div className='bg-customWhite-warm'>
            <Navbar />
            <Header />
            <Content />
            <Footer />
        </div>
    )
}
import { Footer } from '../components'
import { Header, Ignite, Promotion, Uncover } from '../features/home'
import config from '../utils/config'
import { useTitle } from '../../common/hooks'

export default function Home() {
    useTitle('Home | ' + config.app.name)

    const handleSearch = (event) => {
        
    }

    return (
        <>
            <Header />
            <Promotion title="Highest Rating" books={[]} />
            <Uncover handleSearch={handleSearch} genres={[]} />
            <Promotion title="New Releases" books={[]} />
            <Ignite />
            <Footer />
        </>
    )
}
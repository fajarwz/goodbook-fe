import { Link } from 'react-router-dom'
import logo from '../../assets/img/Goodbook.png'
import { Logo } from '../../components'

export default function ContentHeader() {
    return (
        <header>
            <Link to='/'>
                <Logo logo={logo} addClassName='mb-10' />
            </Link>
            <div className='mb-10'>
                <h1 className='mb-4'>
                    Share your voice <br />
                    with the reading world
                </h1>
                <div>Fuel your reading passion with like-minded readers</div>
            </div>
        </header>
    )
}
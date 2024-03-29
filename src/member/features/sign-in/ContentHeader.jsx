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
                <h1 className='mb-4'>Rejoin the adventure</h1>
                <div>Continue reading</div>
            </div>
        </header>
    )
}
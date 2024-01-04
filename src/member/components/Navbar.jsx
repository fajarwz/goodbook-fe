import { Link, useSearchParams } from 'react-router-dom'

import logo from '../assets/img/Goodbook.png'
import searchIcon from '../assets/img/search.svg'

import Logo from './Logo'
import { JoinBtn, SignInBtn } from './Button'

export default function Navbar() {
    const [searchParams, setSearchParams] = useSearchParams({ search: '' })
    const search = searchParams.get('search')

    const handleSearch = event => {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        setSearchParams(prev => {
            prev.set('search', data.search)
            return prev
        }, { replace: true })
    }

    return (
        <nav className="bg-customWhite-warm h-20 mb-9">
            <div className="container flex items-center justify-between h-full">
                <div className='flex items-center'>
                    <Link to='/'><Logo logo={logo} /></Link>
                    <ul className='mb-0 ml-14 font-bold'>
                        <li><Link to='/browse'>Browse</Link></li>
                    </ul>
                </div>
                <div className='flex items-center'>
                    <form onSubmit={handleSearch} className="flex">
                        <input type="text" name='search' defaultValue={search} placeholder='Search books' className="placeholder:text-gray-dark border border-orange-default rounded-md bg-transparent p-3 w-[350px] leading-3 pr-12" />
                        <img src={searchIcon} alt="Search icon" className="relative right-9" />
                    </form>
                    <JoinBtn />
                    <SignInBtn />
                </div>
            </div>
        </nav>
    )
}
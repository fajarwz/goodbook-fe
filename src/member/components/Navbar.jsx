import { Link } from 'react-router-dom'

import logo from '../assets/img/Goodbook.png'
import search from '../assets/img/search.svg'

import Logo from './Logo'
import { JoinBtn, SignInBtn } from './Button'

export default function Navbar() {
    const handleSearch = () => {

    }

    return (
        <nav className="bg-customWhite-warm h-20 mb-9">
            <div className="container flex items-center justify-between h-full">
                <div className='flex items-center'>
                    <Logo logo={logo} />
                    <ul className='mb-0 ml-14 font-bold'>
                        <li><Link to='browse'>Browse</Link></li>
                    </ul>
                </div>
                <div className='flex items-center'>
                    <form onSubmit={handleSearch} className="flex">
                        <input type="text" name='search' placeholder='Search books' className="placeholder:text-gray-dark border border-orange-default rounded-md bg-transparent p-3 w-[350px] leading-3 pr-12" />
                        <img src={search} alt="Search icon" className="relative right-9" />
                    </form>
                    <JoinBtn />
                    <SignInBtn />
                </div>
            </div>
        </nav>
    )
}
import { Link, useSearchParams } from 'react-router-dom'

import logo from '../assets/img/Goodbook.png'
import searchIcon from '../assets/img/search.svg'

import Logo from './Logo'
import { JoinBtn, SignInBtn } from './Button'
import { useState } from 'react'

export default function Navbar() {
    const [showHamburgerNav, setShowHamburgerNav] = useState(false)

    const toggleHamburgerBtnClick = () => {
        setShowHamburgerNav(!showHamburgerNav)
    }

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
        <nav className="bg-customWhite-warm min-h-20 flex flex-row items-center mb-9">
            <div className="container flex flex-col lg:flex-row h-full">
                <div className='flex my-auto items-center justify-between flex-shrink-0 min-h-20'>
                    <Link to='/'><Logo logo={logo} /></Link>
                    <a href="javascript:;" onClick={toggleHamburgerBtnClick} id="hamburger-btn" className="font-bold lg:hidden">☰</a>
                </div>
                <div className={`flex-col lg:flex lg:flex-row items-center justify-between lg:w-full bg-white lg:bg-inherit p-4 lg:p-0 rounded-md ${showHamburgerNav ? 'flex' : 'hidden'}`}>
                    <ul className='mb-8 lg:mb-0 lg:ml-14 font-bold w-full'>
                        <li><Link to='/browse'>Browse</Link></li>
                    </ul>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center w-full'>
                        <form onSubmit={handleSearch} className="flex mb-4 lg:mb-0 w-full lg:w-[350px]">
                            <input type="text" name='search' defaultValue={search} placeholder='Search books' className="placeholder:text-gray-dark border border-orange-default rounded-md bg-transparent p-3 w-full leading-3" />
                            <img src={searchIcon} alt="Search icon" className="relative right-9 -mr-9 lg:mr-0" />
                        </form>
                        <JoinBtn addClassName='mb-2 lg:mb-0' />
                        <SignInBtn />
                    </div>
                </div>
            </div>
        </nav>
    )
}
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import logo from '../assets/img/Goodbook.png'
import searchIcon from '../assets/img/search.svg'

import Logo from './Logo'
import { JoinBtn, SignInBtn } from './Button'
import { useEffect, useRef, useState } from 'react'
import { isAuth } from '../utils/token'
import UserDropdown from './UserDropdown'

export default function Navbar() {
    const [showHamburgerNav, setShowHamburgerNav] = useState(false)
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search') ?? ''

    const searchRef = useRef()
    useEffect(() => {
        if (searchParams.get('reset_filter')) {
            searchRef.current.value = ''

            setSearchParams(new URLSearchParams({}), { replace: true });
        }
    }, [searchParams, setSearchParams])

    const toggleHamburgerBtnClick = () => {
        setShowHamburgerNav(!showHamburgerNav)
    }
    
    const location = useLocation();

    const handleSearch = event => {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        setSearchParams(prev => {
            prev.set('search', data.search)
            return prev
        }, { replace: true })

        if (location.pathname !== '/browse')
            navigate(`/browse?search=${data.search}`)
    }

    const generateNav = () => {
        const resetFilterParam = '?reset_filter=1'

        let navLink = [<li key={0}><NavLink to={`/browse${resetFilterParam}`} className={({ isActive }) => (isActive ? 'active' : '')}>Browse</NavLink></li>]

        if (isAuth()) navLink[1] = <li key={1}><NavLink to={`/my/books${resetFilterParam}`} className={({ isActive }) => (isActive ? 'active' : '')}>My Books</NavLink></li>

        return navLink
    }

    return (
        <nav className="bg-customWhite-warm min-h-20 flex flex-row items-center mb-9">
            <div className="container flex flex-col lg:flex-row h-full">
                <div className='flex my-auto items-center justify-between flex-shrink-0 min-h-20'>
                    <Link to='/'><Logo logo={logo} /></Link>
                    <a href="#" onClick={toggleHamburgerBtnClick} id="hamburger-btn" className="font-bold lg:hidden">☰</a>
                </div>
                <div className={`flex-col lg:flex lg:flex-row items-center justify-between lg:w-full bg-white lg:bg-inherit p-4 lg:p-0 rounded-md ${showHamburgerNav ? 'flex' : 'hidden'}`}>
                    <ul className='flex flex-col lg:items-center md:flex-row gap-4 md:gap-14 mb-8 lg:mb-0 lg:ml-14 lg:mr-6 font-bold w-full'>
                        {generateNav()}
                    </ul>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center w-full'>
                        <form onSubmit={handleSearch} className="relative flex mb-4 lg:mb-0 w-full lg:w-[350px] mr-12">
                            <input type="text" name='search' defaultValue={search} ref={searchRef} placeholder='Search all books' className="placeholder:text-gray-dark border border-orange-default rounded-md bg-transparent p-3 w-full lg:w-[350px] leading-3" />
                            <img src={searchIcon} alt="Search icon" className="absolute right-3 top-3 lg:mr-0" />
                        </form>
                        {isAuth() 
                            ? <>
                                <UserDropdown />
                            </> 
                            : <>
                                <JoinBtn addClassName='mb-2 lg:mb-0' />
                                <SignInBtn />
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

import { Link } from 'react-router-dom'
import logoWhite from '../assets/img/Goodbook-white.png'

export default function Footer() {
    return (
        <footer className="bg-black-default py-20">
            <div className="container text-white grid grid-cols-1 md:grid-cols-2 items-center gap-x-0 md:gap-x-4">
                <div className='mb-10 md:mb-0'>
                    <img src={logoWhite} alt="Goodbook logo" className="h-6 mb-4" height="24" />
                    <div className="">Your favorite place to share <br /> your experience about books</div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-x-0 md:gap-x-4'>
                    <div className='mb-10 md:mb-0'>
                        <h2 className='mb-4 overflow-auto'>App</h2>
                        <ul className='font-bold'>
                            <li className='mb-2'><Link>Browse</Link></li>
                            <li className='mb-2'><Link>Join</Link></li>
                            <li className='mb-2'><Link>Sign In</Link></li>
                        </ul>
                    </div>
                    <div className='mb-10 md:mb-0'>
                        <h2 className='mb-4 overflow-auto'>Company</h2>
                        <ul className='font-bold'>
                            <li className='mb-2'><Link>About Us</Link></li>
                            <li className='mb-2'><Link>Privacy</Link></li>
                            <li className='mb-2'><Link>Help</Link></li>
                        </ul>
                    </div>
                    <div className='mb-10 md:mb-0'>
                        <h2 className='mb-4 overflow-auto'>Connect</h2>
                        <ul className='font-bold'>
                            <li className='mb-2'><Link>Instagram</Link></li>
                            <li className='mb-2'><Link>Tiktok</Link></li>
                            <li className='mb-2'><Link>Facebook</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
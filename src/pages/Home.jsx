import bgHero from '../assets/img/bg-hero.jpg'
import logoWhite from '../assets/img/Goodbook-white.png'
import BtnJoin from '../components/Button/BtnJoin'
import BtnSignIn from '../components/Button/BtnSignIn'
import star1 from '../assets/img/star-1.svg'
import star34 from '../assets/img/star-34.svg'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <section style={{ backgroundImage: `url(${bgHero})` }}>
                <div className="container flex flex-col h-full">
                    <nav className="h-20 flex items-center">
                        <img src={logoWhite} alt="Goodbook logo" className="h-6" height="24" />
                    </nav>
                    <div className="text-white text-center h-[26.25rem] flex flex-col items-center justify-center">
                        <div className="mb-10">
                            <h1 className="leading-10 mb-4">Share Your Thoughts <br /> and Discover Great Reads</h1>
                            <p>Read What Others Think About Your Favorite Books</p>
                        </div>
                        <div>
                            <BtnJoin />
                            <BtnSignIn />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-customWhite-warm py-20">
                <div className="container">
                    <div className='flex justify-between items-center mb-8'>
                        <h1 className="mb-0">The Highest Rating</h1>
                        <div>
                            <Link>
                                <span className='font-bold hidden sm:inline-block'>More</span>&nbsp;<span className='font-bold text-3xl sm:text-base' title="See more">{'>'}</span>
                            </Link>
                        </div>
                    </div>
                    <div className='grid grid-rows-1 md:grid-cols-2 gap-10'>
                        <div className='flex'>
                            <Link>
                                <div className='w-[6.5625rem] h-[10.0625rem] sm:w-[9.375rem] sm:h-[14.375rem]'>
                                    <img src="https://dummyimage.com/150x230/000/fff" alt="" className="w-full h-full" />
                                </div>
                            </Link>
                            <div className="ml-8">
                                <Link>
                                    <h2 className="mb-2">The Frozen River</h2>
                                </Link>
                                <p className="mb-2">Ariel Lawhon</p>
                                <div className='flex'>
                                    <span className="mr-2">4.8</span>
                                    <span className="hidden sm:flex">
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star34} alt="3/4 star" />
                                    </span>
                                    <span className="flex sm:hidden">
                                        <img src={star1} alt="Full star" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <Link>
                                <div className='w-[6.5625rem] h-[10.0625rem] sm:w-[9.375rem] sm:h-[14.375rem]'>
                                    <img src="https://dummyimage.com/150x230/000/fff" alt="" className="w-full h-full" />
                                </div>
                            </Link>
                            <div className="ml-8">
                                <Link>
                                    <h2 className="mb-2">All Good People Here</h2>
                                </Link>
                                <p className="mb-2">Ashley Flowers</p>
                                <div className='flex'>
                                    <span className="mr-2">4.78</span>
                                    <span className="hidden sm:flex">
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star34} alt="3/4 star" />
                                    </span>
                                    <span className="flex sm:hidden">
                                        <img src={star1} alt="Full star" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <Link>
                                <div className='w-[6.5625rem] h-[10.0625rem] sm:w-[9.375rem] sm:h-[14.375rem]'>
                                    <img src="https://dummyimage.com/150x230/000/fff" alt="" className="w-full h-full" />
                                </div>
                            </Link>
                            <div className="ml-8">
                                <Link>
                                    <h2 className="mb-2">Never Lie</h2>
                                </Link>
                                <p className="mb-2">Freida McFadden</p>
                                <div className='flex'>
                                    <span className="mr-2">4.75</span>
                                    <span className="hidden sm:flex">
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star34} alt="3/4 star" />
                                    </span>
                                    <span className="flex sm:hidden">
                                        <img src={star1} alt="Full star" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <Link>
                                <div className='w-[6.5625rem] h-[10.0625rem] sm:w-[9.375rem] sm:h-[14.375rem]'>
                                    <img src="https://dummyimage.com/150x230/000/fff" alt="" className="w-full h-full" />
                                </div>
                            </Link>
                            <div className="ml-8">
                                <Link>
                                    <h2 className="mb-2">Salt & Broom</h2>
                                </Link>
                                <p className="mb-2">Sharon Lynn Fisher</p>
                                <div className='flex'>
                                    <span className="mr-2">4.71</span>
                                    <span className="hidden sm:flex">
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star1} alt="Full star" />
                                        <img src={star34} alt="3/4 star" />
                                    </span>
                                    <span className="flex sm:hidden">
                                        <img src={star1} alt="Full star" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
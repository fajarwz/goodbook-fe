import { Link } from 'react-router-dom'
import bgHero from '../assets/img/bg-hero.jpg'
import logoWhite from '../assets/img/Goodbook-white.png'
import BtnJoin from '../components/Button/BtnJoin'
import BtnSignIn from '../components/Button/BtnSignIn'
import search from '../assets/img/search.svg'
import Footer from '../components/Footer'
import PromotionCard from '../components/Card/PromotionCard'

export default function Home() {
    return (
        <>
            <header style={{ backgroundImage: `url(${bgHero})` }}>
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
            </header>
            <PromotionCard title="Highest Rating" books={[]} />
            <section className="bg-black-default py-20 text-white text-center">
                <div className="container">
                    <h1 className="mb-7">Uncover Hidden Gems</h1>
                    <form className="flex justify-center mb-7">
                        <input type="text" name='search' placeholder='Search books' className="placeholder:text-gray-dark border-4 border-orange-default rounded-md bg-transparent p-3 w-[480px] leading-3" />
                        <img src={search} alt="Search icon" className="relative right-9" />
                    </form>
                    <div>
                        <ul className='flex flex-wrap gap-x-7 gap-y-4 justify-center font-bold'>
                            <li><Link>Art</Link></li>
                            <li><Link>Biography</Link></li>
                            <li><Link>Comics</Link></li>
                            <li><Link>Fantasy</Link></li>
                            <li><Link>Fiction</Link></li>
                            <li><Link>History</Link></li>
                            <li><Link>Horror</Link></li>
                            <li><Link>Sports</Link></li>
                            <li><Link>Survival</Link></li>
                            <li><Link>Science</Link></li>
                            <li><Link>Thriller</Link></li>
                            <li><Link>War</Link></li>
                        </ul>
                    </div>
                </div>
            </section>
            <PromotionCard title="New Releases" books={[]} />
            <section className="bg-white py-20">
                <div className="container text-center">
                    <h1 className="mb-4">Ignite Your Reading Passion</h1>
                    <p className="mb-10">Discover good reads</p>
                    <div>
                        <BtnJoin />
                        <BtnSignIn />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
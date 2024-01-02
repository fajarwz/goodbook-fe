import { Link } from 'react-router-dom'

import search from '../../assets/img/search.svg'

export default function Uncover({ handleSearch, genres }) {
    return (
        <section className="bg-black-default py-20 text-white text-center">
            <div className="container">
                <h1 className="mb-7">Uncover Hidden Gems</h1>
                <form onSubmit={handleSearch} className="flex justify-center mb-7">
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
    )
}
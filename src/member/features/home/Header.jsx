import bgHero from '../../assets/img/bg-hero.jpg'

import { JoinBtn, SignInBtn } from '../../components/Button'
import { Logo } from '../../components'

import logoWhite from '../../assets/img/Goodbook-white.png'

export default function Header() {
    return (
        <header style={{ backgroundImage: `url(${bgHero})` }}>
            <div className="container flex flex-col h-full">
                <nav className="h-20 flex items-center">
                    <Logo logo={logoWhite} />
                </nav>
                <div className="text-white text-center h-[26.25rem] flex flex-col items-center justify-center">
                    <div className="mb-10">
                        <h1 className="leading-10 mb-4">Share Your Thoughts <br /> and Discover Great Reads</h1>
                        <p>Read What Others Think About Your Favorite Books</p>
                    </div>
                    <div>
                        <JoinBtn />
                        <SignInBtn />
                    </div>
                </div>
            </div>
        </header>
    )
}
import bgHero from '../assets/img/bg-hero.jpg'
import logoWhite from '../assets/img/Goodbook-white.png'
import BtnJoin from '../components/Button/BtnJoin'
import BtnSignIn from '../components/Button/BtnSignIn'

export default function Home() {
    return (
        <>
            <div style={{ backgroundImage: `url(${bgHero})` }}>
                <div className="container flex flex-col h-full">
                    <nav className="h-20 flex items-center">
                        <img src={logoWhite} alt="Goodbook logo" className="h-6" height="24" />
                    </nav>
                    <div className="text-white text-center h-[420px] flex flex-col items-center justify-center">
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
            </div>
        </>
    )
}
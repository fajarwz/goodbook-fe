import heroSignIn from '../../assets/img/hero-sign-in.jpg'

export default function Hero() {
    return (
        <>
            <div className="w-[37rem] mr-20 lg:mr-32 min-h-screen hidden md:block mr-">
                <img src={heroSignIn} alt="Sign In background" className="h-full w-full object-cover" />
            </div>
        </>
    )
}
import bgSignIn from '../../assets/img/bg-sign-in.jpg'

export default function Hero() {
    return (
        <>
            <div className="w-[37rem] mr-20 lg:mr-32 h-screen min-h-screen hidden md:block">
                <img src={bgSignIn} alt="Sign In background" className="min-h-screen object-cover" />
            </div>
        </>
    )
}
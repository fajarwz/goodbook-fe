import bgSignIn from '../../assets/img/bg-sign-in.jpg'

export default function Hero() {
    return (
        <>
            <div className="col-span-5 w-full h-screen hidden md:block">
                <img src={bgSignIn} alt="Sign In background" className="min-h-screen object-center" />
            </div>
            <div className="col-span-1 hidden md:block"></div>
        </>
    )
}
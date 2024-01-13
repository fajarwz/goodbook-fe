import heroJoin from '../../assets/img/hero-join.jpg'

export default function Hero() {
    return (
        <>
            <div className="w-[37rem] mr-20 lg:mr-32 min-h-screen hidden md:block">
                <img src={heroJoin} alt="Join background" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-1 hidden md:block"></div>
        </>
    )
}
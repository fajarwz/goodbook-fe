import bgJoin from '../../assets/img/bg-join.jpg'

export default function Hero() {
    return (
        <>
            <div className="w-[37rem] mr-20 lg:mr-32 h-screen min-h-screen hidden md:block">
                <img src={bgJoin} alt="Join background" className="min-h-screen object-cover" />
            </div>
            <div className="col-span-1 hidden md:block"></div>
        </>
    )
}
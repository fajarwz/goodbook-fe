import bgJoin from '../../assets/img/bg-join.jpg'

export default function Hero() {
    return (
        <>
            <div className="col-span-5 w-full min-h-screen hidden md:block">
                <img src={bgJoin} alt="Join background" className="h-full min-h-screen object-cover" />
            </div>
            <div className="col-span-1 hidden md:block"></div>
        </>
    )
}
import { JoinBtn, SignInBtn } from '../../components/Button'

export default function Ignite() {
    return (
        <section className="bg-white py-20">
            <div className="container text-center">
                <h1 className="mb-4">Ignite Your Reading Passion</h1>
                <p className="mb-10">Discover good reads</p>
                <div>
                    <JoinBtn />
                    <SignInBtn />
                </div>
            </div>
        </section>
    )
}
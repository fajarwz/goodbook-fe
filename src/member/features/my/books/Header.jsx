import { string } from "prop-types"

export default function Header({ title, subtitle }) {
    return (
        <header className="mb-9">
            <div className="container">
                <h1 className="mb-2">{title}</h1>
                <p>{subtitle}</p>
            </div>
        </header>
    )
}

Header.propTypes = {
    title: string,
    subtitle: string,
}
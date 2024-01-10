import ContentFilter from "./ContentFilter";
import ContentList from "./ContentList";

export default function Content() {
    return (
        <section className="mb-20">
            <div className="container grid grid-cols-1 md:grid-cols-12">
                <ContentFilter className='col-span-4 mb-8' />
                <ContentList className='col-span-8 lg:ml-10' />
            </div>
        </section>
    )
}

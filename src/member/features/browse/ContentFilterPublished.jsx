import { Input } from "../../components/Form";

export default function ContentFilterPublished() {
    return (
        <div className="mb-4">
            <Input placeholder='Published from...' name='published_from' addClassName='md:mb-2 md:mr-4 min-w-[185px]' />
            <Input placeholder='Published until...' name='published_until' addClassName='min-w-[185px]' />
        </div>
    )
}
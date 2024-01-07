import { Link } from 'react-router-dom'
import { Card } from '../../../admin/components/Card'
import ContentHeader from './ContentHeader'
import ContentForm from './ContentForm'
import { useContext } from 'react'
import { SignInContext } from '../../hooks/context/auth'

export default function Content() {
    const { errorNotif } = useContext(SignInContext)
    const content = <>
        <ContentHeader />
        <Card>
            {errorNotif}
            <ContentForm />
            <div className='text-center'>
                Don&apos;t have an account? <Link className='font-bold'>Join</Link>
            </div>
        </Card>
    </>

    return (
        <>
            <div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center py-6">
                <div className='container md:hidden'>
                    {content}
                </div>
                <div className='hidden md:block'>
                    {content}
                </div>
            </div>
        </>
    )
}
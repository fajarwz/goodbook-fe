import { Link } from 'react-router-dom'
import { Card } from '../../../member/components/Card'
import ContentHeader from './ContentHeader'
import ContentForm from './ContentForm'
import { useContext } from 'react'
import { SignInContext } from '../../hooks/context/auth'

export default function Content() {
    const { errorNotif } = useContext(SignInContext)

    return (
        <>
            <div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center py-6">
                <div className='w-full md:w-min px-8 md:px-0'>
                    <ContentHeader />
                    <Card addClassName='w-full' >
                        {errorNotif}
                        <ContentForm />
                        <div className='text-center'>
                            Don&apos;t have an account? <Link className='font-bold'>Join</Link>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
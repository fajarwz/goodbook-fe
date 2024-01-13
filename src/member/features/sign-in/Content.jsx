import { Link } from 'react-router-dom'
import { Card } from '../../components'
import ContentHeader from './ContentHeader'
import ContentForm from './ContentForm'
import { useContext } from 'react'
import { SignInContext } from '../../hooks/context/auth'

export default function Content() {
    const { errorNotif } = useContext(SignInContext)

    return (
        <>
            <div className="flex flex-col items-start justify-center py-20 md:pr-10 w-full lg:w-auto">
                <div className='w-full md:w-min px-8 md:px-0'>
                    <ContentHeader />
                    <Card addClassName='w-full' >
                        {errorNotif}
                        <ContentForm />
                        <div className='text-center'>
                            Don&apos;t have an account? <Link to='/join' className='font-bold'>Join</Link>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
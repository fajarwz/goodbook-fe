import { Link } from 'react-router-dom'
import { Card } from '../../components'
import ContentHeader from './ContentHeader'
import ContentForm from './ContentForm'
import { useContext } from 'react'
import { JoinContext } from '../../hooks/context/auth'

export default function Content() {
    const { errorNotif } = useContext(JoinContext)

    return (
        <>
            <div className="flex flex-col items-start justify-center py-16 md:pr-10 w-full lg:w-auto">
                <div className='w-full md:w-min px-8 md:px-0'>
                    <ContentHeader />
                    <Card addClassName='w-full' >
                        {errorNotif}
                        <ContentForm />
                        <div className='text-center'>
                            Already have an account? <Link to='/sign-in' className='font-bold'>Sign In</Link>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
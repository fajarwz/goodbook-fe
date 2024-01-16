import { Footer, Modal, Navbar } from '../../components'

import star1 from '../../assets/img/star-1.svg'
import starNotSet from '../../assets/img/star-not-set.svg'

import config from '../../utils/config'
import { useTitle } from '../../../common/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { deleteMyReview, fetchMyBooks, updateMyReview } from '../../api/my'
import { useSearchParams } from 'react-router-dom'
import { BooksContext } from '../../hooks/context/my/books'
import { Content, Header } from '../../features/my/books'
import queryClient from '../../../common/utils/queryClient'
import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { ErrorBlock } from '../../../common/components'
import toast, { Toaster } from 'react-hot-toast'

export default function MyBooks() {
    useTitle('My Books | ' + config.app.name)

    return (
        <div className='bg-customWhite-warm'>
            <Navbar />
            <Toaster />
            <Header title='My Books' subtitle='List of all reviews and ratings that I have given' />
            <Content />
            <Footer />
        </div>
    )
}
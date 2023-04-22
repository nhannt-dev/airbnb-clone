'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { logo } from '../../public/images'

const Logo = () => {
    const router = useRouter()
    return (
        <Image onClick={() => router.push('/')} height={100} width={100} src={logo} alt='nhannt' className='hidden md:block cursor-pointer' />
    )
}

export default Logo
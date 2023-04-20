'use client'

import Image from 'next/image'
import React from 'react'
import { placeholder } from '../../public/images'

// interface AvatarProps {
//     src: string | null | undefined;
// }

const Avatar = () => {
    return (
        <Image src={placeholder} width={30} height={30} alt='nhannt' />
    )
}

export default Avatar
'use client'

import React from 'react'
import { SafeUser } from '../types'
import { useCountries } from '../hooks'
import { Heading, HeartButton } from './'
import Image from 'next/image'

interface ListingHeadProps {
    title: string
    locationValue: string
    imageSrc: string
    id: string
    currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, locationValue, imageSrc, id, currentUser }) => {
    const { getByValue } = useCountries()
    const location = getByValue(locationValue)

    return (
        <>
            <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
            <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <Image src={imageSrc} fill className='object-cover w-full' alt='nhannt-dev' />
                <div className='absolute top-5 right-5'>
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    )
}

export default ListingHead

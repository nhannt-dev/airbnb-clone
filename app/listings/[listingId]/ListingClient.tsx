'use client'

import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeListing, SafeUser } from '../../types'
import { Reservation } from '@prisma/client'
import { useLogin } from '../../hooks'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import { Range } from 'react-date-range'
import { categories } from '@/app/utils/categories'
import { Container, ListingHead, ListingInfo } from '../../components'

interface ListingClientProps {
    reservations?: Reservation[]
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, reservations = [], currentUser }) => {
    const loginModal = useLogin()
    const router = useRouter()
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])

    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser} />
                    <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                        <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
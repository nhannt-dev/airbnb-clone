import React from 'react'
import { getListingById, getCurrentUser, getReservations } from '../../actions'
import { ClientOnly, EmptyState } from '../../components'
import ListingClient from './ListingClient'
interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ListingPage

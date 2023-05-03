import React from 'react'
import { getListingById, getCurrentUser } from '../../actions'
import { ClientOnly, EmptyState } from '../../components'
import ListingClient from './ListingClient'
interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
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
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ListingPage

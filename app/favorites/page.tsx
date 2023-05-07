import { EmptyState, ClientOnly } from '../components'
import { getCurrentUser, getFavoriteListings } from '../actions'
import FavoritesClient from './FavoritesClient'

const ListingPage = async () => {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No favorites found' subtitle='Looks like you have no favorite listings.' />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <FavoritesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default ListingPage
import ClientWrapper from "../components/ClientWrapper";
import EmptyState from "../components/EmptyState";

import getCurrentUser from "../utils/getCurrentUser";
import getFavouritesListings from "../utils/getFavoriteListings";

const FavouritesPage = () => {

    return (
        <ClientWrapper>
            <EmptyState title="No favourites found!" subtitle="Looks like you have no favourites places!" />
        </ClientWrapper>
    )
}

export default FavouritesPage;
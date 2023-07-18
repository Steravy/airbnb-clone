import ClientWrapper from "../components/ClientWrapper";
import EmptyState from "../components/EmptyState";

import getCurrentUser from "../../utils/getCurrentUser";
import getFavouritesListings from "../../utils/getFavoriteListings";
import FavoritesView from "./components/FavoritesView";

const FavouritesPage = async () => {

    const currentUser = await getCurrentUser();
    const favoritesListings = await getFavouritesListings();

    if (favoritesListings.length === 0) {

        return (

            <ClientWrapper>
                <EmptyState title="No favourites found!" subtitle="Looks like you haven`t added no favourites places!" />
            </ClientWrapper>
        )
    }

    return (
        <ClientWrapper>
            <FavoritesView
                listings={favoritesListings}
                currentUser={currentUser}
            />
        </ClientWrapper>
    )
}

export default FavouritesPage;
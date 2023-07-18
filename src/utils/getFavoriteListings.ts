import prisma from "@/lib/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavouritesListings() {

    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return [];

        const favorites = await prisma.listing.findMany({

            where: {

                id: {
                    in: [...currentUser.favoriteIds || []]
                }
            }
        })

        const sanitizedFavoritesListing = favorites.map((favoriteListing) => ({
            ...favoriteListing,
            createdAt: favoriteListing.createdAt.toISOString()
        }))

        return sanitizedFavoritesListing;

    } catch (error: any) {
        throw new Error(error);
    }
}
import prisma from "@/lib/prismadb";

export interface IListingsParams {
    userId?: string;
    roomCount?: number;
    guestCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}


export default async function getListings(params: IListingsParams) {

    try {

        const { userId, roomCount, guestCount, bathroomCount, startDate, endDate, locationValue, category } = params;
        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (roomCount) {
            query.roomCount = { gte: +roomCount };
        }

        if (guestCount) {
            query.guestCount = { gte: +guestCount };
        }

        if (bathroomCount) {
            query.bathroomCount = { gte: +bathroomCount };
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {
                                    gte: startDate
                                },
                                startDate: {
                                    lte: startDate
                                },

                            },
                            {
                                endDate: {
                                    gte: endDate
                                },
                                startDate: {
                                    lte: endDate
                                },
                            }
                        ]
                    }
                }
            }
        }


        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (category) {
            query.category = category;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListingsType = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))
        return safeListingsType;

    } catch (error: any) {
        throw new Error(error);
        // return toast.error(error)
    }
}

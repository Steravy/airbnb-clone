import prisma from "@/app/lib/prismadb";


export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
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

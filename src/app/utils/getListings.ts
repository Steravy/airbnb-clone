import prisma from "@/app/lib/prismadb";
import { toast } from "react-hot-toast";


export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return listings;

    } catch (error: any) {
        throw new Error(error);
        // return toast.error(error)
    }
}

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";

interface IParams {
    listingId?: string;
}

export async function DELETE(request: NextRequest, { params }: { params: IParams }) {

    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') throw new Error("Invalid ID");

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing);
}
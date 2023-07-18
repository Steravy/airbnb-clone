import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";

export async function POST(req: NextRequest) {

    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const body = await req.json();

    const {
        listingId,
        totalPrice,
        startDate,
        endDate
    } = body;

    if (!listingId || !totalPrice || !startDate || !endDate) return NextResponse.error();

    const reservationOnListing = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    totalPrice,
                    startDate,
                    endDate
                }
            }
        }
    })

    return NextResponse.json(reservationOnListing);
}
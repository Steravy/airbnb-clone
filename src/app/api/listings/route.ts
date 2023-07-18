import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(request: NextRequest) {

    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const body = await request.json();

    const {
        title,
        description,
        price,
        imageSrc,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        category
    } = body;

    Object.keys(body).forEach((value: any) => {

        if (!body[value]) NextResponse.error();

    });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            price: parseInt(price),
            imageSrc,
            locationValue: location.value,
            guestCount,
            roomCount,
            bathroomCount,
            category,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}
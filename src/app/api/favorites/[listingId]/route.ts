import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/utils/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(request: NextRequest, { params }: { params: IParams }) {

    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') throw new Error("Invalid ID");

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIds
        }
    })

    return NextResponse.json(user);
}

export async function DELETE(request: NextRequest, { params }: { params: IParams }) {

    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') throw new Error("Invalid ID");

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter(id => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIds
        }
    });

    return NextResponse.json(user);

}
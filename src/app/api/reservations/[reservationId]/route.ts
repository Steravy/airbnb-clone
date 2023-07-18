import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismadb";

import getCurrentUser from "@/utils/getCurrentUser";

interface IParams {

    reservationId?: string;
}

export async function DELETE(request: NextRequest, { params }: { params: IParams }) {

    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') throw new Error('Invalid ID!');

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {
                    userId: currentUser.id
                },
                {
                    listing: {
                        userId: currentUser.id
                    }
                }
            ]
        }
    })

    return NextResponse.json(reservation);

}
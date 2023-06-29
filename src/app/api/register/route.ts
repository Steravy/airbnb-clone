import { bcryptPasswordHash } from "@/app/utils/bcryptHandlers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";


export async function POST(request: NextRequest) {

    const { name, email, password } = await request.json();

    const hashedPassword: string = await bcryptPasswordHash(password);

    const user = await prisma.user.create({

        data: {
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json({
        user
    })

}
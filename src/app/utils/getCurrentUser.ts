import { getServerSession } from "next-auth/next";
import authOptions from "./authOptions";
import prisma from "@/app/lib/prismadb";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const getSession = async () => {
    return await getServerSession(authOptions);
}

const getCurrentUser = async () => {

    try {
        const session = await getSession();
        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({

            where: {
                email: session.user.email
            }
        })

        if (!currentUser) {
            return null;
        }

        // return currentUser;
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }

    } catch (error) {
        return null;
    }
}

export default getCurrentUser
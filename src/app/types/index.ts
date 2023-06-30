import { User } from "@prisma/client";

export type CustomUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null
}
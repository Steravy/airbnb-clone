import { Listing, Reservation, User } from "@prisma/client";

export type ModifiedUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null
}

export type ModifiedListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
};

export type ModifiedReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: ModifiedListing;
};
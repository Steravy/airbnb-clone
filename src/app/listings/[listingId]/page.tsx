import ClientWrapper from "@/app/components/ClientWrapper";
import EmptyState from "@/app/components/EmptyState";
import ListingView from "@/app/components/listings/ListingView";
import { ModifiedReservation } from "@/app/types";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getListingById from "@/app/utils/getListingById";
import getReservations from "@/app/utils/getReservations";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientWrapper>
                <EmptyState showResetButton />
            </ClientWrapper>
        )
    }

    return (

        <ClientWrapper >
            <ListingView
                listing={listing}
                currentUser={currentUser}
                reservations={reservations as ModifiedReservation[]}
            />
        </ClientWrapper>
    )
}

export default ListingPage;
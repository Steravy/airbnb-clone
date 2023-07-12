import ClientWrapper from "@/app/components/ClientWrapper";
import EmptyState from "@/app/components/EmptyState";
import ListingView from "@/app/components/listings/ListingView";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getListingById from "@/app/utils/getListingById";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params);
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
            />
        </ClientWrapper>
    )
}

export default ListingPage;
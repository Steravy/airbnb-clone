import ClientWrapper from "../components/ClientWrapper";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../utils/getCurrentUser";
import getListings from "../utils/getListings";
import PropertiesView from "./components/PropertiesView";

const PropertiesPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {

        return (
            <ClientWrapper>
                <EmptyState title="Unauthorized" subtitle="Please login to continue!" />
            </ClientWrapper>
        )
    }

    const listings = await getListings({ userId: currentUser.id });

    if (listings.length === 0) {

        return (
            <ClientWrapper>
                <EmptyState title="No Properties found!" subtitle="Looks like you have no properties to show!" />
            </ClientWrapper>
        )
    }

    return (

        <ClientWrapper>
            <PropertiesView
                listings={listings}
                currentUser={currentUser}
            />
        </ClientWrapper>
    )



}

export default PropertiesPage;
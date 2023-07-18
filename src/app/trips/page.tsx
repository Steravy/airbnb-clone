import ClientWrapper from "../components/ClientWrapper";
import EmptyState from "../components/EmptyState";
import { ModifiedReservation } from "../types";
import getCurrentUser from "../../utils/getCurrentUser";
import getReservations from "../../utils/getReservations";
import TripsView from "./components/TripsView";

const TripsPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {

        return (
            <ClientWrapper>
                <EmptyState title="Unauthorized" subtitle="Please login to continue" />
            </ClientWrapper>
        )
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {

        return (
            <ClientWrapper>
                <EmptyState title="No trips found!" subtitle="Looks like you have no trips booked!" />
            </ClientWrapper>
        )
    }

    return (
        <ClientWrapper>
            <TripsView
                reservations={reservations as ModifiedReservation[]}
                currentUser={currentUser}
            />
        </ClientWrapper>
    )



}

export default TripsPage;
import getCurrentUser from "../utils/getCurrentUser"
import getReservations from "../utils/getReservations"
import ClientWrapper from "../components/ClientWrapper"
import EmptyState from "../components/EmptyState"
import ReservationsView from "./components/ReservationsView"
import { ModifiedReservation } from "../types"


const ReservationsPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {

        return (

            <ClientWrapper>
                <EmptyState title="Unauthorized" subtitle="Please login to continue!" />
            </ClientWrapper>
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length === 0) {

        return (
            <ClientWrapper>
                <EmptyState title="No reservations found!" subtitle="Looks like you have no reservations on your properties!" />
            </ClientWrapper>
        )

    }

    return (
        <ClientWrapper>
            <ReservationsView
                reservations={reservations as ModifiedReservation[]}
                currentUser={currentUser}
            />
        </ClientWrapper>
    )
}

export default ReservationsPage
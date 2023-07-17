'use client';

import { ModifiedReservation, ModifiedUser } from "@/app/types";
import { useRouter } from "next/navigation";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";


interface ReservationsViewProps {
    reservations: ModifiedReservation[];
    currentUser?: ModifiedUser | null;
}

const ReservationsView: React.FC<ReservationsViewProps> = ({ reservations, currentUser }) => {

    const router = useRouter();
    const [idToDelete, setIdToDelete] = useState('');

    const handleCancelation = useCallback((id: string) => {

        setIdToDelete(id);

        axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation Cancelled!')
                router.refresh();
            })
            .catch((error) => {
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIdToDelete('');
            })
    }, [router]);

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8' >
                {
                    reservations.map((reservation) => (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={handleCancelation}
                            disabled={idToDelete === reservation.id}
                            actionLabel="Cancel guest`s reservation"
                            currentUser={currentUser}
                        />
                    ))
                }
            </section>

        </Container>
    )
}

export default ReservationsView;
'use client';

import { useRouter } from "next/navigation";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { ModifiedReservation, ModifiedUser } from "@/app/types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";



interface TripsViewProps {
  reservations: ModifiedReservation[];
  currentUser: ModifiedUser | null;
}

const TripsView: React.FC<TripsViewProps> = ({ reservations, currentUser }) => {

  const router = useRouter();
  const [idToDelete, setIdToDelete] = useState('');

  const handleDelete = useCallback((id: string) => {

    setIdToDelete(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation Cancelled!')
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIdToDelete('');
      })
  }, [router]);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you have been and where you are going..."
      />
      <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8' >
        {
          reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={handleDelete}
              disabled={idToDelete === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))
        }
      </section>
    </Container>
  )
}

export default TripsView;
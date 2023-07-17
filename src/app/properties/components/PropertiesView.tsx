'use client';

import { useRouter } from "next/navigation";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { ModifiedListing, ModifiedReservation, ModifiedUser } from "@/app/types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";



interface PropertiesViewProps {
  listings: ModifiedListing[];
  currentUser: ModifiedUser | null;
}

const PropertiesView: React.FC<PropertiesViewProps> = ({ listings, currentUser }) => {

  const router = useRouter();
  const [idToDelete, setIdToDelete] = useState('');

  const handleDelete = useCallback((id: string) => {

    setIdToDelete(id);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Property Deleted!')
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
        title="Prpoperties"
        subtitle="Here is your list of properties"
      />
      <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8' >
        {
          listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={handleDelete}
              disabled={idToDelete === listing.id}
              actionLabel="Delete Property"
              currentUser={currentUser}
            />
          ))
        }
      </section>
    </Container>
  )
}

export default PropertiesView;
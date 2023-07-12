'use client';

import { useMemo } from "react";
import { ModifiedListing, ModifiedReservation, ModifiedUser } from "@/app/types";
import { categories } from "@/app/lib/categoryItemsProvider";
import Container from "../Container";
import ListingHeader from "./ListingHeader";
import ListingDetails from "./ListingDetails";

interface ListingViewProps {
  currentUser?: ModifiedUser | null;
  reservation?: ModifiedReservation[];
  listing: ModifiedListing & {
    user: ModifiedUser
  };
}

const ListingView: React.FC<ListingViewProps> = ({ listing, currentUser, reservation }) => {

  const category = useMemo(() => {

    return categories.find(category => category.label === listing.category);
  }, [listing.category])

  return (
    <Container>
      <section className="max-w-screen-lg mx-auto" >
        <article className="flex flex-col gap-6" >
          <ListingHeader
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <article className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6" >
            <ListingDetails 
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </article>
        </article>
      </section>
    </Container>
  )
}

export default ListingView;
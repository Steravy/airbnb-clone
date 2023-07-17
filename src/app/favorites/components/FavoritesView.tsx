'use client';

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { ModifiedListing, ModifiedUser } from "@/app/types";

interface FavoritesViewProps {
    listings: ModifiedListing[];
    currentUser?: ModifiedUser | null;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({ listings, currentUser }) => {

    return (
        <Container>
            <Heading title="Favorites" subtitle="Your favorites places!" />
            <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8' >
                {
                    listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            currentUser={currentUser}
                        />
                    ))
                }
            </section>
        </Container>
    )
}

export default FavoritesView;
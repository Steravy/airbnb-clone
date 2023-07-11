import ClientWrapper from "./components/ClientWrapper";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { ModifiedListing } from "./types";
import getCurrentUser from "./utils/getCurrentUser";
import getListings from "./utils/getListings";


export default async function Home() {

  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length == 0) {
    return (
      <ClientWrapper>
        <EmptyState showResetButton />
      </ClientWrapper>
    )
  }

  return (
    <ClientWrapper>
      <Container>
        <section className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8' >
          {
            listings.map((listing: ModifiedListing) => {
              return (
                <ListingCard
                  key={listing.id}
                  currentUser={currentUser}
                  data={listing}
                />
              )
            })
          }
        </section>
      </Container>
    </ClientWrapper>
  )
}

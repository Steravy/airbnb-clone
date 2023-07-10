import ClientWrapper from "./components/ClientWrapper";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings from "./utils/getListings";


export default async function Home() {

  const listings = await getListings();
  const isEmpty = true;

  if (isEmpty) {
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
          Future listings
        </section>
      </Container>
    </ClientWrapper>
  )
}

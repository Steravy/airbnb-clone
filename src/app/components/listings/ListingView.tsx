'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import { categories } from "@/app/lib/categoryItemsProvider";
import { ModifiedListing, ModifiedReservation, ModifiedUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import Container from "../Container";
import ListingDetails from "./ListingDetails";
import ListingHeader from "./ListingHeader";
import ListingReservation from "./ListingReservation";

interface ListingViewProps {
  currentUser?: ModifiedUser | null;
  reservations?: ModifiedReservation[];
  listing: ModifiedListing & {
    user: ModifiedUser
  };
}


const defaultDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}


const ListingView: React.FC<ListingViewProps> = ({ listing, currentUser, reservations: reservations = [] }) => {

  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(defaultDateRange);

  const dateDisabler = useMemo(() => {

    let dates: Date[] = [];

    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range];
    })

    return dates;

  }, [reservations]);

  const handleCreateReservation = useCallback(() => {

    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Reservation created!')
        setDateRange(defaultDateRange);
        // redirect to trips page
        router.push('/trips');
      })
      .catch((error) => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      })

  }, [totalPrice, dateRange, currentUser, listing?.id, loginModal, router]);

  useEffect(() => {

    if (dateRange.startDate && dateRange.endDate) {
      const numOfDays = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      )

      if (numOfDays && listing.price) {
        setTotalPrice(listing.price * numOfDays)
      } else {
        setTotalPrice(listing.price);
      }
    }

  }, [dateRange, listing.price]);

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
            <div className='order-first mb-10 md:order-last md:col-span-3' >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => { setDateRange(value) }}
                dateRange={dateRange}
                onSubmit={handleCreateReservation}
                disabled={isLoading}
                disabledDates={dateDisabler}
              />
            </div>
          </article>
        </article>
      </section>
    </Container>
  )
}

export default ListingView;
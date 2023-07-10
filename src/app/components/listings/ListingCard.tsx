'use client';

import useCountries from "@/app/hooks/useCountries";
import { CustomUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from 'date-fns';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: CustomUser | null
};
const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, onAction, disabled, actionLabel, actionId = '', currentUser }) => {

  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);


  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {

    e.stopPropagation();
    if (disabled) return;

    onAction?.(actionId)
  }, [onAction, actionId, disabled]);

  const price = useMemo(() => {

    if (reservation) return reservation.totalPrice;
    return data.price;
  }, [reservation, data.price]);

  const reservationDates = useMemo(() => {

    if (!reservation) return null;

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`;

  }, [reservation]);

  return (
    <article onClick={() => router.push(`/listings/${data.id}`)} className='col-span-1 cursor-pointer group' >
      <article className="flex flex-col gap-2 w-full" >
        <article className="aspect-square w-full relative overflow-hidden rounded-xl " >
          <Image
            src={data.imageSrc}
            alt={`${data.title} image`}
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3" >
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </article>
        <p className="font-semibold text-medium text-neutral-800" >
          {location?.region},
          <span className="text-neutral-600" >
            {` ${location?.label}`}
          </span>
        </p>
        <span className="font-light text-neutral-500" >{reservationDates || data.category}</span>
        <article className="flex flex-row items-center gap-1" >
          <span className="font-semibold " >
            $ {price}
          </span>
          {
            !reservation && (<span className="text-neutral-500" >/night</span>)
          }
        </article>
        {
          actionLabel && onAction && (
            <Button
              label={actionLabel}
              small
              disabled
              onClick={handleCancel}

            />
          )
        }
      </article>
    </article>
  )
}

export default ListingCard
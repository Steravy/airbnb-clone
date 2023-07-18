'use client'

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {

    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    const locationLabel = useMemo(() => {
        if (locationValue) return getByValue(locationValue as string)?.label;

        return 'Anywhere';
    }, [locationValue, getByValue]);

    const durationLabel = useMemo(() => {

        if (startDate && endDate) {

            const start = new Date(startDate as string);
            const end = new Date(endDate as string);

            let totalDays = differenceInDays(end, start);

            if (totalDays === 0) totalDays = 1

            return `${totalDays} days`;
        }

        return `Any week`;
    }, [startDate, endDate]);

    const guestLabel = useMemo(() => {

        if (guestCount) return`${guestCount} guests`;

        return `How many guests`;
    }, [guestCount])

    return (
        <article onClick={searchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer" >
            <article className="flex flex-row justify-between items-center" >
                <article className="text-sm font-semibold px-6" >
                    {locationLabel}
                </article>
                <article className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center" >
                    {durationLabel}
                </article>
                <article className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3" >
                    <article className="hidden md:block" >
                        {guestLabel}
                    </article>
                    <article className="p-2 bg-rose-500 rounded-full text-white" >
                        <BiSearch size={18} />
                    </article>
                </article>
            </article>
        </article>
    )
}

export default Search;
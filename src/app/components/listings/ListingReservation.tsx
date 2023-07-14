'use client';

import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}


const ListingReservation: React.FC<ListingReservationProps> = ({ price, totalPrice, onChangeDate, dateRange, onSubmit, disabled, disabledDates }) => {

    return (

        <article className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden' >
            <article className='flex flex-row items-center gap-1 p-4' >
                <span className='text-2xl font-semibold' >$ {price}</span>
                <span className='text-neutral-600 font-light' >/night</span>
            </article>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
        </article>

    )
}

export default ListingReservation;
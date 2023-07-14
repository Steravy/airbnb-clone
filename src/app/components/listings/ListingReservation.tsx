'use client';

import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

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
            <hr />
            <article className="p-4" >
                <Button
                    label="Reserve"
                    disabled={disabled}
                    onClick={onSubmit}

                />
            </article>
            <article className="p-4 flex flex-row items-center justify-between font-semibold text-lg" >
                <span >Total:</span>
                <span >$ {totalPrice}</span>
            </article>
        </article>

    )
}

export default ListingReservation;
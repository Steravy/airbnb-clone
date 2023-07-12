'use client';

import useCountries from "@/app/hooks/useCountries";
import { ModifiedUser } from "@/app/types";
import { IconType } from "react-icons";
import UserAvatar from "../UserAvatar";
import ListingCategory from "./ListingCategory";

interface ListingDetailsProps {
    user: ModifiedUser;
    category: {
        icon: IconType,
        label: string,
        description: string
    } | undefined
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ user, category, description, roomCount, guestCount, bathroomCount, locationValue }) => {

    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;


    return (
        <article className="col-span-4 flex flex-col gap-8" >
            <div className="text-xl font-semibold flex flex-row items-center gap-2" >
                <p>Hosted by {user.name}</p>
                <UserAvatar src={user?.image} />
            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500" >
                <span>{guestCount} gests</span>
                <span>{roomCount} rooms</span>
                <span>{bathroomCount} bathrooms</span>
            </div>
            <hr />
            {
                category && (
                    <ListingCategory
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                    />
                )
            }
            <hr />
            <p className="text-lg font-light text-neutral-500" >
                {description}
            </p>
        </article>
    )
}

export default ListingDetails;
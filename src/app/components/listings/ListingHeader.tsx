'use client'

import useCountries from "@/app/hooks/useCountries";
import { ModifiedUser } from "@/app/types";
import { Fragment } from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";


interface ListingHeaderProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser: ModifiedUser | null | undefined;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({ title, imageSrc, locationValue, id, currentUser }) => {

    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <Fragment>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <section className="w-full h-[60vh] overflow-hidden rounded-xl relative" >
                <Image
                    src={imageSrc}
                    alt={`${title} image`}
                    fill
                    className="object-cover w-full"
                />
                <article className="absolute top-5 right-5" >
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </article>
            </section>
        </Fragment>
    )
}

export default ListingHeader;
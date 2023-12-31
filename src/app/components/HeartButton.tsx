'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ModifiedUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: ModifiedUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {

    const { isFavorite, toggleFavorite } = useFavorite({ listingId, currentUser });

    return (
        <div onClick={toggleFavorite} className="relative hover:opacity-75 transition cursor-pointer">
            {/* {
                isFavovite ?
                    (
                        <AiOutlineHeart
                            size={28}
                            className="fill-white absolute -top-[2px] -right-[2px]"
                        />
                    ) :
                    (
                        <AiFillHeart size={24} className="fill-rose-500" />
                    )
            } */}
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart size={24} className={isFavorite ? "fill-rose-500" : "fill-neutral-400/70"} />
        </div>
    )
}

export default HeartButton;
'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CustomUser } from "../types";

interface HeartButtonProps {
    listingId: string;
    currentUser?: CustomUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {

    const isFavovite = true;
    const handleSetFavirite = () => { };

    return (
        <div onClick={handleSetFavirite} className="relative hover:opacity-75 transition cursor-pointer">
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
            <AiFillHeart size={24} className={isFavovite ? "fill-rose-500" : "fill-neutral-400/70"} />
        </div>
    )
}

export default HeartButton;
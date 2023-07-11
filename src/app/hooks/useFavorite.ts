import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { CustomUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: CustomUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const isFavorite = useMemo(() => {

        const favorites = currentUser?.favoriteIds || [];

        return favorites.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {

        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            let operaction;

            if (isFavorite) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
                operaction = 'delete';
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success(`${operaction === 'delete' ? 'Removed from favorites!' : 'Added to favorites!'}`);
        } catch (error) {
            toast.error('Something went wrong.');
        }
    },
        [
            currentUser,
            isFavorite,
            listingId,
            loginModal,
            router
        ]);

    return {
        isFavorite: isFavorite,
        toggleFavorite,
    }
}

export default useFavorite;
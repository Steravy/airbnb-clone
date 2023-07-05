'use client'

import Image from "next/image";

interface UserAvatarProps {
    src: string | null | undefined;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src }) => {
    return (
        <Image
            src={src || "/images/placeholder.jpg"}
            alt="User Avatar"
            width={30}
            height={30}
            className="rounded-full"
        />
    )
}

export default UserAvatar;
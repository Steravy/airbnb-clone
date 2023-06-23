'use client'

import Image from "next/image";

const UserAvatar = () => {
    return (
        <Image
            src="/images/placeholder.jpg"
            alt="User Avatar"
            width={30}
            height={30}
            className="rounded-full"
        />
    )
}

export default UserAvatar;
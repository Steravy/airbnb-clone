'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";


const Logo = () => {

    const router = useRouter();
    const redirect = () => {
        router.push('/');
    }

    return (
        <Image
            onClick={redirect}
            src="/images/logo.png"
            alt="Airbnb Logo"
            width='100'
            height='100'
            priority={true}
            className="hidden md:block cursor-pointer"
        />
    )
}

export default Logo
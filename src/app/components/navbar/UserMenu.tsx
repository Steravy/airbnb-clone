'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import UserAvatar from '../UserAvatar';
import { Fragment, useCallback, useState } from 'react';
import MenuItem from './MenuItem';

const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => {
        setIsOpen(isOpen => !isOpen);
    }, []);

    return (
        <article className="relative">
            <article className="flex flex-row items-center gap-3" >
                <article
                    onClick={() => { }}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Airbnb your home
                </article>
                <article
                    onClick={toggle}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <article className="hidden md:block">
                        <UserAvatar />
                    </article>
                </article>
            </article>
            {
                isOpen &&
                <article className="absolute right-0 top-12 text-sm rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden " >
                    <article className="flex flex-col cursor-pointer" >
                        <Fragment>
                            <MenuItem label="LogIn" onClick={() => { }} />
                            <MenuItem label="Sign Up" onClick={() => { }} />
                        </Fragment>
                    </article>
                </article>
            }
        </article >
    )
}

export default UserMenu;
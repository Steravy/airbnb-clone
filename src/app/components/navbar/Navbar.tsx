'use client';

import { CustomUser } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {

    currentUser?: CustomUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {


    return (
        <header className="fixed w-full z-10 bg-white shadow-sm ">
            <nav className="py-4 border-b-[1px]">
                <Container>
                    <article className="flex flex-row justify-between items-center gap-3 md:gap-0" >
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </article>
                </Container>
            </nav>
            <Categories/>
        </header>
    )
}

export default Navbar;
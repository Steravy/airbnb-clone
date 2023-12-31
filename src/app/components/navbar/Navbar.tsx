'use client';

import { ModifiedUser } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

interface NavbarProps {

    currentUser?: ModifiedUser | null;
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
            <Categories />
        </header>
    )
}

export default Navbar;
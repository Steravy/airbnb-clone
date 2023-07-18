'use client';

import { PuffLoader } from "react-spinners";

const Loader = () => {
    return (
        <section className="flex flex-col justify-center items-center h-[70vh]" >
            <PuffLoader size={100} color="red" />
        </section>
    )
}

export default Loader
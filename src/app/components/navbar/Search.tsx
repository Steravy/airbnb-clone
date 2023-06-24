'use client'

import { BiSearch } from 'react-icons/bi';

const Search = () => {
    return (
        <article className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer" >
            <article className="flex flex-row justify-between items-center" >
                <article className="text-sm font-semibold px-6" >
                    Search
                </article>
                <article className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center" >
                    Find
                </article>
                <article className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3" >
                    <article className="hidden md:block" >
                        Add guests
                    </article>
                    <article className="p-2 bg-rose-500 rounded-full text-white" >
                        <BiSearch size={18} />
                    </article>
                </article>
            </article>
        </article>
    )
}

export default Search;
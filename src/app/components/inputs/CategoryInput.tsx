'use client';

import { IconType } from "react-icons";

interface CategoryInputProps {
    onClick: (value: string) => void;
    selected: boolean;
    label: string;
    icon: IconType

}

const CategoryInput: React.FC<CategoryInputProps> = ({ onClick, selected, label, icon: Icon }) => {
    return (
        <article onClick={() => onClick(label)} className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition ${selected ? "border-black" : "border-neutral-200"}`} >
            <Icon size={25} />
            <span className='font-semibold'>
                {label}
            </span>
        </article>
    )
}

export default CategoryInput
'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ title, subtitle, value, onChange }) => {

    const handleAdd = useCallback(() => {
        onChange(value + 1);
    }, [value, onChange]);

    const handleReduce = useCallback(() => {
        if (value === 1) return;

        onChange(value - 1);
    }, [value, onChange]);

    return (
        <article className='flex flex-row items-center justify-between' >
            <article className='flex flex-col' >
                <p className="font-medium" >{title}</p>
                <p className="font-light text-gray-600" >{subtitle}</p>
            </article>
            <article className='flex flex-row items-center gap-4' >
                <div onClick={handleReduce} className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition" >
                    <AiOutlineMinus />
                </div>
                <span className="font-light text-xl text-neutral-600" >{value}</span>
                <div onClick={handleAdd} className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition" >
                    <AiOutlinePlus />
                </div>
            </article>
        </article>
    )
}

export default Counter;
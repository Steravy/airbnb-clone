'use client';

interface HeadingProps {
    title: string,
    subtitle?: string,
    center?: boolean,
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
    return (
        <article className={center ? "text-center" : "text-start"} >
            <article className="text-2xl font-bold" >
                {title}
            </article>
            <article className="font-light text-neutral-500 mt-2" >
                {subtitle}
            </article>
        </article>
    )
}

export default Heading
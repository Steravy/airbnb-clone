"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showResetButton?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title = 'No matches for your search', subtitle = 'Try changing the filters by adding or removing keywords', showResetButton }) => {

    const router = useRouter();

    return (
        <section className='h-[60vh] flex flex-col gap-2 items-center justify-center' >
            <Heading
                title={title}
                subtitle={subtitle}
                center
            />
            <article className='w-48 mt-4' >
                {
                    showResetButton && (
                        <Button
                            outline
                            label='Reset filters'
                            onClick={() => router.push('/')}
                        />
                    )
                }
            </article>
        </section>
    )
}

export default EmptyState;
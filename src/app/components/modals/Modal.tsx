'use client';

import { Fragment, useCallback, useEffect, useState } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    secondaryAction?: () => void;
    disabled?: boolean;
    secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, secondaryAction, disabled, secondaryLabel }: ModalProps) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {

        if (disabled) {
            return;
        }

        setShowModal(false);

        setTimeout(() => {
            onClose();
        }, 300);

    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {

        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();

    }, [disabled, secondaryAction]);


    if (!isOpen) {
        return null;
    }

    return (

        <Fragment>
            <section className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70" >
                <article className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto " >
                    <article className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`} >

                    </article>
                </article>
            </section>
        </Fragment>
    )
}

export default Modal;
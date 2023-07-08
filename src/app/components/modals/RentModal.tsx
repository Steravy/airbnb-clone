'use client';
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "@/app/lib/categoryItemsProvider";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelector from "../inputs/CountrySelector";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import Modal from "./Modal";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}


const RentModal = () => {

    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category');
    const location = watch('location');


    const setValueExtended = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep(step => step - 1);
    }

    const onNext = () => {
        setStep(step => step + 1);
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) return 'Create';
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) return undefined;
        return 'Back'
    }, [step])

    let bodyContent = (
        <section className={`flex flex-col gap-8`} >
            <Heading
                title="Which of these best describes your property?"
                subtitle="Pick a category"
            />
            <article className={`grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto`} >
                {
                    categories.map(item => (
                        <article key={item.label} className="col-span-1" >
                            <CategoryInput
                                onClick={(category) => { setValueExtended('category', category) }}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </article>
                    ))
                }
            </article>

        </section>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <section className={`flex flex-col gap-8`} >
                <Heading
                    title="Where is your property located?"
                    subtitle="Help guests find your place"
                />
                <CountrySelector
                    value={location}
                    onChange={(value) => setValueExtended('location', value)}
                />
            </section>
        )
    }

    return (
        <Modal
            title="Airbnb your home!"
            // disabled={isLoading}
            isOpen={rentModal.isOpen}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        // footer={footerContent}
        />
    )
}

export default RentModal;
'use client';
import { categories } from "@/app/lib/categoryItemsProvider";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import CountrySelector from "../inputs/CountrySelector";
import ImageUploader from "../inputs/ImageUploader";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
// import Map from "../Map";


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
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

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
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');


    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const setValueExtended = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const resetStep = () => setStep(STEPS.CATEGORY);

    const handleBack = () => {
        setStep(step => step - 1);
    }

    const handleNext = () => {
        setStep(step => step + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) return handleNext();

        setIsLoading(true);

        axios
            .post('/api/listings', data)
            .then(() => {
                toast.success('Listing Created!')
                router.refresh();
                reset();
                resetStep();
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong! Please try again later!')
            })
            .finally(() => {
                setIsLoading(false)
            })
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
                <Map center={location?.latlng} />
            </section>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <section className={`flex flex-col gap-8`} >
                <Heading
                    title="Share some basics information about your property"
                    subtitle="What amenities do you have?"
                />
                <Counter
                    title='Guests'
                    subtitle='How many guests do you allow?'
                    value={guestCount}
                    onChange={(value) => setValueExtended('guestCount', value)}
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms do you have?'
                    value={roomCount}
                    onChange={(value) => setValueExtended('roomCount', value)}
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you have?'
                    value={bathroomCount}
                    onChange={(value) => setValueExtended('bathroomCount', value)}
                />
            </section>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <section className={`flex flex-col gap-8`} >
                <Heading
                    title='Add photos of your place'
                    subtitle='Show guests how your place look like!'
                />
                <ImageUploader
                    value={imageSrc}
                    onChange={(value) => setValueExtended('imageSrc', value)}
                />
            </section>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <section className={`flex flex-col gap-8`} >
                <Heading
                    title='How would you describe your place?'
                    subtitle='Short ones work best!'
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </section>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <section className={`flex flex-col gap-8`} >
                <Heading
                    title='Now, set your price'
                    subtitle='How much do you charge per night?'
                />
                <Input
                    id="price"
                    formatPrice
                    type="number"
                    label="Price"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </section>
        )
    }

    return (
        <Modal
            title="Airbnb your home!"
            disabled={isLoading}
            isOpen={rentModal.isOpen}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
            body={bodyContent}
        // footer={footerContent}
        />
    )
}

export default RentModal;
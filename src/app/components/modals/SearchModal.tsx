'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountrySelectorValue } from "../inputs/CountrySelector";
import qs from "query-string";
import { formatISO } from "date-fns";
import CountrySelector from "../inputs/CountrySelector";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

const enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {

    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectorValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestsCount, setGuestsCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const onLastStep = useCallback(() => step === STEPS.INFO, [step]);
    const onFirstStep = useCallback(() => step === STEPS.LOCATION, [step]);

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const handleBack = useCallback(() => {
        setStep(step => step - 1);
    }, []);

    const handleNext = useCallback(() => {
        setStep(step => step + 1);
    }, [])

    const handleSubmit = useCallback(async () => {

        if (!onLastStep()) return handleNext();

        let query = {};
        if (params) {
            query = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...query,
            location: location?.value,
            guestsCount: guestsCount,
            roomCount: roomCount,
            bathroomCount: bathroomCount,
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery
            },
            {
                skipNull: true
            }
        )

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [onLastStep, location, guestsCount, roomCount, bathroomCount, dateRange, params, router, searchModal, handleNext,]);

    const actionLabel = useMemo(() => {
        if (onLastStep()) {
            return 'Search';
        }
        return 'Next';
    }, [onLastStep]);

    const secondaryActionLabel = useMemo(() => {
        if (onFirstStep()) {
            return undefined;
        }
        return 'Back';
    }, [onFirstStep]);

    let body = (
        <section className="flex flex-col gap-8" >
            <Heading title="Choose you destination" subtitle="You next home is waiting for you!" />
            <CountrySelector value={location} onChange={(value) => setLocation(value as CountrySelectorValue)} />
            <hr />
            <Map center={location?.latlng} />
        </section>
    )

    if (step === STEPS.DATE) {
        body = (
            <section className="flex flex-col gap-8" >
                <Heading title="Choose your dates" subtitle="There will always be a place for you to enjoy on your special date!" />
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
            </section>
        )
    }

    if (step === STEPS.INFO) {
        body = (
            <section className="flex flex-col gap-8">
                <Heading title="Share your preferences" subtitle="Let us know what you are looking for" />
                <Counter title="Guests" subtitle="How many guests do you have?" value={guestsCount} onChange={(value) => setGuestsCount(value)} />
                <Counter title="Rooms" subtitle="How many rooms do you need?" value={roomCount} onChange={(value) => setRoomCount(value)} />
                <Counter title="Bathrooms" subtitle="How many bathrooms do you need?" value={bathroomCount} onChange={(value) => setBathroomCount(value)} />
            </section>
        )
    }

    return (
        <Modal
            title="Home finder"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={onFirstStep() ? undefined : handleBack}
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={handleSubmit}
            body={body}
        />
    )
}

export default SearchModal
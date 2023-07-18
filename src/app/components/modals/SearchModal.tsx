'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountrySelectorValue } from "../inputs/CountrySelector";

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
    const isLastStep = useCallback(() => step === STEPS.INFO, [step]);

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

        if (!)
    }, [])

    return (
        <Modal
            title="Find your next home"
            actionLabel="Search"
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={searchModal.onOpen}
        />
    )
}

export default SearchModal
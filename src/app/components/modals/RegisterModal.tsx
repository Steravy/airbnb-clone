'use client'

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRgisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";


const RegisterModal = () => {

    const useRegisterModal = useRgisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post('/api/register', data)
            .then(() => {
                useRegisterModal.onClose();
            })
            .catch((errors) => {
                toast.error(errors.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <section className="flex flex-col gap-4" >
            <Heading title="Wellcome to Airbnb" subtitle="Create an account" />
            <Input id='email' label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
        </section>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={useRegisterModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={useRegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}

export default RegisterModal;
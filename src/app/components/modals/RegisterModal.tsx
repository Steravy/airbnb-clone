'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";


const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
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
                toast.success('Account created!')
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((errors) => {
                toast.error(errors.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const toglleModals = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <section className="flex flex-col gap-4" >
            <Heading title="Wellcome to Airbnb" subtitle="Create an account" />
            <Input id='email' label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
        </section>
    )

    const footerContent = (
        <section className="flex flex-col gap-4 mt-3" >
            <hr />
            <Button
                label="Continue with Google"
                outline
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />

            <Button
                label="Continue with Github"
                outline
                icon={AiFillGithub}
                onClick={(e) => signIn('github')}
            />

            <article className="text-neutral-500 text-center mt-4 font-light" >
                <article className="flex flex-row items-center justify-center gap-2" >
                    <span>Already have an account?</span>
                    <span onClick={toglleModals} className="text-neutral-800 cursor-pointer hover:underline hover:text-neutral-500">Log in</span>
                </article>
            </article>

        </section>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;
'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";


const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data, redirect: false,
        })
            .then((callback) => {
                setIsLoading(false);
                if (callback?.ok) {
                    toast.success("Login successful!");
                    router.refresh();
                    loginModal.onClose();
                }
                if (callback?.error) {
                    toast.error(callback?.error);
                }
            })
    }

    const bodyContent = (
        <section className="flex flex-col gap-4" >
            <Heading title="Wellcome back!" subtitle="Login to your account!" />
            <Input id='email' label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
        </section>
    )

    const footerContent = (
        <section className="flex flex-col gap-4 mt-3" >
            <hr />
            <Button
                label="Continue with Coogle"
                outline
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />

            <Button
                label="Continue with Github"
                outline
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />

            <article className="text-neutral-500 text-center mt-4 font-light" >
                <article className="flex flex-row items-center justify-center gap-2" >
                    <span>Already have an account?</span>
                    <span onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline hover:text-neutral-500">Log in</span>
                </article>
            </article>

        </section>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;
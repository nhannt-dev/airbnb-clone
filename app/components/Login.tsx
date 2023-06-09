'use client'

import React, { useCallback, useState } from 'react'
import icons from '../utils/icons'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRegister, useLogin } from '../hooks'
import { Modal, Heading, Input, Button } from './'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const { AiFillGithub, FcGoogle } = icons

const Login = () => {
    const router = useRouter()
    const registerModal = useRegister()
    const loginModal = useLogin()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', { ...data, redirect: false }).then((callback) => {
            setIsLoading(false)
            if (callback?.ok) {
                toast.success('Loggin Success!')
                router.refresh()
                loginModal.onClose()
            }
            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    const onToggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back' subtitle='Login to your account!' center />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' type='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>You don't have account?</div>
                    <div onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline'>Sign up</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Sign in' actionLabel='Continue' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    )
}

export default Login
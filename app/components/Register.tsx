'use client'

import React, { useCallback, useState } from 'react'
import axios from 'axios'
import icons from '../utils/icons'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRegister, useLogin } from '../hooks'
import { Modal, Heading, Input, Button } from './'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

const { AiFillGithub, FcGoogle } = icons

const Register = () => {
    const registerModal = useRegister()
    const loginModal = useLogin()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data).then(() => registerModal.onClose()).catch(() => toast.error('Something went wrong!')).finally(() => setIsLoading(false))
    }

    const onToggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subtitle='Create account!' center />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' type='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => {signIn('google')}} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>Already have an account?</div>
                    <div onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline'>Sign in</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Signup' actionLabel='Continue' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    )
}

export default Register
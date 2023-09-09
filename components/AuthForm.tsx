'use client';

import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

type Variant = 'LOGIN' | 'REGISTER';

const registerFormSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required.'
    }),
    email: z.string().min(1, {
        message: 'Email is required.'
    }),
    password: z.string().min(1, {
        message: 'Password is required.'
    })
})

const loginFormSchema = z.object({
    email: z.string().min(1, {
        message: 'Email is required.'
    }),
    password: z.string().min(1, {
        message: 'Password is required.'
    })
})

interface AuthFormProps {
    variant: Variant
}

const AuthForm = (props: AuthFormProps) => {
    const { variant } = props
    const session = useSession();
    const router = useRouter();
    const { toast } = useToast()
    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/')
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            router.push('/register')
        } else {
            router.push('/login')
        }
    }, [router, variant]);

    const myFormSchema = variant === 'LOGIN' ? loginFormSchema : registerFormSchema
    const form = useForm({
        resolver: zodResolver(myFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof myFormSchema>) => {
        if (variant === 'REGISTER') {
            axios.post('/api/register', values)
                .then(() => signIn('credentials', {
                    ...values,
                    redirect: false,
                }))
                .then((callback) => {
                    if (callback?.error) {
                        toast({ title: 'Invalid credentials!' });
                    }
                })
                .catch(() => toast({ title: 'Something went wrong!' }))
                .finally(() => { })
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...values,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast({ title: 'Invalid credentials!' });
                    }
                })
                .finally(() => { })
        }
    }
    const isLoading = form.formState.isSubmitting;

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md transition-all">
            <div
                className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
            >
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {variant === 'REGISTER' && (
                            <FormField control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"> Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder="Enter server name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        )}
                        <FormField control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"> Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder="Enter server name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"> Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder="Enter server name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <div>
                            <Button >
                                {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                            </Button>
                        </div>
                    </form>
                </Form>

                <div
                    className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
                >
                    <div>
                        {variant === 'LOGIN' ? 'New?' : 'Already have an account?'}
                    </div>
                    <Button onClick={toggleVariant} variant='link' >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
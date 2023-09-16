'use client';

import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils"

import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Loader } from "lucide-react";

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

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    variant: Variant,
}

const AuthForm = ({ className, ...props }: AuthFormProps) => {
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
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <FormField control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold">Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading}
                                            className=" focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Jhon" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    )}
                    <FormField control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold "> Email</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading}
                                        className="focus-visible:ring-0  focus-visible:ring-offset-0" placeholder="jhon@xyz.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold "> Password</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading}
                                        className="focus-visible:ring-0  focus-visible:ring-offset-0" placeholder="Enter password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <Button disabled={isLoading} className="w-full">
                        {isLoading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default AuthForm;
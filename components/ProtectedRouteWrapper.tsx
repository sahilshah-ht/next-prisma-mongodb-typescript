"use client"
import { useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";
import { useSession } from 'next-auth/react'
import AuthForm from './AuthForm';

interface ProtectedRouteWrapperProps {
    children: React.ReactNode
}

const ProtectedRouteWrapper = ({
    children,
}: ProtectedRouteWrapperProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { status: sessionStatus } = useSession();
    const authorized = sessionStatus === 'authenticated';
    const unAuthorized = sessionStatus === 'unauthenticated';
    const loading = sessionStatus === 'loading';
    useEffect(() => {
        if (loading || !router) return;

        if (unAuthorized) {
            router.push('/login');
        }
    }, [loading, unAuthorized, sessionStatus, router]);

    if (loading) {
        return <>Loading app...</>;
    }

    return authorized ? <div>{children}</div> : <AuthForm variant={pathname === '/login' ? 'LOGIN' : 'REGISTER'
    } />;
}

export default ProtectedRouteWrapper;
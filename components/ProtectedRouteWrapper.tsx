"use client"
import { useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";
import { useSession } from 'next-auth/react'
import AuthForm from './AuthForm';
import { MainLoader } from './ui/main-loader';

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
            if (pathname === '/register') {
                router.push('/register');
            } else {
                router.push('/login');
            }
        }
    }, [loading, unAuthorized, sessionStatus, router, pathname]);
    if (loading) {
        return <MainLoader />;
    }

    return authorized ? <div>{children}</div> : <AuthForm variant={pathname === '/login' ? 'LOGIN' : 'REGISTER'} />;
}

export default ProtectedRouteWrapper;
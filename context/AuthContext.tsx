"use client";

import { SessionProvider } from "next-auth/react";
import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";


export interface AuthContextProps {
    children: React.ReactNode;
}

export default function AuthContext({
    children
}: AuthContextProps) {
    return (
        <SessionProvider>
            <ProtectedRouteWrapper>
                {children}
            </ProtectedRouteWrapper>
        </SessionProvider>
    );
}
"use client"
import React, { useContext, createContext, useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState, toggleSidebar, useAppDispatch } from "@/store";

interface SidebarContextType {
    isOpen: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
    children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps): JSX.Element {
    const { isOpen } = useSelector((state: RootState) => state.ui.sidebar)
    const dispatch = useAppDispatch();
    return (
        <div className="fixed z-20">
            <aside className="h-screen">
                <nav className="h-full flex flex-col  border-r shadow-sm relative">
                    <SidebarContext.Provider value={{ isOpen }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>
                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className="p-0.5 border bg-background absolute top-1 -right-3.5 rounded-full"
                    >
                        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </nav>
            </aside>
        </div>
    );
}
interface SidebarItemProps {
    icon: JSX.Element;
    text: string;
    active?: boolean;
    alert?: boolean;
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps): JSX.Element {
    const { isOpen } = useContext(SidebarContext) || { isOpen: true };

    return (
        <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
        ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
    `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${isOpen ? "w-40 ml-3" : "w-0"}`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${isOpen ? "" : "top-2"
                        }`}
                />
            )}

            {!isOpen && (
                <div
                    className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                >
                    {text}
                </div>
            )}
        </li>
    );
}

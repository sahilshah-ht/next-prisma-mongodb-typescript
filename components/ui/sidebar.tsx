"use client"
import React, { useContext, createContext, useState, ReactNode } from "react";
import { ChevronLast, ChevronFirst } from "lucide-react";

interface SidebarContextType {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
    children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps): JSX.Element {
    const [expanded, setExpanded] = useState(true);
    return (
        <div className="fixed z-20">
            <aside className="h-screen">
                <nav className="h-full flex flex-col  border-r shadow-sm relative">
                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 absolute top-0 right-0"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
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
    const { expanded } = useContext(SidebarContext) || { expanded: true };

    return (
        <li
            className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
    `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
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

'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface NavItem {
    label: string
    id: string
}

interface NavbarProps {
    items: NavItem[]
}

export function Sidebar({ items }: NavbarProps) {
    const handleClick = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className="fixed top-0 right-0 h-full bg-white shadow-md z-10 flex flex-col p-4 pt-16">
            <h2 className="text-sm font-bold text-gray-800 mb-4 px-3">On this page:</h2>
            <ul className="flex flex-col space-y-4">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => handleClick(item.id)}
                            className={cn(
                                "text-gray-400 hover:text-gray-800 transition-colors duration-200",
                                "text-sm font-medium",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                                "px-3 py-2 rounded-md w-full text-left"
                            )}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


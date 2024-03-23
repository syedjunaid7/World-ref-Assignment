'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import React, { useState } from 'react';

const NAVBAR_ITEMS: any = [];

const Navbar: React.FC = () => {
    const { user, isLoading } = useUser();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    if (isLoading || !user) {
        return null;
    }

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        {/* Logo or brand name */}
                        <div>
                            <a href="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                <span className="text-white font-bold">Blog App</span>
                            </a>
                        </div>
                        {/* Primary nav */}
                        <div className="hidden md:flex items-center space-x-1">
                        </div>
                    </div>
                    <a className="hidden md:flex py-5 px-3 hover:text-gray-400" href={"/api/auth/logout"}>Logout</a>
                    {/* Mobile button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <a className="block py-2 px-4 text-sm hover:bg-gray-700" href={"/api/auth/logout"}>Logout</a>
            </div>
        </nav>
    );
};

export default Navbar;
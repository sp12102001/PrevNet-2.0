import React from 'react';
import Link from 'next/link';

interface BackButtonProps {
    href: string;
    label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
    href = "/",
    label = "Back to Home"
}) => {
    return (
        <div className="mb-6">
            <Link
                href={href}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors group"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                <span>{label}</span>
            </Link>
        </div>
    );
};

export default BackButton;
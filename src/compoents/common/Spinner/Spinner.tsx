import React from "react";

export default function Spinner({ size = 24 }: { size?: number }) {
    return (
        <svg
            className="animate-spin text-gray-400"
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            aria-label="로딩 중"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle className="opacity-25" cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M30 16a14 14 0 01-14 14V28a12 12 0 0012-12h2z" />
        </svg>
    );
}

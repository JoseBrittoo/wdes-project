import React from "react";

type ButtonProps = {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({
    type = "button",
    children,
    onClick,
}: ButtonProps) {
    return (
        <button
            type={type}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-500 transition-all duration-300 btn-hover flex items-center justify-center gap-2"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function CancelButton({
    type = "button",
    children,
    onClick,
    disabled = false,
}: ButtonProps) {
    return (
        <button
            type={type}
            className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 btn-hover flex items-center justify-center gap-2"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export function InfoButton({
    type = "button",
    children,
    onClick,
    disabled = false,
}: ButtonProps) {
    return (
        <button
            type={type}
            className="w-full bg-blue-100 text-blue-800 py-2 px-4 rounded-lg font-semibold hover:bg-blue-200 transition-all duration-300 btn-hover flex items-center justify-center gap-2"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
import React from "react";

type ButtonProps = {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
};

export default function Button({ type = "button", children }: ButtonProps) {
    return (
        <button
            type={type}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-500 transition-all duration-300 btn-hover flex items-center justify-center gap-2"
        >
            {children}
        </button>
    );
}

import React from "react";

interface SourceIconProps {
  type: string;
  className?: string;
}

export function SourceIcon({ type, className = "w-4 h-4" }: SourceIconProps) {
  switch (type) {
    case "facebook":
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-[#1877F2] text-white shrink-0 ${className}`}
          title="Facebook"
        >
          <svg className="w-[60%] h-[60%] fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </span>
      );

    case "pinterest":
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-[#E60023] text-white shrink-0 ${className}`}
          title="Pinterest"
        >
          <svg className="w-[65%] h-[65%] fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.057.242-.191.294-.44.178-1.642-.764-2.671-3.16-2.671-5.086 0-4.144 3.013-7.95 8.694-7.95 4.611 0 8.194 3.286 8.194 7.677 0 4.582-2.89 8.271-6.901 8.271-1.347 0-2.614-.7-3.048-1.528 0 0-.667 2.539-.829 3.16-.3 1.157-1.111 2.607-1.654 3.491C9.64 23.86 10.799 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
          </svg>
        </span>
      );

    case "instagram":
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shrink-0 ${className}`}
          title="Instagram"
        >
          <svg className="w-[60%] h-[60%] fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </span>
      );

    case "overflow":
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-[#0077b6] text-white shrink-0 ${className}`}
          title="Overflow Emprende"
        >
          <svg className="w-[60%] h-[60%] fill-current" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 9H7v-2h10v2zm-4 4H7v-2h6v2zm4-8H7V5h10v2z" />
          </svg>
        </span>
      );

    case "koamor":
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold shrink-0 text-[10px] leading-none ${className}`}
          title="Koamor Tienda Online"
        >
          U
        </span>
      );

    case "vizzano":
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-bold shrink-0 text-[10px] leading-none ${className}`}
          title="Vizzano Oficial"
        >
          V
        </span>
      );

    case "mall":
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-emerald-600 text-white shrink-0 ${className}`}
          title="Mall Retail"
        >
          <svg className="w-[60%] h-[60%] fill-current" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-neutral-700 text-white shrink-0 ${className}`}
        >
          <svg className="w-[55%] h-[55%] fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </span>
      );
  }
}

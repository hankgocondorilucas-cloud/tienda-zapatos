"use client";

import React from "react";
import {
  Search,
  X,
  Bell,
  MessageCircle,
  ShoppingCart,
  Bookmark,
  Sun,
  Moon,
} from "lucide-react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  savedCount: number;
  onViewSaved: () => void;
  showingSavedOnly: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Navbar({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  savedCount,
  onViewSaved,
  showingSavedOnly,
  isDarkMode,
  onToggleTheme,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0f0f11]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 transition-colors">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              onSearchChange("");
              if (showingSavedOnly) onViewSaved();
            }}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#E60023] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              {/* Stylized P/Shoe icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.63 7.87 6.36 9.32-.09-.79-.17-2.01.04-2.87.18-.78 1.17-4.97 1.17-4.97s-.3-.6-.3-1.49c0-1.39.81-2.43 1.81-2.43.85 0 1.26.64 1.26 1.41 0 .86-.55 2.14-.83 3.33-.24.99.5 1.81 1.48 1.81 1.78 0 3.14-1.87 3.14-4.58 0-2.39-1.72-4.07-4.18-4.07-2.85 0-4.52 2.13-4.52 4.34 0 .86.33 1.78.74 2.28.08.1.09.19.07.29-.08.31-.24 1-.28 1.13-.05.2-.16.24-.37.15-1.37-.64-2.23-2.63-2.23-4.24 0-3.45 2.51-6.62 7.25-6.62 3.84 0 6.83 2.74 6.83 6.4 0 3.82-2.41 6.89-5.75 6.89-1.12 0-2.18-.58-2.54-1.27 0 0-.56 2.12-.69 2.63-.25.96-.93 2.17-1.38 2.91C9.7 21.88 10.83 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
            </div>
            <span className="hidden md:inline font-bold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-white">
              Zapatos<span className="text-[#E60023]">Pin</span>
            </span>
          </button>

          {/* Navigation links (Pinterest style) */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            <button
              onClick={() => {
                if (showingSavedOnly) onViewSaved();
              }}
              className={`px-4 py-2.5 rounded-full text-sm font-bold transition ${
                !showingSavedOnly
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={onViewSaved}
              className={`px-4 py-2.5 rounded-full text-sm font-bold transition flex items-center gap-1.5 ${
                showingSavedOnly
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              <span>Guardados</span>
              {savedCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#E60023] text-white">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-2xl mx-1 sm:mx-4">
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 pointer-events-none text-neutral-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar zapatos, Jordan, tiendas, tacones, ideas..."
              className="w-full h-11 sm:h-12 pl-11 pr-10 rounded-full bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 text-sm font-normal border border-transparent focus:border-neutral-300 dark:focus:border-neutral-600 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3.5 p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Saved pins button on mobile */}
          <button
            onClick={onViewSaved}
            className={`lg:hidden p-2.5 rounded-full relative transition ${
              showingSavedOnly
                ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
            title="Guardados"
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E60023] text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            title={isDarkMode ? "Modo claro" : "Modo oscuro"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button
            className="hidden sm:flex p-2.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition relative"
            title="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E60023]"></span>
          </button>

          {/* Messages */}
          <button
            className="hidden md:flex p-2.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            title="Mensajes"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Cart button */}
          <button
            onClick={onOpenCart}
            className="p-2.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition relative"
            title="Carrito de compras"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E60023] text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile avatar */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden ml-1 ring-2 ring-neutral-200 dark:ring-neutral-700 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Perfil"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

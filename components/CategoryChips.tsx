"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORY_CHIPS, CategoryChip } from "@/data/shoeData";

interface CategoryChipsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryChips({
  selectedCategory,
  onSelectCategory,
}: CategoryChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full border-b border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-[#0f0f11] py-2.5 px-2 sm:px-4 select-none">
      <div className="relative max-w-7xl mx-auto flex items-center">
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Desplazar a la izquierda"
          className="hidden md:flex absolute -left-3 z-10 w-9 h-9 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable list */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full px-2 py-1"
        >
          {CATEGORY_CHIPS.map((chip: CategoryChip) => {
            const isSelected = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => onSelectCategory(chip.id)}
                className={`flex items-center gap-2 sm:gap-2.5 shrink-0 pl-1.5 pr-4 py-1 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-sm dark:bg-white dark:text-neutral-900 dark:border-white"
                    : "bg-white dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 shadow-xs"
                }`}
              >
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden shrink-0 bg-neutral-200">
                  <Image
                    src={chip.image}
                    alt={chip.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-[13px] sm:text-sm font-semibold tracking-tight whitespace-nowrap">
                  {chip.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Desplazar a la derecha"
          className="hidden md:flex absolute -right-3 z-10 w-9 h-9 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { ShoePin } from "@/data/shoeData";
import { ShoeCard } from "./ShoeCard";

interface ShoeMasonryProps {
  pins: ShoePin[];
  onPinClick: (pin: ShoePin) => void;
  onAddToCart: (pin: ShoePin) => void;
  savedPinIds: string[];
  onToggleSave: (pinId: string) => void;
}

export function ShoeMasonry({
  pins,
  onPinClick,
  onAddToCart,
  savedPinIds,
  onToggleSave,
}: ShoeMasonryProps) {
  if (pins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-3xl mb-3">
          👟
        </div>
        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
          No se encontraron zapatos o tiendas
        </h3>
        <p className="text-sm text-neutral-500 mt-1 max-w-sm">
          Intenta cambiar de categoría o buscar con otras palabras clave como "Jordan", "Tacones", "Tenis" o "Interior".
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
      {/* Masonry Columns matching Pinterest layout */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3.5 sm:gap-4 md:gap-5 [column-fill:_balance]">
        {pins.map((pin) => (
          <ShoeCard
            key={pin.id}
            pin={pin}
            onPinClick={onPinClick}
            onAddToCart={onAddToCart}
            isSaved={savedPinIds.includes(pin.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </div>
  );
}

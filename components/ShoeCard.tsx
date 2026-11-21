"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Share2, Tag, ShoppingBag, ExternalLink, Bookmark } from "lucide-react";
import { ShoePin } from "@/data/shoeData";
import { SourceIcon } from "./SourceIcon";

interface ShoeCardProps {
  pin: ShoePin;
  onPinClick: (pin: ShoePin) => void;
  onAddToCart: (pin: ShoePin) => void;
  isSaved?: boolean;
  onToggleSave?: (pinId: string) => void;
}

export function ShoeCard({
  pin,
  onPinClick,
  onAddToCart,
  isSaved = false,
  onToggleSave,
}: ShoeCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(pin.likes);
  const [saved, setSaved] = useState(isSaved);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = !saved;
    setSaved(newSaved);
    if (onToggleSave) {
      onToggleSave(pin.id);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(pin);
  };

  return (
    <div className="group break-inside-avoid-column mb-5 transition-all duration-300">
      {/* Image container */}
      <div
        onClick={() => onPinClick(pin)}
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800 transition duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
      >
        <div className={`relative w-full ${pin.aspectRatio}`}>
          <Image
            src={pin.image}
            alt={pin.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            priority={false}
          />
        </div>

        {/* Optional Tag badge (as seen on the 5th card in reference image) */}
        {pin.hasTag && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-medium shadow-md">
            <Tag className="w-3.5 h-3.5 text-white fill-white" />
            <span>{pin.tagText || "Producto"}</span>
          </div>
        )}

        {/* Hover overlay with Pinterest actions */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex flex-col justify-between p-3.5">
          {/* Top row */}
          <div className="flex justify-between items-start pointer-events-auto">
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-neutral-900 shadow-xs">
              ${pin.price.toFixed(2)}
            </span>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-full font-bold text-xs tracking-wide transition-all transform active:scale-95 shadow-md flex items-center gap-1.5 ${
                saved
                  ? "bg-neutral-900 text-white"
                  : "bg-[#E60023] hover:bg-[#b8001c] text-white"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-white" : ""}`} />
              <span>{saved ? "Guardado" : "Guardar"}</span>
            </button>
          </div>

          {/* Bottom row actions */}
          <div className="flex items-center justify-between pointer-events-auto">
            <button
              onClick={handleQuickAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-900 text-xs font-semibold shadow-md transition transform active:scale-95"
              title="Añadir al carrito"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Comprar</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full backdrop-blur-xs shadow-md transition transform active:scale-95 ${
                  isLiked
                    ? "bg-red-50 text-red-500 fill-red-500"
                    : "bg-white/90 hover:bg-white text-neutral-800"
                }`}
                title="Me gusta"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (navigator.share) {
                    navigator.share({
                      title: pin.title,
                      text: pin.description,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Enlace copiado al portapapeles");
                  }
                }}
                className="p-2 rounded-full bg-white/90 hover:bg-white text-neutral-800 backdrop-blur-xs shadow-md transition transform active:scale-95"
                title="Compartir"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pin Information Below Image (Exact Pinterest / Image match) */}
      <div className="mt-2 px-1">
        <h3
          onClick={() => onPinClick(pin)}
          className="text-[13px] sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug cursor-pointer hover:underline"
          title={pin.title}
        >
          {pin.title}
        </h3>

        {/* Source row */}
        <div className="mt-1.5 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-1.5 min-w-0">
            <SourceIcon type={pin.source.type} className="w-4 h-4" />
            <span className="truncate font-normal hover:underline cursor-pointer">
              {pin.source.name}
            </span>
          </div>

          <span className="font-semibold text-neutral-900 dark:text-neutral-200 shrink-0 ml-2">
            ${pin.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

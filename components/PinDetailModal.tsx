"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  Share2,
  Bookmark,
  ShoppingCart,
  Star,
  Check,
  Send,
  ExternalLink,
} from "lucide-react";
import { ShoePin } from "@/data/shoeData";
import { SourceIcon } from "./SourceIcon";

interface PinDetailModalProps {
  pin: ShoePin | null;
  onClose: () => void;
  onAddToCart: (pin: ShoePin, size: number) => void;
  isSaved: boolean;
  onToggleSave: (pinId: string) => void;
}

export function PinDetailModal({
  pin,
  onClose,
  onAddToCart,
  isSaved,
  onToggleSave,
}: PinDetailModalProps) {
  if (!pin) return null;

  const [selectedSize, setSelectedSize] = useState<number>(
    pin.sizes ? pin.sizes[0] : 38
  );
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(pin.likes);
  const [comments, setComments] = useState<
    { id: string; user: string; text: string; time: string; avatar: string }[]
  >([
    {
      id: "1",
      user: "Camila R.",
      text: "¡El diseño de la tienda y la calidad de los zapatos es impresionante! Los pedí en mi talla y calzan perfecto.",
      time: "Hace 2 horas",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      user: "Mateo S.",
      text: "Excelente combinación de estilo urbano y comodidad. La entrega fue súper rápida.",
      time: "Hace 1 día",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        user: "Tú",
        text: newComment.trim(),
        time: "Justo ahora",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
      },
    ]);
    setNewComment("");
  };

  const handleAdd = () => {
    onAddToCart(pin, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#18181b] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row text-neutral-900 dark:text-neutral-100 my-auto"
      >
        {/* Close Button Mobile/Desktop */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-700 shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Pin Image */}
        <div className="relative w-full md:w-1/2 min-h-[350px] md:min-h-[550px] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden">
          <Image
            src={pin.image}
            alt={pin.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Details & Actions */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-[85vh]">
          {/* Top Actions Bar */}
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`p-2.5 rounded-full border transition flex items-center gap-1.5 text-xs font-semibold ${
                    isLiked
                      ? "border-red-200 bg-red-50 text-red-600 dark:bg-red-950/40"
                      : "border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span>{likesCount}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("¡Enlace copiado al portapapeles!");
                  }}
                  className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
                  title="Compartir"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Save Button */}
              <button
                onClick={() => onToggleSave(pin.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all flex items-center gap-2 ${
                  isSaved
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "bg-[#E60023] hover:bg-[#b8001c] text-white"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                <span>{isSaved ? "Guardado" : "Guardar"}</span>
              </button>
            </div>

            {/* Source and Brand info */}
            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <SourceIcon type={pin.source.type} className="w-5 h-5" />
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {pin.source.name}
              </span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5">
                <Check className="w-3.5 h-3.5" /> Verificado
              </span>
            </div>

            {/* Title & Description */}
            <h1 className="mt-2.5 text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
              {pin.title}
            </h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {pin.description}
            </p>

            {/* Price & Rating */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                ${pin.price.toFixed(2)}
              </span>
              {pin.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  ${pin.originalPrice.toFixed(2)}
                </span>
              )}
              <div className="ml-auto flex items-center gap-1 text-amber-500 text-sm font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{pin.rating.toFixed(1)}</span>
                <span className="text-neutral-400 text-xs">
                  ({pin.reviewsCount} opiniones)
                </span>
              </div>
            </div>

            {/* Size Selector */}
            {pin.sizes && pin.sizes.length > 0 && (
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  <span>Seleccionar Talla (EU):</span>
                  <span className="text-neutral-500 font-normal">Guía de tallas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pin.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center border transition ${
                        selectedSize === size
                          ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-xs"
                          : "border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="mt-6">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] ${
                  addedAnimation
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>¡Añadido al Carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Añadir al Carrito - ${pin.price.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Categories tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {pin.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium"
                >
                  #{cat}
                </span>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Comentarios ({comments.length})
            </h4>

            {/* Comment list */}
            <div className="space-y-3 mb-4 max-h-36 overflow-y-auto no-scrollbar">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-2.5 items-start text-xs">
                  <img
                    src={c.avatar}
                    alt={c.user}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">
                        {c.user}
                      </span>
                      <span className="text-neutral-400 text-[10px]">{c.time}</span>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 mt-0.5">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input comment */}
            <form onSubmit={handleAddComment} className="flex gap-2 items-center">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Añade un comentario sobre este modelo..."
                className="flex-1 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="p-2 rounded-full bg-[#E60023] text-white disabled:opacity-40 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

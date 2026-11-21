"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { ShoePin } from "@/data/shoeData";

export interface CartItem {
  pin: ShoePin;
  size: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (pinId: string, size: number, newQty: number) => void;
  onRemoveItem: (pinId: string, size: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.pin.price * item.quantity,
    0
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-white dark:bg-[#18181b] shadow-2xl flex flex-col text-neutral-900 dark:text-neutral-100 animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E60023]" />
            <h3 className="font-bold text-lg">Tu Carrito de Calzado</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500">
              <ShoppingBag className="w-16 h-16 stroke-[1.2] text-neutral-300 dark:text-neutral-750 mb-3" />
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                Tu carrito está vacío
              </p>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Explora los zapatos y calzados en tendencia y añádelos con un clic.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.pin.id}-${item.size}`}
                className="flex gap-3.5 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-200">
                  <Image
                    src={item.pin.image}
                    alt={item.pin.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold line-clamp-1 text-neutral-900 dark:text-neutral-100">
                      {item.pin.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Talla: <span className="font-semibold text-neutral-700 dark:text-neutral-300">{item.size}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
                      ${(item.pin.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-900">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.pin.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-0.5 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.pin.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-0.5 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.pin.id, item.size)}
                        className="p-1 rounded-md text-neutral-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Total */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b]">
            <div className="space-y-2 mb-4 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Envío express</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Gratis
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-sm font-extrabold text-neutral-900 dark:text-white">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#E60023] hover:bg-[#b8001c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.99]"
            >
              <span>Proceder al Pago</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

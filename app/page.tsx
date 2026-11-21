"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { CategoryChips } from "@/components/CategoryChips";
import { ShoeMasonry } from "@/components/ShoeMasonry";
import { PinDetailModal } from "@/components/PinDetailModal";
import { CartDrawer, CartItem } from "@/components/CartDrawer";
import { SHOE_PINS, ShoePin } from "@/data/shoeData";
import { Check, Bookmark, Sparkles, Filter, X } from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPin, setSelectedPin] = useState<ShoePin | null>(null);
  const [savedPinIds, setSavedPinIds] = useState<string[]>(["pin-1", "pin-6"]);
  const [cart, setCart] = useState<CartItem[]>([
    {
      pin: SHOE_PINS[0],
      size: 38,
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showingSavedOnly, setShowingSavedOnly] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle Save / Bookmark
  const handleToggleSave = (pinId: string) => {
    setSavedPinIds((prev) => {
      const isAlreadySaved = prev.includes(pinId);
      if (isAlreadySaved) {
        showToast("Eliminado de tus guardados");
        return prev.filter((id) => id !== pinId);
      } else {
        showToast("¡Guardado en tus tableros!");
        return [...prev, pinId];
      }
    });
  };

  // Add to cart
  const handleAddToCart = (pin: ShoePin, size: number = 38) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.pin.id === pin.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, { pin, size, quantity: 1 }];
      }
    });
    showToast(`"${pin.title.slice(0, 28)}..." añadido al carrito`);
  };

  const handleUpdateQuantity = (
    pinId: string,
    size: number,
    newQty: number
  ) => {
    if (newQty <= 0) {
      handleRemoveItem(pinId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.pin.id === pinId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (pinId: string, size: number) => {
    setCart((prev) =>
      prev.filter((item) => !(item.pin.id === pinId && item.size === size))
    );
  };

  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    showToast("¡Compra simulada con éxito! Gracias por tu pedido.");
  };

  // Filter Pins
  const filteredPins = useMemo(() => {
    return SHOE_PINS.filter((pin) => {
      // Filter by saved only if active
      if (showingSavedOnly && !savedPinIds.includes(pin.id)) {
        return false;
      }

      // Filter by category
      if (
        selectedCategory !== "todos" &&
        !pin.categories.includes(selectedCategory.toLowerCase())
      ) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = pin.title.toLowerCase().includes(q);
        const matchesDesc = pin.description.toLowerCase().includes(q);
        const matchesSource = pin.source.name.toLowerCase().includes(q);
        const matchesCategory = pin.categories.some((c) =>
          c.toLowerCase().includes(q)
        );
        return matchesTitle || matchesDesc || matchesSource || matchesCategory;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, showingSavedOnly, savedPinIds]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f11] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        savedCount={savedPinIds.length}
        onViewSaved={() => setShowingSavedOnly(!showingSavedOnly)}
        showingSavedOnly={showingSavedOnly}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Horizontal Category Chips (Matches Reference Image Exactly) */}
      {!showingSavedOnly && (
        <CategoryChips
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => {
            setSelectedCategory(id);
            setSearchQuery("");
          }}
        />
      )}

      {/* Filter status banner (if filtered or viewing saved) */}
      {(showingSavedOnly || selectedCategory !== "todos" || searchQuery) && (
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 pt-4 pb-1 flex items-center justify-between text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900 dark:text-white">
              {showingSavedOnly
                ? "Tus Pines y Zapatos Guardados"
                : searchQuery
                ? `Resultados para "${searchQuery}"`
                : `Categoría: ${selectedCategory.toUpperCase()}`}
            </span>
            <span>({filteredPins.length} modelos)</span>
          </div>

          <button
            onClick={() => {
              setSelectedCategory("todos");
              setSearchQuery("");
              setShowingSavedOnly(false);
            }}
            className="flex items-center gap-1 font-semibold text-[#E60023] hover:underline cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Restablecer filtros</span>
          </button>
        </div>
      )}

      {/* Masonry Feed of Shoe Store Pins */}
      <main className="w-full pb-16">
        <ShoeMasonry
          pins={filteredPins}
          onPinClick={(pin) => setSelectedPin(pin)}
          onAddToCart={(pin) => handleAddToCart(pin)}
          savedPinIds={savedPinIds}
          onToggleSave={handleToggleSave}
        />
      </main>

      {/* Modal Detail */}
      {selectedPin && (
        <PinDetailModal
          pin={selectedPin}
          onClose={() => setSelectedPin(null)}
          onAddToCart={handleAddToCart}
          isSaved={savedPinIds.includes(selectedPin.id)}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

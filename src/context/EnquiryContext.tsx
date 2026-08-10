"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type EnquiryItem = {
  id: string;
  code: string;
  image: string;
  category: string;
  width: string;
  length: string;
  thickness: string;
  quantity: number;
};

type EnquiryContextType = {
  items: EnquiryItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<EnquiryItem, "id">) => void;
  removeItem: (code: string) => void;
  removeItemById: (id: string) => void;
  clearAll: () => void;
  hasItem: (code: string) => boolean;
};

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("eco_shine_enquiry");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
    setInitialized(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem("eco_shine_enquiry", JSON.stringify(items));
    } catch (e) {
      console.error("Error writing localStorage", e);
    }
  }, [items, initialized]);

  const addItem = (item: Omit<EnquiryItem, "id">) => {
    setItems((prev) => {
      const id = `${item.code}-${item.width}-${item.length}-${item.thickness}`;
      const idx = prev.findIndex((i) => i.id === id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...item, id };
        return updated;
      }
      return [...prev, { ...item, id }];
    });
  };

  const removeItem = (code: string) => {
    setItems((prev) => prev.filter((i) => i.code !== code));
  };

  const removeItemById = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  const hasItem = (code: string) => {
    return items.some((i) => i.code === code);
  };

  return (
    <EnquiryContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        removeItemById,
        clearAll,
        hasItem,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (context === undefined) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}

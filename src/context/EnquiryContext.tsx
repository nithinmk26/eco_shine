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
  updateItem: (id: string, updates: Partial<Omit<EnquiryItem, "id">>) => void;
  removeItem: (code: string) => void;
  removeItemById: (id: string) => void;
  clearAll: () => void;
  hasItem: (code: string) => boolean;
  getItemCount: (code: string) => number;
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
      // Check if an item with exact same code, width, length, thickness already exists
      const existingIdx = prev.findIndex(
        (i) =>
          i.code === item.code &&
          i.width === item.width &&
          i.length === item.length &&
          i.thickness === item.thickness
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + item.quantity,
        };
        return updated;
      }

      const id = `${item.code}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      return [...prev, { ...item, id }];
    });
  };

  const updateItem = (id: string, updates: Partial<Omit<EnquiryItem, "id">>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      })
    );
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

  const getItemCount = (code: string) => {
    return items.filter((i) => i.code === code).length;
  };

  return (
    <EnquiryContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        updateItem,
        removeItem,
        removeItemById,
        clearAll,
        hasItem,
        getItemCount,
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

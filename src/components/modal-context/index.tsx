import React, { createContext, useState, useContext, ReactNode } from "react";

type ModalContextType = {
  openModal: (modalName: string, data?: Record<string, any>) => void;
  closeModal: (modalName: string) => void;
  isModalOpen: (modalName: string) => boolean;
  getModalData: (modalName: string) => Record<string, any> | null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openModals, setOpenModals] = useState<Set<string>>(new Set());
  const [modalData, setModalData] = useState<Record<string, Record<string, any>>>({});

  const openModal = (modalName: string, data?: Record<string, any>) => {
    setOpenModals((prev) => new Set(prev).add(modalName));
    if (data) {
      setModalData((prev) => ({ ...prev, [modalName]: data }));
    }
  };

  const closeModal = (modalName: string) => {
    setOpenModals((prev) => {
      const updated = new Set(prev);
      updated.delete(modalName);
      return updated;
    });
    setModalData((prev) => {
      const { [modalName]: _, ...rest } = prev; // Удаляем данные для закрытого окна
      return rest;
    });
  };

  const isModalOpen = (modalName: string) => openModals.has(modalName);

  const getModalData = (modalName: string) => modalData[modalName] || null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen, getModalData }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

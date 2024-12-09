import React, { createContext, useState, useContext, ReactNode } from "react";

type ModalContextType = {
    openModal: (modalName: string) => void;
    closeModal: (modalName: string) => void;
    isModalOpen: (modalName: string) => boolean;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [openModals, setOpenModals] = useState<Set<string>>(new Set());

    const openModal = (modalName: string) => {
        setOpenModals((prev) => new Set(prev).add(modalName));
    };

    const closeModal = (modalName: string) => {
        setOpenModals((prev) => {
            const updated = new Set(prev);
            updated.delete(modalName);
            return updated;
        });
    };

    const isModalOpen = (modalName: string) => openModals.has(modalName);

    return (
        <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
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
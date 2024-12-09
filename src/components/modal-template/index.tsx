import React from "react";
import { useModal } from "../modal-context/index";
import './index.css'

type ModalProps = {
    name: string;
    children: React.ReactNode;
    addClose?: boolean;
};

export const Modal: React.FC<ModalProps> = ({ name, children, addClose = true }) => {
    const { isModalOpen, closeModal } = useModal();

    if (!isModalOpen(name)) return null;

    return (
        <div className="modal active">
            <div className="modal__content active" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

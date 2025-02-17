import React from "react";
import { useModal } from "../modal-context/index";
import './index.css'

type ModalProps = {
    name: string;
    children: React.ReactNode | ((data: Record<string, any> | null) => React.ReactNode);
    style?: React.CSSProperties
  };
  
  export const Modal: React.FC<ModalProps> = ({ name, children,style }) => {
    const { isModalOpen, closeModal, getModalData } = useModal();
  
    if (!isModalOpen(name)) return null;
  
    const data = getModalData(name);
  
    return (
      <div className="modal active" >
        <div style={style} className="modal__content active" onClick={(e) => e.stopPropagation()}>
          {typeof children === "function" ? children(data) : children}
        </div>
      </div>
    );
  };
  
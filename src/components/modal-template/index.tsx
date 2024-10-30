import React from 'react'
import './index.css'
type Props = {
    children: React.ReactNode;
    active: boolean;
}

export const ModalTemplate: React.FC<Props> = ({ active, children }) => {

    return (
        <div className={active ? "modal active" : "modal"} >
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );

}

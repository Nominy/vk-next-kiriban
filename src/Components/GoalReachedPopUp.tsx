import React, { useEffect, useRef } from "react";
import ReactModal from "react-modal";

type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    content: string;
};

const Popup = ({ isOpen, onClose, content }: PopupProps) => {
    const appElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        appElementRef.current = document.getElementById("__next");
    }, []);

    const ModalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '2rem',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#252525',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            fontFamily: 'Arial, sans-serif',
            color: '#fff',
        },
    };


    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} appElement={appElementRef.current!} style={ModalStyles}>
            <p>{content}</p>
            <button onClick={onClose}>Close</button>
        </ReactModal>
    );
};

export default Popup;

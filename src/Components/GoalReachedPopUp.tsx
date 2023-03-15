import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Modal from "react-modal";

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

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} appElement={appElementRef.current!}>
            <ReactMarkdown>{content}</ReactMarkdown>
            <button onClick={onClose}>Close</button>
        </Modal>
    );
};

export default Popup;

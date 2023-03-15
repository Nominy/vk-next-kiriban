import React, {useRef} from "react";
import ReactMarkdown from "react-markdown";
import Modal from "react-modal";

type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    content: string;
};

const Popup = ({ isOpen, onClose, content }: PopupProps) => {
    const appElementRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={appElementRef} id="__next">
            <Modal isOpen={isOpen} onRequestClose={onClose} appElement={appElementRef.current!}>
                <ReactMarkdown>{content}</ReactMarkdown>
                <button onClick={onClose}>Close</button>
            </Modal>
        </div>
    );
};

export default Popup;

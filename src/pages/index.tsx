import React, { useState } from "react";
import { ApplicationState } from "@/Components/LoopButton";
import ReactModal from 'react-modal';
import GroupInputForm from '@/Components/GroupInputForm';
import { dataContext, loopContext } from "@/Components/Context";
import { GroupTableControl } from "@/Components/GroupTableControl";

type APIValue = {
    key: string;
    value: number | string;
}

export default function Home() {
    const [data, setData] = useState<APIValue[]>([]);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [appState, setAppState] = useState<ApplicationState>(ApplicationState.Disabled);
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <>
            <loopContext.Provider value={{intervalId, setIntervalId, appState, setAppState} }>
            <dataContext.Provider value={{data, setData}}>
                <GroupInputForm />
                <GroupTableControl/>
            </dataContext.Provider>
            </loopContext.Provider>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal">
                <h2>Modal Title</h2>
                <p>Modal content goes here.</p>
                <button onClick={closeModal}>Close Modal</button>
            </ReactModal>

        </>
    );
}

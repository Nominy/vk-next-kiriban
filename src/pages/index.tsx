import React, { useState } from "react";
import { ApplicationState } from "@/Components/LoopButton";
import ReactModal from 'react-modal';
import GroupInputControl from '@/Components/GroupInputControl';
import { dataContext, loopContext } from "@/Components/Context";
import { GroupTableControl } from "@/Components/GroupTableControl";
import {VKGroup} from "../../types";

type APIValue = {
    key: string;
    value: number | string;
}

export default function Home() {
    const [data, setData] = useState<VKGroup[]>([]);
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
                <GroupInputControl />
                <GroupTableControl />
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

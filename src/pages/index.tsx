import React, { useState } from "react";
import { ApplicationState } from "@/Components/LoopButton";
import GroupInputControl from '@/Components/GroupInputControl/GroupInputControl';
import { dataContext, loopContext } from "@/Components/Context";
import { GroupTableControl } from "@/Components/GroupTableControl/GroupTableControl";
import {VKGroup} from "../../types";
import styles from "./../styles/Home.module.scss"

export default function Home() {
    const [data, setData] = useState<VKGroup[]>([]);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [appState, setAppState] = useState<ApplicationState>(ApplicationState.Disabled);

    return (
        <>
            <loopContext.Provider value={{intervalId, setIntervalId, appState, setAppState} }>
            <dataContext.Provider value={{data, setData}}>
                <div className={styles['app-control']}>
                    <GroupInputControl />
                    <GroupTableControl />
                </div>
            </dataContext.Provider>
            </loopContext.Provider>
        </>
    );
}
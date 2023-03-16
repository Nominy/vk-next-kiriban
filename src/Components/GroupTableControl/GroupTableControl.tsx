import React, {useContext, useEffect, useState} from "react";
import {dataContext, loopContext} from "@/Components/Context";
import LoopButton, {ApplicationState} from "@/Components/LoopButton";
import {fetchData} from "@/lib/api";
import {VKGroup} from "../../../types";
import Popup from "@/Components/GoalReachedPopUp";
import styles from "./GroupTableControl.module.scss"

export const GroupTableControl = () => {
    const { data, setData } = useContext(dataContext);
    const { appState, intervalId, setIntervalId, setAppState } = useContext(loopContext);

    const [showPopup, setShowPopup] = useState(false);
    const [PopupContent, setPopupContent] = useState('')

    const deleteGroup = (key: string) => {
        const newData = data.filter((group) => group.key !== key);
        setData(newData);
    };

    useEffect(() => {
        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);


    useEffect(() => {
        if(data.length === 0){
            setIntervalId(null)
        }
        
        if (intervalId !== null)
            setAppState(ApplicationState.Stop);
        else if (data.length > 0)
            setAppState(ApplicationState.Enabled);
        else
            setAppState(ApplicationState.Disabled);
        console.log(intervalId)
    }, [data, intervalId, setAppState, setIntervalId])
    const handleStartLoop = () => {

        const intervalId = setInterval(async () => {
            let reachedGroup;
            const newData: Array<VKGroup> = [];
            for (let group of data) {
                const membersCount = await fetchData(group.key);
                if (membersCount.value >= group.membersGoal) {
                    clearInterval(intervalId);
                    setShowPopup(true);
                    reachedGroup = group;
                } else {
                    newData.push({ ...group, value: membersCount.value });
                }
            }
            setData(newData);

            const PopupContent = reachedGroup
                ? `Your ${reachedGroup.key} is reached ${reachedGroup.membersGoal}. Check it out!`
                : "";

            setPopupContent(PopupContent);
            
        }, 3000);

        setIntervalId(intervalId);
        setAppState(ApplicationState.Stop);

        return () => clearInterval(intervalId);
    };




        const handleStopLoop = () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        };

        return (
            <div className={styles["group-table-control"]}>
                <h1>Groups:</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Group Name</th>
                        <th>Group Members</th>
                        <th>Members Goal</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item.key}>
                            <td>{item.key}</td>
                            <td>{item.value}</td>
                            <td>{item.membersGoal}</td>
                            <td>
                                <button disabled={Boolean(intervalId)} onClick={() => {
                                    deleteGroup(item.key)
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <LoopButton handleStartLoop={handleStartLoop} handleStopLoop={handleStopLoop} appState={appState}/>
                <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} content={PopupContent}/>
            </div>
        )
}
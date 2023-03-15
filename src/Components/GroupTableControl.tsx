import React, {useContext, useEffect, useState} from "react";
import { dataContext, loopContext } from "@/Components/Context";
import LoopButton from "@/Components/LoopButton";
import { fetchData } from "@/lib/api";
import { VKGroup } from "../../types";
import Popup from "@/Components/GoalReachedPopUp";

export const GroupTableControl = () => {
    const { data, setData } = useContext(dataContext);
    const { appState, intervalId, setIntervalId } = useContext(loopContext);

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
                    newData.push({...group, value: membersCount.value});
                }
            }
            setData(newData);

            const PopupContent = reachedGroup
                ? `Your ${reachedGroup.key} is reached ${reachedGroup.membersGoal}. Check it out!`
                : '';

            setPopupContent(PopupContent);
        }, 3000);

        setIntervalId(intervalId);

        return () => clearInterval(intervalId);
    };


        const handleStopLoop = () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        };

        return (
            <>
                <h1>Groups:</h1>
                <ul>
                    {data.map((item) => (
                        <li key={item.key}>
                            {item.key}: {item.value}
                            <button disabled={Boolean(intervalId)} onClick={() => {
                                deleteGroup(item.key)
                            }}>Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <LoopButton handleStartLoop={handleStartLoop} handleStopLoop={handleStopLoop} appState={appState}/>
                <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} content={PopupContent}/>
            </>
        )
}
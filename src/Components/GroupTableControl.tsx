import React, { useContext, useEffect } from "react";
import { dataContext, loopContext } from "@/Components/Context";
import LoopButton from "@/Components/LoopButton";
import { fetchData } from "@/lib/api";
import { APIValue } from "../../types";

export const GroupTableControl = () => {
    const { data, setData } = useContext(dataContext)
    const { appState, intervalId, setIntervalId } = useContext(loopContext)

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
            const newData: Array<APIValue> = [];
            for (let group of data) {
                const currGroup = await fetchData(group.key);
                newData.push(currGroup);
            }
            setData(newData);
        }, 3000)

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
        </>
    )
}
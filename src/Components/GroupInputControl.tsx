import React, { useContext, useEffect, useState } from "react";
import { APIValue } from "../../types";
import { dataContext, loopContext } from "@/Components/Context";
import { ApplicationState } from "@/Components/LoopButton";
import { fetchData } from "@/lib/api";
import TextInput from "./TextInput";


function isButtonDisabled(currGroup: APIValue, data: Array<APIValue>): boolean {
    const keyEmpty = !currGroup.key;
    const valueEmpty = !currGroup.value;
    const valueError = currGroup.value === "Error";
    const groupAlreadyThere = data.some(
        (group) => group.key === currGroup.key && group.value === currGroup.value
    );
    return keyEmpty || valueEmpty || valueError || groupAlreadyThere;
}


const GroupInputControl = () => {
    const initial_Group: APIValue = {key: "", value: 0};

    const [currentGroup, setCurrentGroup] = useState<APIValue>(initial_Group);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
    const [fixedInputValue, setFixedInputValue] = useState("");
    const [inputGroupNameValue, setInputGroupNameValue] = useState("");
    const [inputMembersCountGoal, setInputMembersCountGoal] = useState<number | null>(null);

    const { data, setData } = useContext(dataContext)
    const { appState, intervalId, setAppState } = useContext(loopContext)
    const addGroup = () => {
        setData([...data, currentGroup]);
        setCurrentGroup(initial_Group);
        setFixedInputValue('');

        setIsAddButtonDisabled(true);
    };

    const fixInput = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        switch (appState) {
            case ApplicationState.Disabled:
                setFixedInputValue(inputGroupNameValue);
                break;
            case ApplicationState.Enabled:
                setFixedInputValue(inputGroupNameValue);
                break;
            case ApplicationState.Stop:
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        fetchData(fixedInputValue)
            .then((currGroup) => {
                setCurrentGroup(currGroup);
                const ButtonDisabled = isButtonDisabled(currGroup, data);
                setIsAddButtonDisabled(ButtonDisabled);
            })
            .catch(() => {
                setIsAddButtonDisabled(true);
            });
    }, [data, fixedInputValue]);


    useEffect(() => {
        if (Boolean(intervalId))
            setAppState(ApplicationState.Stop);
        else if (data.length > 0)
            setAppState(ApplicationState.Enabled);
        else
            setAppState(ApplicationState.Disabled);
    }, [data, intervalId, setAppState])
    
    
    return (<>
            <form onSubmit={fixInput}>
                <TextInput label="Group Name: " 
                type="text"
                value={inputGroupNameValue} 
                onChange={(value: string) => {setInputGroupNameValue(value)}}/>
                <TextInput label="Members Count Goal: "
                type="number"
                value={inputMembersCountGoal}
                onChange={(value: number) => setInputMembersCountGoal(value)}/>
                <button type="submit">Submit</button>
            </form>
            {Boolean(currentGroup.value) ? <p>{currentGroup.key} | {currentGroup.value}</p> : <p>Enter Valid Group!</p>}
            <button onClick={addGroup} disabled={isAddButtonDisabled}>
                Add
            </button>
        </>
    )
}


export default GroupInputControl;
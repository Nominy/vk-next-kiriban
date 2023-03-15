import React, { useContext, useEffect, useState } from "react";
import { VKGroup } from "../../types";
import { dataContext, loopContext } from "@/Components/Context";
import { ApplicationState } from "@/Components/LoopButton";
import { fetchData } from "@/lib/api";
import TextInput from "./TextInput";


function isButtonDisabled(currGroup: VKGroup, data: Array<VKGroup>): boolean {
    const keyEmpty = !currGroup.key;
    const valueEmpty = !currGroup.value;
    const valueError = currGroup.value === "Error";
    const groupAlreadyThere = data.some(
        (group) => group.key === currGroup.key && group.value === currGroup.value
    );
    return keyEmpty || valueEmpty || valueError || groupAlreadyThere;
}


const GroupInputControl = () => {
    const initial_Group: VKGroup = {key: "", value: 0, membersGoal: 0};

    const [currentGroup, setCurrentGroup] = useState<VKGroup>(initial_Group);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
    const [fixedInputValue, setFixedInputValue] = useState<VKGroup>(initial_Group);
    const [inputGroupNameValue, setInputGroupNameValue] = useState("");
    const [inputMembersCountGoal, setInputMembersCountGoal] = useState<number | null>(null);

    const { data, setData } = useContext(dataContext)
    const { appState, intervalId, setAppState } = useContext(loopContext)
    const addGroup = () => {
        setData([...data, currentGroup]);
        setCurrentGroup(initial_Group);
        setFixedInputValue(initial_Group);

        setIsAddButtonDisabled(true);
    };

    const fixInput = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        switch (appState) {
            case ApplicationState.Disabled:
                setFixedInputValue({key: inputGroupNameValue, value: 0, membersGoal: inputMembersCountGoal as number});
                break;
            case ApplicationState.Enabled:
                setFixedInputValue({key: inputGroupNameValue, value: 0, membersGoal: inputMembersCountGoal as number});
                break;
            case ApplicationState.Stop:
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        fetchData(fixedInputValue?.key as string)
            .then((currGroup) => {
                const newGroup = {
                    key: fixedInputValue.key,
                    value: currGroup.value,
                    membersGoal: fixedInputValue.membersGoal
                }
                setCurrentGroup(newGroup);
                const ButtonDisabled = isButtonDisabled(newGroup, data);
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
            {Boolean(currentGroup.value) ? <p>{currentGroup.key} | {currentGroup.value} | {currentGroup.membersGoal}</p> : <p>Enter Valid Group!</p>}
            <button onClick={addGroup} disabled={isAddButtonDisabled}>
                Add
            </button>
        </>
    )
}


export default GroupInputControl;
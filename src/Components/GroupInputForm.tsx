import React, { useContext, useEffect, useState } from "react";
import { APIValue } from "../../types";
import { dataContext, loopContext } from "@/Components/Context";
import { ApplicationState } from "@/Components/LoopButton";
import { fetchData } from "@/lib/api";

const GroupInputForm = () => {
    const initial_Group: APIValue = {key: "", value: 0};

    const [inputValue, setInputValue] = useState('')
    const [currentGroup, setCurrentGroup] = useState<APIValue>(initial_Group);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
    const [fixedInputValue, setFixedInputValue] = useState("");

    const {data, setData} = useContext(dataContext)
    const { appState, intervalId, setAppState } = useContext(loopContext)
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const addGroup = () => {
        setData([...data, currentGroup]);
        setCurrentGroup(initial_Group);
        setFixedInputValue('');
        setInputValue('');
        setIsAddButtonDisabled(true);
    };

    const fixInput = (e: React.FormEvent<HTMLFormElement>, inputValue: string) => {
        e.preventDefault()
        switch (appState) {
            case ApplicationState.Disabled:
                setFixedInputValue(inputValue);
                break;
            case ApplicationState.Enabled:
                setFixedInputValue(inputValue);
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
                const keyEmpty = !currGroup.key;
                const valueEmpty = !currGroup.value;
                const valueError = currGroup.value === "Error";
                const groupAlreadyThere = data.some(
                    (group) => group.key === currGroup.key && group.value === currGroup.value
                );
                const ButtonDisabled = keyEmpty || valueEmpty || valueError || groupAlreadyThere;
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
            <form onSubmit={(e) => fixInput(e, inputValue)}>
                <input type="text" value={inputValue} onChange={handleInput}/>
                <button type="submit">Submit</button>
            </form>
            {Boolean(currentGroup.value) ? <p>{currentGroup.key} | {currentGroup.value}</p> : <p>Enter Valid Group!</p>}
            <button onClick={addGroup} disabled={isAddButtonDisabled}>
                Add
            </button>
        </>
    )
}

export default GroupInputForm
import React, { useContext, useEffect, useState } from "react";
import { VKGroup } from "../../../types";
import { dataContext, loopContext } from "@/Components/Context";
import { ApplicationState } from "@/Components/LoopButton";
import { fetchData } from "@/lib/api";
import TextInput from "../TextInput/TextInput";
import GroupInput from "@/Components/GroupInput/GroupInput";
import {VK} from "vk-io";
import GroupDisplay from "@/Components/GroupDisplay/GroupDisplay";
import GroupAddButton from "@/Components/GroupAddButton/GroupAddButtons";
import styles from "./GroupInputControl.module.scss"


function isButtonDisabled(Group: VKGroup, data: Array<VKGroup>): boolean {
    const keyEmpty = !Group.key;
    const valueEmpty = !Group.value;
    const valueError = Group.value === "Error";
    const groupAlreadyThere = data.some(
        (group) => group.key === Group.key && group.value === Group.value
    );
    return keyEmpty || valueEmpty || valueError || groupAlreadyThere;
}


const GroupInputControl = () => {
    const initialGroup: VKGroup = {key:"", value:0, membersGoal:0}

    const [currentGroup, setCurrentGroup] = useState<VKGroup>(initialGroup);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

    const { appState, intervalId, setAppState } = useContext(loopContext);
    const { data, setData } = useContext(dataContext);

    const fetchGroupData = async (group: VKGroup) => {
        try {
            const fetchedGroup = await fetchData(group.key);
            const newGroup: VKGroup = {
                key: group.key,
                value: fetchedGroup.value,
                membersGoal: group.membersGoal,
            };
            setCurrentGroup(newGroup);
            setIsAddButtonDisabled(isButtonDisabled(newGroup, data));
        } catch {
            setIsAddButtonDisabled(true);
        }
    };

    const handleInputSubmit = async (group: VKGroup) => {
        await fetchGroupData(group);
    };

    const handleAddClick = () => {
        setCurrentGroup(initialGroup);
        setIsAddButtonDisabled(true);
    };

    useEffect(() => {
        if (Boolean(intervalId))
            setAppState(ApplicationState.Stop);
        else if (data.length > 0)
            setAppState(ApplicationState.Enabled);
        else
            setAppState(ApplicationState.Disabled);
    }, [data, intervalId, setAppState])


    return (
        <div className={styles['group-input-control']}>
            <div>
                <GroupInput onSubmit={handleInputSubmit} />
            </div>
            <div>
                <GroupDisplay group={currentGroup}/>
                <GroupAddButton group={currentGroup} disabled={isAddButtonDisabled} onAdd={handleAddClick}/>
            </div>
        </div>
    );
}


export default GroupInputControl;
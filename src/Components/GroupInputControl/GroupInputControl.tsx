import React, { useContext, useState } from "react";
import { VKGroup } from "../../../types";
import { dataContext, loopContext } from "@/Components/Context";
import { ApplicationState } from "@/Components/LoopButton";
import { fetchData } from "@/lib/api";
import TextInput from "../TextInput/TextInput";
import GroupInput from "@/Components/GroupInput/GroupInput";
import GroupDisplay from "@/Components/GroupDisplay/GroupDisplay";
import GroupAddButton from "@/Components/GroupAddButton/GroupAddButton";
import styles from "./GroupInputControl.module.scss"


export function isButtonDisabled(Group: VKGroup, data: Array<VKGroup>): boolean {
    const keyEmpty = !Group.key;
    const valueEmpty = !Group.value;
    const valueError = Group.value === "Error";
    const groupAlreadyThere = data.some(
        (group) => group.key === Group.key
    );
    return keyEmpty || valueEmpty || valueError || groupAlreadyThere;
}


const GroupInputControl = () => {
    const initialGroup: VKGroup = {key:"", value:0, membersGoal:0}

    const [currentGroup, setCurrentGroup] = useState<VKGroup>(initialGroup);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
    const [formKey, setFormKey] = useState(0);

    const { intervalId, setAppState } = useContext(loopContext);
    const { data } = useContext(dataContext);

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
            setCurrentGroup(initialGroup);
            setIsAddButtonDisabled(true);
        }
    };

    const handleInputSubmit = async (group: VKGroup) => {
        await fetchGroupData(group);
    };

    const handleAddClick = () => {
        setCurrentGroup(initialGroup);
        setIsAddButtonDisabled(true);
        setFormKey((k) => k + 1);
    };




    return (
        <div className={styles['group-input-control']}>
            <div>
                <GroupInput key={formKey} onSubmit={handleInputSubmit} />
            </div>
            <div className={styles.test}>
                <GroupDisplay group={currentGroup}/>
                <GroupAddButton group={currentGroup} disabled={isAddButtonDisabled} onAdd={handleAddClick}/>
            </div>
        </div>
    );
}


export default GroupInputControl;

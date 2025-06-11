import { VKGroup } from "../../../types";
import React from "react";
import styles from './GroupDisplay.module.scss';

interface GroupDisplayProps {
    group: VKGroup;
}

const GroupDisplay: React.FC<GroupDisplayProps> = ({ group }) => {

    function isGroupValid(group: VKGroup) {
        for (const key in group) {
            const value = group[key];
            if (value === undefined || value === '') {
                return false;
            }
        }
        return true;
    }


    const GroupIsEmpty = isGroupValid(group);

    return (
        <div className={styles['group-display']}>
            <span className={styles['valid-display']}>
                <h2>Group Name:</h2>
                <p>{GroupIsEmpty ? group.key : "Enter Valid group"}</p>
                <h2>Current Members count:</h2>
                <p>{GroupIsEmpty ? group.value : "Enter Valid group"}</p>
                <h2>Target Members count:</h2>
                <p>{GroupIsEmpty ? group.membersGoal : "Enter Valid group"}</p>
            </span>
        </div>
    );
};

export default GroupDisplay;

import { VKGroup } from "../../../types";
import React from "react";
import styles from './GroupDisplay.module.scss';

interface GroupDisplayProps {
    group: VKGroup;
}

const GroupDisplay: React.FC<GroupDisplayProps> = ({ group }) => {
    return (
        <div className={styles['group-display']}>
            {Boolean(group.value) ? (
                <span>
                    <h2>Group Name:</h2>
                    <p className={styles.p}>{group.key}</p>
                    <h2>Current Members count:</h2>
                    <p className={styles.p}>{group.value}</p>
                    <h2>Target Members count:</h2>
                    <p className={styles.p}>{group.membersGoal}</p>
                </span>
            ) : (
                <h2 className={styles.p}>Enter Valid Group!</h2>
            )}
        </div>
    );
};

export default GroupDisplay;

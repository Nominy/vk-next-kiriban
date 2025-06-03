import {VKGroup} from "../../../types";
import React, {useContext} from "react";
import {dataContext} from "@/Components/Context";
import styles from "./GroupAddButton.module.scss"

interface GroupAddButtonProps {
    group: VKGroup;
    disabled: boolean;
    onAdd: () => void;
}

const GroupAddButton: React.FC<GroupAddButtonProps> = ({ group, disabled, onAdd }) => {
    const { data, setData } = useContext(dataContext);

    const handleAddClick = () => {
        setData([...data, group]);
        onAdd();
    };

    return (<div className={styles['group-add-button']}>
                <button onClick={handleAddClick} disabled={disabled}>
                    Add
                </button>
            </div>);
};

export default GroupAddButton;
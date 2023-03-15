import {VKGroup} from "../../../types";
import React, {useContext} from "react";
import {dataContext} from "@/Components/Context";

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

    return (
            <button onClick={handleAddClick} disabled={disabled}>
            Add
            </button>
    );
};

export default GroupAddButton;
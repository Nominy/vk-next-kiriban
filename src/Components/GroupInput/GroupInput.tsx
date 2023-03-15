import React, { useState } from "react";
import TextInput from "@/Components/TextInput/TextInput";
import { VKGroup } from "../../../types";
import styles from "./GroupInput.module.scss"
interface GroupInputProps {
    onSubmit: (group: VKGroup) => void;
}

const GroupInput: React.FC<GroupInputProps> = ({ onSubmit }) => {
    const [inputGroupNameValue, setInputGroupNameValue] = useState("");
    const [inputMembersCountGoal, setInputMembersCountGoal] =
        useState<number | null>(null);

    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const group: VKGroup = {
            key: inputGroupNameValue,
            value: 0,
            membersGoal: inputMembersCountGoal as number,
        };
        onSubmit(group);
    };

    return (
        <>
            <form className={styles['groupForm']} onSubmit={handleInputSubmit}>
                    <TextInput
                        label="Enter group name: "
                        type="text"
                        value={inputGroupNameValue}
                        onChange={(value: string) => {
                            setInputGroupNameValue(value);
                        }}
                    />
                    <TextInput
                        label="Enter Members Count goal: "
                        type="number"
                        value={inputMembersCountGoal}
                        onChange={(value: number) => setInputMembersCountGoal(value)}
                    />
                <button className="group-form__submit" type="submit">Submit</button>
            </form>
        </>
    );
};

export default GroupInput;

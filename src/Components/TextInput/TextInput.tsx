import React from "react";
import styles from "./TextInput.module.scss"

type TextProps = {
    label: string;
    value: string;
    type: "text";
    onChange: (value: string) => void;
};

type NumberProps = {
    label: string;
    value: number | null;
    type: "number";
    onChange: (value: number) => void;
};

type Props = TextProps | NumberProps;

export default function TextInput({ label, value, type, onChange }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (type === "number") {
            const parsedValue = parseInt(event.target.value, 10);
            if (!isNaN(parsedValue)) {
                onChange(parsedValue);
            }
        } else {
            onChange(event.target.value);
        }
    };

    return (
        <div className={styles["text-input"]}>
            <label>{label}</label>
            <input type={type} value={value === null ? "" : value} onChange={handleChange} />
        </div>
    );
}

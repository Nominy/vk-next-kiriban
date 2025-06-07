import React from "react";
import styles from "./TextInput.module.scss"

type TextProps = {
    label: string;
    value: string;
    type: "text";
    onChange: (value: string) => void;
    placeholder?: string;
};

type NumberProps = {
    label: string;
    value: number;
    type: "number";
    onChange: (value: number) => void;
    placeholder?: string;
};

type Props = TextProps | NumberProps;

export default function TextInput({ label, value, type, onChange, placeholder }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (type === "number") {
            const parsedValue = parseInt(event.target.value, 10);
            if (!isNaN(parsedValue)) {
                onChange(parsedValue);
            } else if (event.target.value === "") {
                onChange(0);
            }
        } else {
            onChange(event.target.value);
        }
    };


    return (
        <div className={styles["text-input"]}>
            <label>{label}</label>
            <input
                type={type}
                value={value === 0 ? "" : value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    );
}

import React, { ReactNode, useState } from "react";

interface GroupInputProps<T> {
    name: string;
    value: T;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function GroupInputForm<T>({
                               onSubmit,
                               children,
                           }: {
    onSubmit: (formState: Record<string, T>) => void;
    children: ReactNode;
}) {
    const [formState, setFormState] = useState<Record<string, string | T>>({});

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: typeof prevState[name] === "number" ? Number(value) as T : value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const typedFormState = Object.fromEntries(
            Object.entries(formState).map(([key, value]) => [key, value as T])
        );
        onSubmit(typedFormState);
        setFormState({});
    };

    const isFormEmpty = () => {
        return Object.values(formState).every((value) => value === "");
    };

    return (
        <form onSubmit={handleSubmit}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.props.name) {
                    const { name } = child.props;
                    const inputProps: GroupInputProps<string | T> = {
                        value: formState[name] !== undefined ? formState[name] : "",
                        onChange: handleInput,
                        name,
                    };
                    return React.cloneElement(child, inputProps);
                }
                return child;
            })}
            <button type="submit" disabled={isFormEmpty()}>
                Submit
            </button>
        </form>
    );
}

export default GroupInputForm;

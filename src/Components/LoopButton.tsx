import React from "react";

export enum ApplicationState {
    Disabled = "disabled",
    Enabled = "enabled",
    Stop = "stop",
}

export type LoopButtonProps = {
    handleStartLoop: () => void;
    handleStopLoop: () => void;
    appState: ApplicationState;
};

const LoopButton = (props: LoopButtonProps) => {
    switch (props.appState) {
        case ApplicationState.Enabled:
            return (
                <button onClick={props.handleStartLoop}>Begin loop</button>
            );
        case ApplicationState.Stop:
            return <button onClick={props.handleStopLoop}>Stop loop</button>;
        case ApplicationState.Disabled:
            return <button disabled={true}>Begin loop</button>;
        default:
            return null;
    }
};

export default LoopButton;

import {createContext, Dispatch, SetStateAction} from "react";
import {APIValue} from "../../types";
import {ApplicationState} from "@/Components/LoopButton";

type dataContextType = {
    data: Array<APIValue>;
    setData: Dispatch<SetStateAction<APIValue[]>>;
}

type loopContextType = {
    intervalId: NodeJS.Timeout | null;
    setIntervalId: Dispatch<SetStateAction<NodeJS.Timeout | null>>;

    appState: ApplicationState;
    setAppState: Dispatch<SetStateAction<ApplicationState>>;
}
export const dataContext = createContext<dataContextType>({
    data: [],
    setData: () => {}
});

export const loopContext = createContext(<loopContextType>({
        intervalId: null,
        setIntervalId: () => {},
        appState: ApplicationState.Disabled,
        setAppState: () => {}
    })
);
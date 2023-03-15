import { createContext, Dispatch, SetStateAction } from "react";
import { VKGroup } from "../../types";
import { ApplicationState } from "@/Components/LoopButton";

type dataContextType = {
    data: Array<VKGroup>;
    setData: Dispatch<SetStateAction<VKGroup[]>>;
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
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from './store';
// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { ReactElement, useState } from "react";

export const useMultistepForm = (steps:ReactElement[]) => {
    const [currentStepIndex,setCurrentStepIndex] = useState(0);

    const next = () => {
        setCurrentStepIndex(i => {
            if(i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    const back = () => {
        setCurrentStepIndex(i => {
            if(i <= 0) return i;
            return i - 1;
        });
    }

    const goTo = (index:number) => {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step:steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        back,
        next,
    }
}
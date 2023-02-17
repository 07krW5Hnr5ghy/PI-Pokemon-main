import { toast } from "react-toastify";
import { ReactElement, useState } from "react";

/* notifications */
export const showSuccessMessage = (message:string) => {
    toast.success(message,{
        position:toast.POSITION.TOP_RIGHT,
        theme:"colored",
    });
}

/* multi-step form logic */
export const useMultistepForm = (
    /* contains the components that compose the form */
    steps:ReactElement[] 
    ) => {
    /* state tracing the actual index of array of components
    that make the multi-step form */
    const [currentStepIndex,setCurrentStepIndex] = useState(0);

    /* select the next step in form steps */
    const next = () => {
        setCurrentStepIndex(i => {
            if(i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    /* select the previous step in form steps */
    const back = () => {
        setCurrentStepIndex(i => {
            if(i <= 0) return i;
            return i - 1;
        });
    }

    /* select specific step of multi-step form array index
    setting the currentStepIndex state */
    const goTo = (index:number) => {
        setCurrentStepIndex(index);
    }

    /* return object with current step index in form,
    component belonging to current step in form,
    the total number of steps of form,
    a check if the current step is the first step,
    another check if the last step is the current step,
    the next, back and goTo functions */
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


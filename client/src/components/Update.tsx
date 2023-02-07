import Nav from "./Nav";
import Basic from "./Basic";
import AD from "./AD";
import Special from "./Special";
import SH from "./SH";
import Picture from "./Picture";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMultistepForm } from "../redux/hooks";
import { updatePokemon,getDetail,resetDetail } from "../redux/pokemonActions";
import { INITIAL_DATA,FormData } from "../interfaces";

const Update = () => {
    const [data,setData] = useState(INITIAL_DATA); 
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];
    console.log(data);
    const updateFields = (fields:Partial<FormData>) => {
        setData(prev => {
            return {...prev,...fields}
        });
    }
    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next
    } = useMultistepForm([
        <Basic {...data} updateFields={updateFields}/>,
        <AD {...data} updateFields={updateFields}/>,
        <Special {...data} updateFields={updateFields}/>,
        <SH {...data} updateFields={updateFields}/>,
        <Picture {...data} updateFields={updateFields}/>
    ]);

    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(!isLastStep) return next();
        dispatch(updatePokemon(id,data));
        dispatch(resetDetail());
        dispatch(getDetail(id));
        alert("Successfull Update");
        navigate(`/pokemons/${id}`);
    }
    const cancel = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(`/pokemons/${id}`);
    }
    return(
        <div className="new-container">
            <Nav/>
            <div className="form-container">
                <form onSubmit={onSubmit} className="new-form">
                    <div className="new-steps">
                        {currentStepIndex + 1} / {steps.length}
                    </div>
                    {step}
                    <div className="new-buttons">
                        {!isFirstStep ? 
                        <button 
                        className="new-back" 
                        type="button" 
                        onClick={back}
                        >
                            Back
                        </button> :
                        <button className="new-back" onClick={cancel}>Cancel</button>}
                        <button className="new-next" type="submit">
                            {!isLastStep ? "Next" : "Finish"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;
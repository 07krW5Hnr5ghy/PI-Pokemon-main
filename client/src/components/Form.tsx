import Nav from "./Nav";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMultistepForm } from "../redux/hooks";
import { RootState } from "../redux/store";
import { addPokemon,updatePokemon,resetDetail,getDetail } from "../redux/pokemonActions";
import { useLocation, useNavigate } from "react-router-dom";
import { INITIAL_DATA,FormData,ERROR_CHECKING } from "../interfaces";

const Form = () => {
    const [info,setInfo] = useState<FormData>(INITIAL_DATA); 
    const [errors,setErrors] = useState(ERROR_CHECKING);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];
    const {data} = useSelector((state:RootState) => state.pokemons);
    const updateFields = (fields:Partial<FormData>) => {
        setInfo(prev => {
            return {...prev,...fields}
        });
    }

    const checkFields = (e:React.ChangeEvent<HTMLInputElement>) => {
        
        if(e.target.name === "name"){
            if(e.target.value.length === 0){
                setErrors({...errors,name:'Please write a name for the new pokemon'})
            }else if(e.target.value.length > 10){
                setErrors({...errors,name:'Maximum length allowed are 10 Characters'});
            }else if(!/^[A-Za-z]+$/.test(e.target.value)){
                setErrors({...errors,name:'Only alphabetic characters and no spaces are allowed'})
            }else if(data.records.find(pokemon => pokemon.name === e.target.value)){
                setErrors({...errors,name:'Name already exists in the pokemons list'});
            }else{
                setErrors({...errors,name:"is valid"});
            }
        }

        if(e.target.name === "picture"){
            if(!e.target.value){
                setErrors({...errors,picture:'url of image is required'});
            }else if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|webp|jpeg)/.test(e.target.value)){
                setErrors({...errors,picture:'input a valid image url of a file of the extensions jpg,svg,png,jpeg or webp'});
            }else{
                setErrors({...errors,picture:"is valid"});
            }
        }

        if(e.target.name === "file"){
            if(!e.target.files?.[0]){
                setErrors({...errors,picture:'file is required'});
            }else if(!e.target.files?.[0].type.startsWith('image/jpeg') 
            && !e.target.files?.[0].type.startsWith('image/png')
            && !e.target.files?.[0].type.startsWith('image/webp')){
                setErrors({...errors,picture:'only jpg, png or webp files are allowed'});
            }else{
                setErrors({...errors,picture:"is valid"});
            }
        }

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
        <StepOne {...info} updateFields={updateFields} checkFields={checkFields}/>,
        <StepTwo {...info} updateFields={updateFields}/>,
        <StepThree {...info} updateFields={updateFields}/>,
        <StepFour {...info} updateFields={updateFields}/>,
        <StepFive {...info} updateFields={updateFields} checkFields={checkFields}/>
    ]);

    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(!isLastStep) return next();
        if(id){
            dispatch(updatePokemon(id,info));
            dispatch(resetDetail());
            dispatch(getDetail(id));
            alert("Successfull Update");
            navigate(`/pokemons/${id}`);
        }else{
            dispatch(addPokemon(info));
            alert("Successfull Creation");
            navigate(`/pokemons`);
        }
    }

    const cancel = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(id){
            navigate(`/pokemons/${id}`);
        }else{
            navigate(`/pokemons`);
        }
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
                        {!isFirstStep ? <button 
                        className="new-back" 
                        type="button" 
                        onClick={back}
                        >
                            Back
                        </button> : null}
                        <button 
                        className="new-next" 
                        type="submit" 
                        disabled={
                        (errors.name !== "is valid") ||
                        (!info.classes.length) ||
                        (currentStepIndex === 1 && !info.attack) ||
                        (currentStepIndex === 1 && !info.defense) ||
                        (currentStepIndex === 2 && !info.specialAttack) ||
                        (currentStepIndex === 2 && !info.specialDefense) ||
                        (currentStepIndex === 3 && !info.speed) ||
                        (currentStepIndex === 3 && !info.health) ||
                        ((isLastStep 
                        && errors.picture !== "is valid") 
                        || (isLastStep && !info.picture))}>
                            {!isLastStep ? "Next" : "Finish"}
                        </button>
                    </div>
                </form>
            </div>
            <button className="new-back new-cancel" onClick={cancel}>Cancel</button>
        </div>
    )
}

export default Form;
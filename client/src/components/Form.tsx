/* components */
import Nav from "./Nav";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

/* libraries */
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/* functions and definitions */
import { useMultistepForm,showSuccessMessage } from "../tools/tools";
import { RootState } from "../redux/store";
import { addPokemon,updatePokemon,resetDetail,getDetail } from "../redux/pokemonActions";
import { INITIAL_DATA,FormData,ERROR_CHECKING } from "../tools/interfaces";

const Form = () => {

    /* react and redux hooks */
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    /* get id from page url */
    const id = location.pathname.split("/")[2];

    /* get pokemons and detail data from redux state */
    const {data,detail} = useSelector((state:RootState) => state.pokemons);

    /* form state default state is empty when the user begin to create
    pokemon and is preloaded with pokemon data belonging to the id
    of the url when the user update a pokemon */
    const [info,setInfo] = useState<FormData>( !id ? INITIAL_DATA : {
        name:detail.name,
        classes:detail.classes,
        attack:detail.attack,
        defense:detail.defense,
        specialAttack:detail.specialAttack,
        specialDefense:detail.specialDefense,
        speed:detail.speed,
        health:detail.health,
        picture:detail.picture,
    }); 

    /* form validation state is empty when user begin to create pokemon and is
    preloaded with the all checks passed when user is updating pokemon */
    const [errors,setErrors] = useState( !id ? ERROR_CHECKING:{
        name:"is valid",
        picture:"is valid",
    });

    /* update the form state with the input from user */
    const updateFields = (fields:Partial<FormData>) => {
        setInfo(prev => {
            return {...prev,...fields}
        });
    }

    /* check for errors in name and picture inputs and store the status
    in the validation state */
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

        /* check errors in the picture input when the user choose
        to paste the url for the pokemon picture */
        if(e.target.name === "picture"){
            if(!e.target.value){
                setErrors({...errors,picture:'url of image is required'});
            }else if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|webp|jpeg)/.test(e.target.value)){
                setErrors({...errors,picture:'input a valid image url of a file of the extensions jpg,svg,png,jpeg or webp'});
            }else{
                setErrors({...errors,picture:"is valid"});
            }
        }

        /* check errors in the picture input when user choose
        that wants to upload an picture from pc, only can
        upload format jpeg, png and webp */    
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
    
    /* call function with multi-step form logic and set components
    for each step of the form*/
    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next
    } = useMultistepForm([
        <StepOne {...info} updateFields={updateFields} checkFields={checkFields} detail={detail} id={id}/>,
        <StepTwo {...info} updateFields={updateFields} detail={detail} id={id}/>,
        <StepThree {...info} updateFields={updateFields} detail={detail} id={id}/>,
        <StepFour {...info} updateFields={updateFields} detail={detail} id={id}/>,
        <StepFive {...info} updateFields={updateFields} detail={detail} checkFields={checkFields}/>
    ]);

    /* submit event */
    const onSubmit = (e:FormEvent) => {

        e.preventDefault();

        /* switch to next step */
        if(!isLastStep) return next();

        /* create or update pokemon taking in account the id parameter
        in the url */
        if(id){
            dispatch(updatePokemon(id,info));
            dispatch(resetDetail());
            dispatch(getDetail(id));
            showSuccessMessage("Pokemon successfully updated");
            setTimeout(() => {
                navigate(`/pokemons/${id}`);
            },5000);
        }else{
            dispatch(addPokemon(info));
            showSuccessMessage("Pokemon successfully created");
            setTimeout(() => {
                navigate(`/pokemons`);
            },5000);
        }
    }

    /* cancel event return to home page if the user is
    creating a pokemon or detail page if the user is
    updating a pokemon */
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
                    {/* steps counter */}
                    <div className="new-steps">
                        {currentStepIndex + 1} / {steps.length}
                    </div>
                    {step}
                    {!id ? null : <p className="form-warning">Only fill up the fields that you want to update</p>}
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
                        /* logic tests to check if the user
                        doesnt have errors before passing to next
                        step of form or submit the form */
                        disabled={
                            !id ? ((errors.name !== "is valid") ||
                            (!info.classes.length) ||
                            (currentStepIndex === 1 && !info.attack) ||
                            (currentStepIndex === 1 && !info.defense) ||
                            (currentStepIndex === 2 && !info.specialAttack) ||
                            (currentStepIndex === 2 && !info.specialDefense) ||
                            (currentStepIndex === 3 && !info.speed) ||
                            (currentStepIndex === 3 && !info.health) ||
                            ((isLastStep 
                            && errors.picture !== "is valid") 
                            || (isLastStep && !info.picture))) : ((errors.name !== "is valid") ||
                            (!info.classes.length) || ((isLastStep 
                                && errors.picture !== "is valid")))
                        }>
                            {!isLastStep ? "Next" : "Finish"}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
            {/* button to return back */}
            <button className="new-back new-cancel" onClick={cancel}>Cancel</button>
        </div>
    )
}

export default Form;
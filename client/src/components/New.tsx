import Nav from "./Nav";
import Basic from "./Basic";
import AD from "./AD";
import Special from "./Special";
import SH from "./SH";
import Picture from "./Picture";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMultistepForm } from "../redux/hooks";
import { RootState } from "../redux/store";
import { addPokemon,updatePokemon,resetDetail,getDetail } from "../redux/pokemonActions";
import { useLocation, useNavigate } from "react-router-dom";
import { INITIAL_DATA,FormData,ERROR_CHECKING } from "../interfaces";

const New = () => {
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
            }else if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png|webp|jpeg)/.test(e.target.value)){
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
        <Basic {...info} updateFields={updateFields} checkFields={checkFields}/>,
        <AD {...info} updateFields={updateFields}/>,
        <Special {...info} updateFields={updateFields}/>,
        <SH {...info} updateFields={updateFields}/>,
        <Picture {...info} updateFields={updateFields} checkFields={checkFields}/>
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
                    {/* {!isFirstStep ? 
                        <button 
                        className="new-back" 
                        type="button" 
                        onClick={back}
                        >
                            Back
                        </button> :
                        <button className="new-back" onClick={cancel}>Cancel</button>} */}
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
                        (isLastStep 
                        && errors.picture !== "is valid" 
                        && !info.picture)}>
                            {!isLastStep ? "Next" : "Finish"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default New;

/*import { getPokemons,getTypes,postCreate,updatePokemon } from '../redux/pokemonActions';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Nav from "./Nav";
import {validate} from "./utils";

const Form = () => {
    const dispatch = useDispatch();
    const [mode,setMode] = useState("create");
    const [input,setInput] = useState({
        name:"",
        hp:0,
        classes:[],
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        img:"https://i.pinimg.com/originals/e3/4f/ac/e34facd1e788d09f2bfcbc2f37f548ce.png",
    });

    const [errors,setErrors] = useState({
        name:"",
        hp:'',
        classes:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        img:'',
    });
    
    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    },[dispatch]);

    const types = useSelector(state => state.reducerPokemon.types);

    const pokemons = useSelector(state => state.reducerPokemon.pokemons);

    const handleChange = (event,mode) => {
        setInput({
            ...input,
            [event.target.name]:event.target.value,
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]:event.target.value,
            },pokemons,mode)
        );
    }

    const handleName = (event,mode) => {
        setInput({
            ...input,
            name:event.target.value.toLowerCase(),
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]:event.target.value,
            },pokemons,mode)
        );
    }

    const handleId = (event,mode) => {
        setInput({
            ...input,
            id:event.target.value,
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]:event.target.value,
            },pokemons,mode)
        )
    }

    const handleTypes = (event) => {
        
        setInput({
            ...input,
            classes:[...input.classes,event.target.value],
        });
        
    }

    const handleDelete = (type) => {
        setInput({
            ...input,
            classes:input.classes?.filter((kind) => kind !== type),
        });
    }

    const handleSubmit = (event,mode) => {
        if(mode === "create"){
            dispatch(postCreate(input));
            setInput({
                name:'',
                hp:0,
                classes:[],
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                img:"https://i.pinimg.com/originals/e3/4f/ac/e34facd1e788d09f2bfcbc2f37f548ce.png",
            });
            setErrors({
                name:'',
                hp:'',
                classes:'',
                attack:'',
                defense:'',
                speed:'',
                height:'',
                weight:'',
                img:'',
            });
            alert("Pokemon created succesfully");
        }else if(mode === "update"){
            dispatch(updatePokemon(input));
            setInput({
                id:'',
                hp:0,
                classes:[],
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                img:"",
            });
            setErrors({
                id:'',
                hp:'',
                classes:'',
                attack:'',
                defense:'',
                speed:'',
                height:'',
                weight:'',
                img:'',
            });
            alert("Pokemon updated succesfully");
        }
        
    }

    const handleMode = (event) => {
        event.preventDefault();
        if(mode === "create"){
            setMode("update");
            setInput({
                id:"",
                hp:0,
                classes:[],
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                img:"",
            });
            setErrors({
                id:"",
                hp:'',
                classes:'',
                attack:'',
                defense:'',
                speed:'',
                height:'',
                weight:'',
                img:'',
            });
        }

        if(mode === "update"){
            setMode("create");
            setInput({
                name:"",
                hp:0,
                classes:[],
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                img:"https://i.pinimg.com/originals/e3/4f/ac/e34facd1e788d09f2bfcbc2f37f548ce.png",
            });

            setErrors({
                name:"",
                hp:'',
                classes:'',
                attack:'',
                defense:'',
                speed:'',
                height:'',
                weight:'',
                img:'',
            });
        }
    }

    const options = types.map(type => <option key={type.id} value={type.name}>{type.name}</option>)
    
    return(
        <>
            <Nav/>
            <div id="Create_container">
                <button onClick={(e) => handleMode(e)} id="Form_mode">set mode</button>
                {<span>{mode}</span>}
                <form onSubmit={(e) => handleSubmit(e,mode)} id="Create_form">
                    <div id='Create_fieldset'>
                        {mode === "create" ? <label>Name:
                        <input type="text" name="name" value={input.name} onChange={(e) => handleName(e,mode)} placeholder="type name of new pokemon"/>
                            {errors.name && (<span className={errors.name === "is valid" ? "correct" : "error"}>{errors.name}</span>)}
                        </label> : <label>Id:
                        <input type="text" name="id" value={input.id} onChange={(e) => handleId(e,mode)} placeholder="write id of created pokemon"/>
                            {errors.id && (<span className={errors.id === "is valid" ? "correct" : "error"}>{errors.id}</span>)}
                        </label>}
                        <label id="Create_select">Types:
                            <select name="classes" defaultValue={"DEFAULT"} value={input.classes} onChange={handleTypes} disabled={input.classes.length >= 2}>
                                <option value="DEFAULT" disabled>Please choose types --</option>
                                {options}
                            </select>
                            {input.classes?.map((type,index)=> (<div key={index}>
                                <span className='Create_types' onClick={() => handleDelete(type)}>{`${type} x`}</span>
                            </div>))}
                            {errors.classes && (<span className={errors.classes === "is valid" ? "correct" : "error"}>{errors.classes}</span>)}
                        </label>
                        <label>Health:
                            <input type="number" name="hp" value={input.hp} onChange={(e) => handleChange(e,mode)}/>
                            {errors.hp && (<span className={errors.hp === "is valid" ? "correct" : "error"}>{errors.hp}</span>)}
                        </label>
                        <label>Attack:
                            <input type="number" name="attack" value={input.attack} onChange={(e) => handleChange(e,mode)}/>
                            {errors.attack && (<span className={errors.attack === "is valid" ? "correct" : "error"}>{errors.attack}</span>)}
                        </label>
                        <label>Defense:
                            <input type="number" name="defense" value={input.defense} onChange={(e) => handleChange(e,mode)}/>
                            {errors.defense && (<span className={errors.defense === "is valid" ? "correct" : "error"}>{errors.defense}</span>)}
                        </label>
                        <label>Speed:
                            <input type="number" name="speed" value={input.speed} onChange={(e) => handleChange(e,mode)}/>
                            {errors.speed && (<span className={errors.speed === "is valid" ? "correct" : "error"}>{errors.speed}</span>)}
                        </label>
                        <label>Height:
                            <input type="number" name="height" value={input.height} onChange={(e) => handleChange(e,mode)}/>
                            {errors.height && (<span className={errors.height === "is valid" ? "correct" : "error"}>{errors.height}</span>)}
                        </label>
                        <label>Weight:
                            <input type="number" name="weight" value={input.weight} onChange={(e) => handleChange(e,mode)}/>
                            {errors.weight && (<span className={errors.weight === "is valid" ? "correct" : "error"}>{errors.weight}</span>)}
                        </label>
                        <label>Image:
                            <input type="text" name="img" value={input.img} onChange={(e) => handleChange(e,mode)}/>
                            {errors.img && (<span className={errors.img === "is valid" ? "correct" : "error"}>{errors.img}</span>)}
                        </label>
                        <input type="submit" value="Submit" disabled={Object.values(errors).every(item => 
                        item === "is valid") ? "" : "disabled"}/>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;*/
import FormWrapper from "./FormWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation } from "react-router-dom";
import React from "react";



type BasicData = {
    name:string,
    classes:string[],
}

type BasicProps = BasicData & {
    updateFields:(fields:Partial<BasicData>) => void,
    checkFields:(e:React.ChangeEvent<HTMLInputElement>) => void,
}

const Basic = ({name,classes, updateFields,checkFields}:BasicProps) => {
    const location = useLocation();
    const {types,data} = useSelector((state:RootState) => state.pokemons);
    const deleteType = (e:React.MouseEvent<HTMLButtonElement>) => {
        const buttonValue = e.currentTarget.value;
        updateFields({classes:classes.filter(type => type !== buttonValue)});
    }
    return(
        <FormWrapper title={location.pathname === "/new" 
        ? "Create your Pokemon"
        : "Edit your Pokemon" }>
            <label htmlFor="" className="new-label">Name</label>
            <input 
            type="text" 
            className="new-input"
            name="name" 
            onChange={(e) => {
                updateFields({name:e.target.value});
                checkFields(e);
            }}
            />
            {name.length === 0 ? <p>Input a name for you pokemon</p>
            : name.length > 10 ? <p>Maximum length allowed are 10 Characters</p>
            : !/^[A-Za-z]+$/.test(name) ? <p>Only alphabetic characters whitout spaces are allowed</p>
            : data.records.find(pokemon => pokemon.name === name) ? <p>Duplicated name</p>
            : <p>no errors</p>}
            <label htmlFor="" className="new-label">Types</label>
            <select 
            name="" 
            id="" 
            className="new-types new-select" 
            onChange={e => {
                if(classes.length < 2){
                    updateFields({classes:classes.concat([e.target.value])})
                }
            }}
            >
                <option value="" selected>select types</option>
                {types.map(item => <option key={item.id}>{item.type}</option>)}
            </select>
            {classes.length === 0 ? 
            <p>Select at least one type maximum two types</p>:
            classes.map((item) => <div>
                <button 
                key={item} 
                className="type-button" 
                onClick={deleteType} 
                type="button" 
                value={item}>{`x ${item}`}</button>
            </div>)}
        </FormWrapper>
    );
}

export default Basic;
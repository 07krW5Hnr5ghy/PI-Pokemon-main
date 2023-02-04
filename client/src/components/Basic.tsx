import FormWrapper from "./FormWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React, { useCallback } from "react";



type BasicData = {
    name:string,
    typesSelected:string[],
}

type BasicProps = BasicData & {
    updateFields:(fields:Partial<BasicData>) => void
}

const Basic = ({name,typesSelected, updateFields}:BasicProps) => {
    const {types} = useSelector((state:RootState) => state.pokemons);
    const deleteType = (e:React.MouseEvent<HTMLButtonElement>) => {
        const buttonValue = e.currentTarget.value;
        updateFields({typesSelected:typesSelected.filter(type => type !== buttonValue)});
    }
    return(
        <FormWrapper title="Create your Pokemon">
            <label htmlFor="" className="new-label">Name</label>
            <input 
            type="text" 
            className="new-input" 
            value={name} 
            onChange={e => updateFields({name:e.target.value})}
            />
            <label htmlFor="" className="new-label">Types</label>
            <select 
            name="" 
            id="" 
            className="new-types new-select" 
            value={typesSelected} 
            onChange={e => {
                if(typesSelected.length < 2){
                    updateFields({typesSelected:typesSelected.concat([e.target.value])})
                }
            }}
            >
                <option value="" selected>select types</option>
                {types.map(item => <option key={item.id}>{item.type}</option>)}
            </select>
            {typesSelected.map((item) => <div>
                <button key={item} onClick={deleteType} type="button" value={item}>{`x ${item}`}</button>
            </div>)}
        </FormWrapper>
    );
}

export default Basic;
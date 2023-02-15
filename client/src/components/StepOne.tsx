import FormWrapper from "./FormWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation } from "react-router-dom";
import { Pokemon } from "../interfaces";



type StepOneData = {
    name:string,
    classes:string[],
}

type StepOneProps = StepOneData & {
    updateFields:(fields:Partial<StepOneData>) => void,
    checkFields:(e:React.ChangeEvent<HTMLInputElement>) => void,
    detail:Pokemon,
    id:string,
}

const StepOne = ({name,classes, updateFields,checkFields,detail,id}:StepOneProps) => {
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
            placeholder={!id?"":detail.name}
            onChange={(e) => {
                updateFields({name:e.target.value});
                checkFields(e);
            }}
            />
            {name.length === 0 ? <p className="form-warning">Input a name for you pokemon</p>
            : name.length > 10 ? <p className="form-error">Maximum length allowed are 10 Characters</p>
            : !/^[A-Za-z]+$/.test(name) ? <p className="form-error">Only alphabetic characters whitout spaces are allowed</p>
            : data.records.find(pokemon => pokemon.name === name) ? (!id ? <p className="form-error">Duplicated name</p> : <p className="form-success">Name is valid</p>)
            : <p className="form-success">this name is valid</p>}
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
            <p className="form-warning">Select at least one type maximum two types</p>:
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

export default StepOne;
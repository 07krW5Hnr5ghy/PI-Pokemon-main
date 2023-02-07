import FormWrapper from "./FormWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation } from "react-router-dom";



type BasicData = {
    name:string,
    classes:string[],
}

type BasicProps = BasicData & {
    updateFields:(fields:Partial<BasicData>) => void
}

const Basic = ({name,classes, updateFields}:BasicProps) => {
    const location = useLocation();
    const {types} = useSelector((state:RootState) => state.pokemons);
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
            value={name} 
            onChange={e => updateFields({name:e.target.value})}
            />
            <label htmlFor="" className="new-label">Types</label>
            <select 
            name="" 
            id="" 
            className="new-types new-select" 
            value={classes} 
            onChange={e => {
                if(classes.length < 2){
                    updateFields({classes:classes.concat([e.target.value])})
                }
            }}
            >
                <option value="" selected>select types</option>
                {types.map(item => <option key={item.id}>{item.type}</option>)}
            </select>
            {classes.map((item) => <div>
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
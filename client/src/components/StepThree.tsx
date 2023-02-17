import FormWrapper from "./FormWrapper";
import { StepThreeProps } from "../tools/interfaces";

const StepThree = ({specialAttack,specialDefense,updateFields,detail,id}:StepThreeProps) => {
    return(
        <FormWrapper title="Special Stats">
            <label htmlFor="" className="new-label">Special Attack</label>
            <input 
            type="number" 
            className="new-input"
            placeholder={!id?"0":detail.specialAttack.toString()}  
            min={1}
            onChange={e => updateFields({specialAttack:Number(e.target.value)})}
            />
            {/* display validation messages for special attack input */}
            {!specialAttack 
            ? <p className="form-warning">set special attack value to at least 1 point</p> 
            : <p className="form-success">special attack is valid</p>}
            <label htmlFor="" className="new-label">Special Defense</label>
            <input 
            type="number" 
            className="new-input"
            placeholder={!id?"0":detail.specialDefense.toString()}
            min={1}
            onChange={e => updateFields({specialDefense:Number(e.target.value)})}
            />
            {/* display validation messages for special defense input */}
            {!specialDefense 
            ? <p className="form-warning">set special defense value to at least 1 point</p> 
            : <p className="form-success">special defense is valid</p>}
        </FormWrapper>
    );
}

export default StepThree;
import FormWrapper from "./FormWrapper";
import { StepTwoProps } from "../tools/interfaces";

const StepTwo = ({attack,defense,updateFields,detail,id}:StepTwoProps) => {
    return(
        <FormWrapper title="Primary Stats">
            <label htmlFor="" className="new-label">Attack</label>
            <input 
            type="number" 
            placeholder={!id?"0":detail.attack.toString()} 
            className="new-input" 
            min={1} 
            onChange={e => updateFields({attack:Number(e.target.value)})}
            />
            {/* displays validation messages for attack input */}
            {!attack 
            ? <p className="form-warning">set attack value to at least 1 point</p> 
            : <p className="form-success">attack is valid</p>}
            <label htmlFor="" className="new-label">Defense</label>
            <input 
            type="number" 
            placeholder={!id?"0":detail.defense.toString()} 
            className="new-input" 
            min={1} 
            onChange={e => updateFields({defense:Number(e.target.value)})}
            />
            {/* displays validation messages for defense input */}
            {!defense 
            ? <p className="form-warning">set defense value to at least 1 point</p> 
            : <p className="form-success">defense is valid</p>}
        </FormWrapper>
    );
}

export default StepTwo;
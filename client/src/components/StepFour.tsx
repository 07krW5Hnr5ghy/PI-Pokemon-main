import FormWrapper from "./FormWrapper";
import { StepFourProps } from "../tools/interfaces";

const StepFour = ({speed,health,updateFields,detail,id}:StepFourProps) => {
    
    return(
        <FormWrapper title="Secondary Stats">
            <label htmlFor="" className="new-label">Speed</label>
            <input 
            type="number" 
            className="new-input"
            placeholder={!id?"0":detail.speed.toString()}  
            min={1}
            onChange={e => updateFields({speed:Number(e.target.value)})}
            />
            {/* display validation messages for speed input */}
            {!speed 
            ? <p className="form-warning">set speed value to at least 1 point</p> 
            : <p className="form-success">speed is valid</p>}
            <label htmlFor="" className="new-label">Health</label>
            <input
            type="number" 
            className="new-input"
            placeholder={!id?"0":detail.health.toString()} 
            min={1}
            onChange={e => updateFields({health:Number(e.target.value)})}
            />
            {/* display validation messages for health input */}
            {!health 
            ? <p className="form-warning">set health value to at least 1 point</p> 
            : <p className="form-success">health is valid</p>}
        </FormWrapper>
    );
}

export default StepFour;
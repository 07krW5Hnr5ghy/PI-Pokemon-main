import FormWrapper from "./FormWrapper";
import { Pokemon } from "../interfaces";

type StepFourData = {
    speed:number,
    health:number,
}

type StepFourProps = StepFourData & {
    updateFields:(fields:Partial<StepFourData>) => void,
    detail:Pokemon,
    id:string,
}



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
            {!speed ? <p className="form-warning">set speed value to at least 1 point</p> : <p className="form-success">speed is valid</p>}
            <label htmlFor="" className="new-label">Health</label>
            <input
            type="number" 
            className="new-input"
            placeholder={!id?"0":detail.health.toString()} 
            min={1}
            onChange={e => updateFields({health:Number(e.target.value)})}
            />
            {!health ? <p className="form-warning">set health value to at least 1 point</p> : <p className="form-success">health is valid</p>}
        </FormWrapper>
    );
}

export default StepFour;
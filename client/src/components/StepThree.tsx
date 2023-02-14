import FormWrapper from "./FormWrapper";

type StepThreeData = {
    specialAttack:number,
    specialDefense:number,
}

type StepThreeProps = StepThreeData & {
    updateFields:(fields:Partial<StepThreeData>) => void
}

const StepThree = ({specialAttack,specialDefense,updateFields}:StepThreeProps) => {
    return(
        <FormWrapper title="Special Stats">
            <label htmlFor="" className="new-label">Special Attack</label>
            <input 
            type="number" 
            className="new-input"  
            min={1}
            onChange={e => updateFields({specialAttack:Number(e.target.value)})}
            />
            {!specialAttack ? <p className="form-warning">set special attack value to at least 1 point</p> : <p className="form-success">special attack is valid</p>}
            <label htmlFor="" className="new-label">Special Defense</label>
            <input 
            type="number" 
            className="new-input"
            min={1}
            onChange={e => updateFields({specialDefense:Number(e.target.value)})}
            />
            {!specialDefense ? <p className="form-warning">set special defense value to at least 1 point</p> : <p className="form-success">special defense is valid</p>}
        </FormWrapper>
    );
}

export default StepThree;
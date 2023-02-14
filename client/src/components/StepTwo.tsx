import FormWrapper from "./FormWrapper";

type StepTwoData = {
    attack:number,
    defense:number,
}

type StepTwoProps = StepTwoData & {
    updateFields:(fields:Partial<StepTwoData>) => void
}

const StepTwo = ({attack,defense,updateFields}:StepTwoProps) => {
    return(
        <FormWrapper title="Primary Stats">
            <label htmlFor="" className="new-label">Attack</label>
            <input type="number" className="new-input" min={1} onChange={e => updateFields({attack:Number(e.target.value)})}/>
            {!attack ? <p className="form-warning">set attack value to at least 1 point</p> : <p className="form-success">attack is valid</p>}
            <label htmlFor="" className="new-label">Defense</label>
            <input type="number" className="new-input" min={1} onChange={e => updateFields({defense:Number(e.target.value)})}/>
            {!defense ? <p className="form-warning">set defense value to at least 1 point</p> : <p className="form-success">defense is valid</p>}
        </FormWrapper>
    );
}

export default StepTwo;
import FormWrapper from "./FormWrapper";

type ADData = {
    attack:number,
    defense:number,
}

type ADProps = ADData & {
    updateFields:(fields:Partial<ADData>) => void
}

const AD = ({attack,defense,updateFields}:ADProps) => {
    return(
        <FormWrapper title="Primary Stats">
            <label htmlFor="">Attack</label>
            <input type="number" className="new-attack" value={attack} onChange={e => updateFields({attack:Number(e.target.value)})}/>
            <label htmlFor="">Defense</label>
            <input type="number" className="new-defense" value={defense} onChange={e => updateFields({defense:Number(e.target.value)})}/>
        </FormWrapper>
    );
}

export default AD;
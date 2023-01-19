import FormWrapper from "./FormWrapper";

type SpecialData = {
    specialAttack:number,
    specialDefense:number,
}

type SpecialProps = SpecialData & {
    updateFields:(fields:Partial<SpecialData>) => void
}

const Special = ({specialAttack,specialDefense,updateFields}:SpecialProps) => {
    return(
        <FormWrapper title="Special Stats">
            <label htmlFor="" className="new-label">Special Attack</label>
            <input 
            type="number" 
            className="new-input" 
            value={specialAttack} 
            onChange={e => updateFields({specialAttack:Number(e.target.value)})}
            />
            <label htmlFor="" className="new-label">Special Defense</label>
            <input 
            type="number" 
            className="new-input" 
            value={specialDefense} 
            onChange={e => updateFields({specialDefense:Number(e.target.value)})}
            />
        </FormWrapper>
    );
}

export default Special;
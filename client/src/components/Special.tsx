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
            //value={specialAttack} 
            min={1}
            onChange={e => updateFields({specialAttack:Number(e.target.value)})}
            />
            {!specialAttack ? <p>set special attack value to at least 1 point</p> : null}
            <label htmlFor="" className="new-label">Special Defense</label>
            <input 
            type="number" 
            className="new-input" 
            // value={specialDefense} 
            min={1}
            onChange={e => updateFields({specialDefense:Number(e.target.value)})}
            />
            {!specialDefense ? <p>set special defense value to at least 1 point</p> : null}
        </FormWrapper>
    );
}

export default Special;
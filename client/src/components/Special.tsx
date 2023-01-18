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
            <label htmlFor="" className="">Special Attack</label>
            <input type="number" className="new-sattack" value={specialAttack} onChange={e => updateFields({specialAttack:Number(e.target.value)})}/>
            <label htmlFor="">Special Defense</label>
            <input type="numbe" className="new-sdefense" value={specialDefense} onChange={e => updateFields({specialDefense:Number(e.target.value)})}/>
        </FormWrapper>
    );
}

export default Special;
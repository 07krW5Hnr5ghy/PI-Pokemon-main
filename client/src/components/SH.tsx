import FormWrapper from "./FormWrapper";

type SHData = {
    speed:number,
    health:number,
}

type SHProps = SHData & {
    updateFields:(fields:Partial<SHData>) => void
}



const SH = ({speed,health,updateFields}:SHProps) => {
    
    return(
        <FormWrapper title="Secondary Stats">
            <label htmlFor="" className="new-label">Speed</label>
            <input 
            type="number" 
            className="new-input" 
            value={speed} 
            min={1}
            onChange={e => updateFields({speed:Number(e.target.value)})}
            />
            {!speed ? <p>set speed value to at least 1 point</p> : null}
            <label htmlFor="" className="new-label">Health</label>
            <input
            type="number" 
            className="new-input" 
            value={health} 
            min={1}
            onChange={e => updateFields({health:Number(e.target.value)})}
            />
            {!health ? <p>set health value to at least 1 point</p> : null}
        </FormWrapper>
    );
}

export default SH;
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
            <label htmlFor="">Speed</label>
            <input type="text" className="new-speed" value={speed} onChange={e => updateFields({speed:Number(e.target.value)})}/>
            <label htmlFor="">Health</label>
            <input type="text" className="new-health" value={health} onChange={e => updateFields({health:Number(e.target.value)})}/>
        </FormWrapper>
    );
}

export default SH;
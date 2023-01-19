import FormWrapper from "./FormWrapper";

type BasicData = {
    name:string,
    types:string,
}

type BasicProps = BasicData & {
    updateFields:(fields:Partial<BasicData>) => void
}

const Basic = ({name,types, updateFields}:BasicProps) => {
    return(
        <FormWrapper title="Create your Pokemon">
            <label htmlFor="" className="new-label">Name</label>
            <input 
            type="text" 
            className="new-input" 
            value={name} 
            onChange={e => updateFields({name:e.target.value})}
            />
            <label htmlFor="" className="new-label">Types</label>
            <select 
            name="" 
            id="" 
            className="new-types new-select" 
            value={types} 
            onChange={e => updateFields({types:e.target.value})}
            >
                <option value="" selected>select types</option>
                <option value="">normal</option>
                <option value="">grass</option>
                <option value="">fire</option>
                <option value="">water</option>
            </select>
        </FormWrapper>
    );
}

export default Basic;
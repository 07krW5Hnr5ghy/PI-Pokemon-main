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
        <FormWrapper title="Create a Pokemon">
            <label htmlFor="">Name</label>
            <input type="text" className="new-name" value={name} onChange={e => updateFields({name:e.target.value})}/>
            <label htmlFor="">Types</label>
            <select name="" id="" className="types" value={types} onChange={e => updateFields({types:e.target.value})}>
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
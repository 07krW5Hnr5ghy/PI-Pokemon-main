import { useState } from "react";
import { Publish } from "@mui/icons-material";
import FormWrapper from "./FormWrapper";
type PictureData = {
    picture:string,
}

type PictureProps = PictureData & {
    updateFields:(fields:Partial<PictureData>) => void
}
const Picture = ({picture,updateFields} : PictureProps) => {
    const [upload,setUpload] = useState<boolean>(false);
    const toggleUpload = () => {
        setUpload(!upload);
    }
    return(
        <FormWrapper title="Set an image">
            {!upload ? 
                <div className="picture">
                    <label htmlFor="picture" className="new-label">Picture mode</label>
                    <button className="mode" type="button" onClick={toggleUpload}>
                        Upload file
                    </button>
                    <input type="text" className="new-input" name="picture" value={picture} onChange={e => updateFields({picture:e.target.value})}/>
                </div>
                     :
                <div className="picture">
                    <label htmlFor="picture" className="new-label">Picture</label>
                    <button className="mode" type="button" onClick={toggleUpload}>
                        Paste url
                    </button>
                    <label htmlFor="file" className="new-label file">
                        <Publish/>
                    </label>
                <input type="file" className="new-input" name="file" id="file" style={{display:"none"}} value={picture} onChange={e => updateFields({picture:e.target.value})}/>
            </div>
                }
        </FormWrapper>
    );
}

export default Picture;
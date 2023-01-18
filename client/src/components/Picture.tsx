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
                <div>
                    <label htmlFor="picture" className="new-label">PICTURE</label>
                    <div className="mode" onClick={toggleUpload}>
                        Paste url
                    </div>
                    <label htmlFor="file" className="new-label file">
                        <Publish/>
                    </label>
                    <input type="file" className="new-data picture" name="file" id="file" style={{display:"none"}} value={picture} onChange={e => updateFields({picture:e.target.value})}/>
                </div>
                     :
                <div>
                    <label htmlFor="picture" className="new-label">PICTURE</label>
                    <div className="mode" onClick={toggleUpload}>
                        Upload file
                    </div>
                    <input type="text" className="new-data picture" name="picture" value={picture} onChange={e => updateFields({picture:e.target.value})}/>
                </div>
                }
        </FormWrapper>
    );
}

export default Picture;
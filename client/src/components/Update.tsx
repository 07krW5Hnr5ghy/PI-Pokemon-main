import Nav from "./Nav";
import { useState } from "react";
import { Publish } from "@mui/icons-material";

const Update = () => {
    const [upload,setUpload] = useState<boolean>(false); 
    const toggleUpload = () => {
        setUpload(!upload);
    }
    return(
        <div className="container">
            <Nav/>
            <form className="form">
                <div className="column first">
                    <label htmlFor="types" className="new-label">TYPES</label>
                    <select name="types" id="" className="types">
                        <option value="type" selected disabled>select type</option>
                        <option value="normal">normal</option>
                        <option value="grass">grass</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                    </select>
                </div>
                <div className="column second">
                    <label htmlFor="attack" className="new-label">ATTACK</label>
                    <input type="number" name="attack" className="new-data attack" min={1}/>
                    <label htmlFor="defense" className="new-label">DEFENSE</label>
                    <input type="number" name="defense" className="new-data defense" min={1}/>
                    <label htmlFor="special-attack" className="new-label">SPECIAL ATTACK</label>
                    <input type="number" name="special-attack" className="new-data special-attack" min={1} />
                    <label htmlFor="special-defense" className="new-label">SPECIAL DEFENSE</label>
                    <input type="number" name="special-defense" className="new-data special-defense" min={1} />
                    <label htmlFor="speed" className="new-label">SPEED</label>
                    <input type="number" name="speed" className="new-data speed" min={1} />
                    <label htmlFor="health" className="new-label">HEALTH</label>
                    <input type="number" name="health" className="new-data health" min={1} />
                </div>
                <div className="column third">
                    {!upload ? 
                    <div className="upload">
                        <div className="button" onClick={toggleUpload}>
                            Upload
                        </div>
                        <label htmlFor="file" className="new-label">
                            <Publish/>
                        </label>
                        <input type="file" className="new-data picture" name="file" id="file" style={{display:"none"}}/>
                    </div> 
                     :
                    <div className="upload">
                        <div className="link" onClick={toggleUpload}>
                            Link
                        </div>
                        <label htmlFor="picture" className="new-label">PICTURE</label>
                        <input type="text" className="new-data picture" name="picture" />
                    </div>
                    }
                </div>
                <div className="submit">
                    <button className="send">CREATE</button>
                </div>
            </form>
        </div>
    )
}

export default Update;
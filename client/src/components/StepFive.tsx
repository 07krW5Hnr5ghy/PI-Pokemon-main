import React, { useState } from "react";
import { Publish } from "@mui/icons-material";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import app from '../firebase';
import FormWrapper from "./FormWrapper";

type StepFiveData = {
    picture:string,
}

type StepFiveProps = StepFiveData & {
    updateFields:(fields:Partial<StepFiveData>) => void,
    checkFields:(e:React.ChangeEvent<HTMLInputElement>) => void,
}

const StepFive = ({picture,updateFields,checkFields} : StepFiveProps) => {
    const [upload,setUpload] = useState<boolean>(false);
    const [errorMessage,setErrorMessage] = useState('No file selected');
    const toggleUpload = () => {
        setUpload(!upload);
    }
    const [file,setFile] = useState<File|null>(null);
    const handleFileInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        checkFields(e);
        if(!e.target.files?.[0]){
            setErrorMessage('No file selected');
        }else if(!e.target.files?.[0].type.startsWith('image/jpeg') 
        && !e.target.files?.[0].type.startsWith('image/png')
        && !e.target.files?.[0].type.startsWith('image/webp')){
            setErrorMessage('invalid file format try again');
        }        
        else{
            setErrorMessage('');
            setFile(e.target.files?.[0]!);
        }
        
    }
    const handleUpload = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file?.name!; 
        const storage = getStorage(app);
        const storageRef = ref(storage,fileName);
        //const reader = new FileReader();
        if(file){
            //reader.readAsArrayBuffer(file);
             // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            const uploadTask = uploadBytesResumable(storageRef,file);
            uploadTask.on('state_changed',(snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch(snapshot.state){
                    case 'paused':
                        console.log('Upload is paused');
                    break;
                    case 'running':
                        console.log('Upload is paused');
                    break;
                    default:
                }
            },(error)=>{
                // handle unsuccesfull uploads
                console.log("failed upload with error: ",error);
            },() => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateFields({picture:downloadURL});
                });
            });

        }else{
            console.log("file not exist");
        }

    }
    console.log(file);
    return(
        <FormWrapper title="Select your pokemon picture">
            {!upload ? 
                <div className="picture">
                    <label htmlFor="picture" className="new-label">Picture mode</label>
                    <button className="mode" type="button" onClick={toggleUpload}>
                        Upload file
                    </button>
                    <input 
                    type="text" 
                    className="new-input" 
                    name="picture" 
                    value={picture}
                    required
                    onChange={(e) => {
                        updateFields({picture:e.target.value});
                        checkFields(e);
                    }}
                    />
                    {!picture ? <p className="form-warning">url of image is required</p> 
                    : !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|webp|jpeg)/.test(picture) 
                    ? <p className="form-error">input a valid image url of a file of the extensions jpg,png,jpeg or webp</p>
                    : <p className="form-success">picture url is valid</p>}
                </div>
                     :
                <div className="picture">
                    <label htmlFor="picture" className="new-label">Picture mode</label>
                    <button className="mode" type="button" onClick={toggleUpload}>
                        Paste url
                    </button>
                    <label htmlFor="file" className="new-label file">
                        <Publish/>
                    </label>
                    <input 
                    type="file" 
                    className="new-input" 
                    name="file" 
                    id="file"
                    required 
                    style={{display:"none"}}
                    onChange={handleFileInputChange}
                    />
                    <p className="form-warning">Upload a jpg, png or webp file for the picture</p>
                    {errorMessage ? <p className="form-error">{errorMessage}</p> 
                    : <p className="form-success">valid file</p>}
                    {file?.name ? 
                    <div className="upload-confirm">
                        <p className="file-selected">File selected: {file.name}</p>
                        <button 
                        className="upload-file" 
                        type="button" 
                        onClick={handleUpload}>
                            Upload file
                        </button>
                    </div> : null}
                </div>
                }
        </FormWrapper>
    );
}

export default StepFive;
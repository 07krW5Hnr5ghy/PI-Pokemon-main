import { getPokemons,getTypes,postCreate,updatePokemon } from '../redux/actions';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Nav from "./Nav";
import {validate} from "./utils";

const Form = () => {
    const dispatch = useDispatch();
    const [mode,setMode] = useState("create");
    const [file,setFile] = useState();
    const [fileName,setFileName] = useState("");
    const [img,setImg] = useState("url");
    const [input,setInput] = useState({
        name:"",
        hp:0,
        classes:[],
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        img:"https://i.pinimg.com/originals/e3/4f/ac/e34facd1e788d09f2bfcbc2f37f548ce.png",
    });

    const [errors,setErrors] = useState({
        name:"",
        hp:'',
        classes:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        img:'',
    });
    
    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    },[dispatch]);

    const types = useSelector(state => state.reducerPokemon.types);

    const pokemons = useSelector(state => state.reducerPokemon.pokemons);

    const handleChange = (event,mode) => {
        setInput({
            ...input,
            [event.target.name]:event.target.value,
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]:event.target.value,
            },pokemons,mode)
        );
    }

    const handleName = (event,mode) => {
        setInput({
            ...input,
            name:event.target.value.toLowerCase(),
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]:event.target.value,
            },pokemons,mode)
        );
    }

    const handleId = (event,mode) => {
        setInput({
            ...input,
            id:event.target.value,
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]:event.target.value,
            },pokemons,mode)
        )
    }

    const handleTypes = (event) => {
        
        setInput({
            ...input,
            classes:[...input.classes,event.target.value],
        });
        
    }

    const handleDelete = (type) => {
        setInput({
            ...input,
            classes:input.classes?.filter((kind) => kind !== type),
        });
    }

    const handleSubmit = (event,mode) => {
        if(mode === "create"){
            dispatch(postCreate(input));
            setInput({
                name:'',
                hp:0,
                classes:[],
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                img:"https://i.pinimg.com/originals/e3/4f/ac/e34facd1e788d09f2bfcbc2f37f548ce.png",
            });
            setErrors({
                name:'',
                hp:'',
                classes:'',
                attack:'',
                defense:'',
                speed:'',
                height:'',
                weight:'',
                img:'',
            });
            alert("Pokemon created succesfully");
        }else if(mode === "update"){
            dispatch(updatePokemon(input));
            setInput({
                id:'',
                hp:0,
                classes:[],
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                img:"",
            });
            setErrors({
                id:'',
                hp:'',
                classes:'',
                attack:'',
                defense:'',
                speed:'',
                height:'',
                weight:'',
                img:'',
            });
            alert("Pokemon updated succesfully");
        }
        
    }

    const handleMode = (event) => {
        event.preventDefault();
        if(mode === "create"){
            setMode("update");
            setInput({
                id:"",
                hp:0,
                classes:[],
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                img:"",
            });
            setErrors({
                id:"",
                hp:'',
                classes:'',
                attack:'',
                defense:'',
                speed:'',
                height:'',
                weight:'',
                img:'',
            });
        }

        if(mode === "update"){
            setMode("create");
            setInput({
                name:"",
                hp:0,
                classes:[],
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                img:"https://i.pinimg.com/originals/e3/4f/ac/e34facd1e788d09f2bfcbc2f37f548ce.png",
            });

            setErrors({
                name:"",
                hp:'',
                classes:'',
                attack:'',
                defense:'',
                speed:'',
                height:'',
                weight:'',
                img:'',
            });
        }

    }

    const handleImg = (e) => {
        e.preventDefault();
        if(img === "url"){
            setImg("file");
        }

        if(img === "file"){
            setImg("url");
        }
    }

    const saveFile = async (event,mode,img,file) => {
        event.preventDefault();
        await setFile(event.target.files[0]);
        await setFileName(event.target.files[0].name);
        setInput({
            ...input,
            img:fileName,
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]:event.target.value,
            },pokemons,mode,img,file)
        );
    }

    const uploadImg = () => {
        const formData = new FormData();
    }

    const options = types.map(type => <option key={type.id} value={type.name}>{type.name}</option>)

    console.log(file);
    console.log(fileName);
    console.log(input);
    
    return(
        <>
            <Nav/>
            <div id="Create_container">   
                <h2>Create new pokemon</h2>
                <button onClick={(e) => handleMode(e)}>set mode</button>
                {<span>{mode}</span>}
                <form onSubmit={(e) => handleSubmit(e,mode)} id="Create_form">
                    <div id='Create_fieldset'>
                        {mode === "create" ? <label>Name:
                        <input type="text" name="name" value={input.name} onChange={(e) => handleName(e,mode)} placeholder="type name of new pokemon"/>
                            {errors.name && (<span className={errors.name === "is valid" ? "correct" : "error"}>{errors.name}</span>)}
                        </label> : <label>Id:
                        <input type="text" name="id" value={input.id} onChange={(e) => handleId(e,mode)} placeholder="write id of created pokemon"/>
                            {errors.id && (<span className={errors.id === "is valid" ? "correct" : "error"}>{errors.id}</span>)}
                        </label>}
                        <label id="Create_select">Types:
                            <select name="classes" defaultValue={"DEFAULT"} value={input.classes} onChange={handleTypes} disabled={input.classes.length >= 2}>
                                <option value="DEFAULT" disabled>Please choose types --</option>
                                {options}
                            </select>
                            {input.classes?.map((type,index)=> (<div key={index}>
                                <span className='Create_types' onClick={() => handleDelete(type)}>{`${type} x`}</span>
                            </div>))}
                            {errors.classes && (<span className={errors.classes === "is valid" ? "correct" : "error"}>{errors.classes}</span>)}
                        </label>
                        <label>Health:
                            <input type="number" name="hp" value={input.hp} onChange={(e) => handleChange(e,mode)}/>
                            {errors.hp && (<span className={errors.hp === "is valid" ? "correct" : "error"}>{errors.hp}</span>)}
                        </label>
                        <label>Attack:
                            <input type="number" name="attack" value={input.attack} onChange={(e) => handleChange(e,mode)}/>
                            {errors.attack && (<span className={errors.attack === "is valid" ? "correct" : "error"}>{errors.attack}</span>)}
                        </label>
                        <label>Defense:
                            <input type="number" name="defense" value={input.defense} onChange={(e) => handleChange(e,mode)}/>
                            {errors.defense && (<span className={errors.defense === "is valid" ? "correct" : "error"}>{errors.defense}</span>)}
                        </label>
                        <label>Speed:
                            <input type="number" name="speed" value={input.speed} onChange={(e) => handleChange(e,mode)}/>
                            {errors.speed && (<span className={errors.speed === "is valid" ? "correct" : "error"}>{errors.speed}</span>)}
                        </label>
                        <label>Height:
                            <input type="number" name="height" value={input.height} onChange={(e) => handleChange(e,mode)}/>
                            {errors.height && (<span className={errors.height === "is valid" ? "correct" : "error"}>{errors.height}</span>)}
                        </label>
                        <label>Weight:
                            <input type="number" name="weight" value={input.weight} onChange={(e) => handleChange(e,mode)}/>
                            {errors.weight && (<span className={errors.weight === "is valid" ? "correct" : "error"}>{errors.weight}</span>)}
                        </label>
                        <label>
                            <button onClick={(e) => handleImg(e)}>mode</button>
                            {<span>{img}</span>}
                        </label>
                        {/*<label className={img === "url" ? "" : ""}>Image:
                            <input type="text" name={img === "url" ? "img" : ""} value={img === "url" ? input.img : ""} onChange={(e) => handleChange(e,mode)}/>
                            {errors.img && (<span className={errors.img === "is valid" ? "correct" : "error"}>{errors.img}</span>)}
                        </label>
                        <label className={img === "file" ? "" : ""} >Upload file:
                            <input type="file" name={img === "file" ? "img" : ""} value={img === "file" ? input.img : ""} onChange={(e) => handleChange(e,mode)}/>
                            {errors.img && (<span className={errors.img === "is valid" ? "correct" : "error"}>{errors.img}</span>)}
                            </label>*/}
                        <label>Image:
                            {img === "url" ? <input type="text" name="img" value={input.img} onChange={(e) => handleChange(e,mode)} /> : 
                            <>
                                <input type="file" name="img" onChange={(e) => saveFile(e,mode,img,file)}/>
                                {errors.img && (<span className={errors.img === "is valid" ? "correct" : "error"}>{errors.img}</span>)}
                                <button disabled={errors.img === "is valid" ? "" : "disabled"}>upload file</button>
                            </>}
                        </label>
                        <input type="submit" value="Submit" disabled={Object.values(errors).every(item => 
                        item === "is valid") ? "" : "disabled"}/>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;
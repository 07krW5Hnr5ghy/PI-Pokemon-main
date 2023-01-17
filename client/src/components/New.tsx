import Nav from "./Nav";
import { useState } from "react";
import { Publish } from "@mui/icons-material";


const New = () => {
    const [upload,setUpload] = useState<boolean>(false); 
    const toggleUpload = () => {
        setUpload(!upload);
    }
    return(
        <div className="container">
            <Nav/>
            <div className="new-title">
                <h2>Create a Pokemon</h2>
            </div>
            <form className="form">
                <div className="column first">
                    <label htmlFor="name" className="new-label">NAME</label>
                    <input type="text" name="name" className="new-data name" placeholder="Enter a name" />
                    <label htmlFor="types" className="new-label">TYPES</label>
                    <select name="types" id="" className="new-types new-data">
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
                    {!upload ? 
                <div className="column third">
                        <label htmlFor="picture" className="new-label">PICTURE</label>
                        <div className="mode" onClick={toggleUpload}>
                            Link
                        </div>
                        <label htmlFor="file" className="new-label file">
                            <Publish/>
                        </label>
                        <input type="file" className="new-data picture" name="file" id="file" style={{display:"none"}}/>
                    </div> 
                     :
                    <div className="column third">
                        <label htmlFor="picture" className="new-label">PICTURE</label>
                        <div className="mode" onClick={toggleUpload}>
                            File
                        </div>
                        <input type="text" className="new-data picture" name="picture" />
                    </div>
                    }
                <div className="submit">
                    <button className="send">CREATE</button>
                </div>
            </form>
        </div>
    )
}

export default New;

/*import { getPokemons,getTypes,postCreate,updatePokemon } from '../redux/pokemonActions';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Nav from "./Nav";
import {validate} from "./utils";

const Form = () => {
    const dispatch = useDispatch();
    const [mode,setMode] = useState("create");
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

    const options = types.map(type => <option key={type.id} value={type.name}>{type.name}</option>)
    
    return(
        <>
            <Nav/>
            <div id="Create_container">
                <button onClick={(e) => handleMode(e)} id="Form_mode">set mode</button>
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
                        <label>Image:
                            <input type="text" name="img" value={input.img} onChange={(e) => handleChange(e,mode)}/>
                            {errors.img && (<span className={errors.img === "is valid" ? "correct" : "error"}>{errors.img}</span>)}
                        </label>
                        <input type="submit" value="Submit" disabled={Object.values(errors).every(item => 
                        item === "is valid") ? "" : "disabled"}/>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;*/
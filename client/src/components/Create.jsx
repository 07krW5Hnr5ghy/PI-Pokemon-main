import { getPokemons,getTypes,postCreate } from '../redux/actions';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Nav from "./Nav";
import {validate} from "./utils";

const Create = () => {
    const dispatch = useDispatch();
    const [input,setInput] = useState({
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
    const [errors,setErrors] = useState({
        name:'',
        hp:'',
        classes:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        img:'',
    })

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    },[dispatch]);

    const types = useSelector(state => state.reducerPokemon.types);

    const pokemons = useSelector(state => state.reducerPokemon.pokemons);

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]:event.target.value,
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]:event.target.value,
            },pokemons)
        );
    }

    const handleName = (event) => {
        setInput({
            ...input,
            name:event.target.value.toLowerCase(),
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]:event.target.value,
            },pokemons)
        );
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

    const handleSubmit = (event) => {
        event.preventDefault();
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
    }

    const options = types.map(type => <option key={type.id} value={type.name}>{type.name}</option>)

    return(
        <>
            <Nav/>
            <div id="Create_container">   
                <h2>Create new pokemon</h2>
                <form onSubmit={handleSubmit} id="Create_form">
                    <div id='Create_fieldset'>
                    <label>Name:
                        <input type="text" name="name" value={input.name} onChange={handleName} placeholder="type name of new pokemon"/>
                        {errors.name && (<span className={errors.name === "is valid" ? "correct" : "error"}>{errors.name}</span>)}
                    </label>
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
                        <input type="number" name="hp" value={input.hp} onChange={handleChange}/>
                        {errors.hp && (<span className={errors.hp === "is valid" ? "correct" : "error"}>{errors.hp}</span>)}
                    </label>
                    <label>Attack:
                        <input type="number" name="attack" value={input.attack} onChange={handleChange}/>
                        {errors.attack && (<span className={errors.attack === "is valid" ? "correct" : "error"}>{errors.attack}</span>)}
                    </label>
                    <label>Defense:
                        <input type="number" name="defense" value={input.defense} onChange={handleChange}/>
                        {errors.defense && (<span className={errors.defense === "is valid" ? "correct" : "error"}>{errors.defense}</span>)}
                    </label>
                    <label>Speed:
                        <input type="number" name="speed" value={input.speed} onChange={handleChange}/>
                        {errors.speed && (<span className={errors.speed === "is valid" ? "correct" : "error"}>{errors.speed}</span>)}
                    </label>
                    <label>Height:
                        <input type="number" name="height" value={input.height} onChange={handleChange}/>
                        {errors.height && (<span className={errors.height === "is valid" ? "correct" : "error"}>{errors.height}</span>)}
                    </label>
                    <label>Weight:
                        <input type="number" name="weight" value={input.weight} onChange={handleChange}/>
                        {errors.weight && (<span className={errors.weight === "is valid" ? "correct" : "error"}>{errors.weight}</span>)}
                    </label>
                    <label>Image:
                        <input type="text" name="img" value={input.img} onChange={handleChange}/>
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

export default Create;
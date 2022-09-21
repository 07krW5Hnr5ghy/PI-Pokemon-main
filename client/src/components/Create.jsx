import { getPokemons,getTypes,postCreate } from '../redux/actions';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Nav from "./Nav";


const validate = (input,pokemons) => {
    let errors = {};

    if(!input.name){
        errors.name = 'Name is required';
    }else if(!/^[A-Za-z]+$/.test(input.name) || input.name.length > 10){
        errors.name = 'Name is invalid enter alphabet characters only and 10 Characters as maximum';
    }else if(pokemons.find(pokemon => pokemon.name === input.name)){
        errors.name = 'Name already exists in the pokemons list';
    }else{
        errors.name = "no error";
    }

    if(!input.classes.length){
        errors.classes = 'Select at least one type to create pokemon';
    }else if(input.classes.length > 2){
        errors.classes = "Maximum two types allowed";
    }else{
        errors.name = "no error";
    }

    let stats = ["attack","hp","defense","speed","height","weight"];

    for(let stat of stats){
        if(!/^[0-9]+$/.test(input[stat]) || input[stat] <= 0){
            errors[stat] = `${stat} is invalid please input a number greather than zero in this field`;
        }else{
            errors[stat] = "no error";
        }
    }

    if(!input.img){
        errors.img = 'Image is required';
    }else if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png|webp)/.test(input.img)){
        errors.img = 'input a valid image url of a file of the extensions jpg,svg,png or webp';
    }else{
        errors.img = "no error";
    }

    return errors;
}



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
        img:"",
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

    console.log(types);

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

    const handleTypes = (event) => {
        
        setInput({
            ...input,
            classes:input.classes.concat([event.target.value]),
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postCreate(input));
    }

    console.log(input);
    console.log(errors);

    const options = types.map(type => <option key={type.id} value={type.name}>{type.name}</option>)

    return(
        <>
            <Nav/>
            <h1>Create</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <label>Name:</label>
                <input type="text" name="name" value={input.name} onChange={handleChange}/>
                {errors.name && (<p className='danger'>{errors.name}</p>)}
                <label>Hp:</label>
                <input type="number" name="hp" value={input.hp} onChange={handleChange}/>
                {errors.hp && (<p className='danger'>{errors.hp}</p>)}
                <label>Attack:</label>
                <input type="number" name="attack" value={input.attack} onChange={handleChange}/>
                {errors.attack && (<p className='danger'>{errors.attack}</p>)}
                <label>Defense:</label>
                <input type="number" name="defense" value={input.defense} onChange={handleChange}/>
                {errors.defense && (<p className='danger'>{errors.defense}</p>)}
                <label>Speed:</label>
                <input type="number" name="speed" value={input.speed} onChange={handleChange}/>
                {errors.speed && (<p className='danger'>{errors.speed}</p>)}
                <label>Height:</label>
                <input type="number" name="height" value={input.height} onChange={handleChange}/>
                {errors.height && (<p className='danger'>{errors.height}</p>)}
                <label>Weight:</label>
                <input type="number" name="weight" value={input.weight} onChange={handleChange}/>
                {errors.weight && (<p className='danger'>{errors.weight}</p>)}
                <label>Types:</label>
                <select name="classes" value={input.classes} onChange={handleTypes} multiple>
                    <option value="" disabled>Please choose types --</option>
                    {options}
                </select>
                {errors.classes && (<p className='danger'>{errors.classes}</p>)}
                <label>Image:</label>
                <input type="text" name="img" value={input.img} onChange={handleChange}/>
                {errors.img && (<p className='danger'>{errors.img}</p>)}
                <input type="submit" value="Submit" disabled={Object.values(errors).every(item => 
                item === "no error") ? "" : "disabled"}/>
                </fieldset>
            </form>
        </>
    );
};

export default Create;
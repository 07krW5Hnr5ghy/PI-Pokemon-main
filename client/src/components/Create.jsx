import { getPokemons,getTypes,postCreate } from '../redux/actions';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Nav from "./Nav";


const validate = (input,pokemons) => {
    let errors = {};

    if(!input.name){
        errors.name = 'Please write a name for the new pokemon';
    }else if(!/^[A-Za-z]+$/.test(input.name) || input.name.length > 10){
        errors.name = 'Name is invalid enter alphabet characters only and 10 Characters as maximum';
    }else if(pokemons.find(pokemon => pokemon.name === input.name)){
        errors.name = 'Name already exists in the pokemons list';
    }else{
        errors.name = "correct";
    }

    if(!input.classes.length){
        errors.classes = 'Select at least one type to create pokemon';
    }else if(input.classes.length > 2){
        errors.classes = "Maximum two types allowed";
    }else{
        errors.name = "correct";
    }

    let stats = ["attack","hp","defense","speed","height","weight"];

    for(let stat of stats){
        if(!/^[0-9]+$/.test(input[stat]) || input[stat] <= 0){
            errors[stat] = `${stat} is invalid please input a number greather than zero in this field`;
        }else{
            errors[stat] = "correct";
        }
    }

    if(!input.img){
        errors.img = 'url of image is required';
    }else if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png|webp)/.test(input.img)){
        errors.img = 'input a valid image url of a file of the extensions jpg,svg,png or webp';
    }else{
        errors.img = "correct";
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
            <div id="Create_container">   
                <h2>Create new pokemon</h2>
                <form onSubmit={handleSubmit} id="Create_form">
                    <fieldset id='Create_fieldset'>
                    <label>Name:
                        <input type="text" name="name" value={input.name} onChange={handleName}/>
                        {errors.name && (<span className={errors.name === "correct" ? "correct" : "error"}>{errors.name}</span>)}
                    </label>
                    <label>Health:
                        <input type="number" name="hp" value={input.hp} onChange={handleChange}/>
                        {errors.hp && (<span className={errors.hp === "correct" ? "correct" : "error"}>{errors.hp}</span>)}
                    </label>
                    <label>Attack:
                        <input type="number" name="attack" value={input.attack} onChange={handleChange}/>
                        {errors.attack && (<span className={errors.attack === "correct" ? "correct" : "error"}>{errors.attack}</span>)}
                    </label>
                    <label>Defense:
                        <input type="number" name="defense" value={input.defense} onChange={handleChange}/>
                        {errors.defense && (<span className={errors.defense === "correct" ? "correct" : "error"}>{errors.defense}</span>)}
                    </label>
                    <label>Speed:
                        <input type="number" name="speed" value={input.speed} onChange={handleChange}/>
                        {errors.speed && (<span className={errors.speed === "correct" ? "correct" : "error"}>{errors.speed}</span>)}
                    </label>
                    <label>Height:
                        <input type="number" name="height" value={input.height} onChange={handleChange}/>
                        {errors.height && (<span className={errors.height === "correct" ? "correct" : "error"}>{errors.height}</span>)}
                    </label>
                    <label>Weight:
                        <input type="number" name="weight" value={input.weight} onChange={handleChange}/>
                        {errors.weight && (<span className={errors.weight === "correct" ? "correct" : "error"}>{errors.weight}</span>)}
                    </label>
                    <label>Types:
                        <select name="classes" defaultValue={"DEFAULT"} value={input.classes} onChange={handleTypes} multiple>
                            <option value="DEFAULT" disabled>Please choose types --</option>
                            {options}
                        </select>
                        {errors.classes && (<span className={errors.name === "correct" ? "correct" : "error"}>{errors.classes}</span>)}
                    </label>
                    <label>Image:
                        <input type="text" name="img" value={input.img} onChange={handleChange}/>
                        {errors.img && (<span className={errors.name === "correct" ? "correct" : "error"}>{errors.img}</span>)}
                    </label>
                    <input type="submit" value="Submit" disabled={Object.values(errors).every(item => 
                    item === "correct") ? "" : "disabled"}/>
                    </fieldset>
                </form>
            </div>
        </>
    );
};

export default Create;
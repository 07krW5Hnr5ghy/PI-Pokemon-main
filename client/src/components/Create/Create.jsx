import './Create.css';
import { getTypes,postCreate } from '../../redux/actions';
import { useState,useEffect,useCallback,useMemo } from 'react';
import { useDispatch,useSelector } from 'react-redux';

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

    const types = useSelector(state => state.reducerPokemon.types);

    console.log(types);

    useEffect(() => {
        dispatch(getTypes());
    },[]);

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]:event.target.value,
        });
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

    const options = types.map(type => <option key={type.id} value={type.name}>{type.name}</option>)

    return(
        <div>
            <h1>Create</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <label>Name:</label>
                <input type="text" name="name" value={input.name} onChange={handleChange}/>
                <label>Hp:</label>
                <input type="number" name="hp" value={input.hp} onChange={handleChange}/>
                <label>Attack:</label>
                <input type="number" name="attack" value={input.attack} onChange={handleChange}/>
                <label>Defense:</label>
                <input type="number" name="defense" value={input.defense} onChange={handleChange}/>
                <label>Speed:</label>
                <input type="number" name="speed" value={input.speed} onChange={handleChange}/>
                <label>Height:</label>
                <input type="number" name="height" value={input.height} onChange={handleChange}/>
                <label>Weight:</label>
                <input type="number" name="weight" value={input.weight} onChange={handleChange}/>
                <label>Types:</label>
                <select name="classes" value={input.classes} onChange={handleTypes} multiple>
                    <option value="" disabled>Please choose types --</option>
                    {options}
                </select>
                <label>Image:</label>
                <input type="text" name="img" value={input.img} onChange={handleChange}/>
                <input type="submit" value="Submit"/>
                </fieldset>
            </form>
        </div>
    );
};

export default Create;
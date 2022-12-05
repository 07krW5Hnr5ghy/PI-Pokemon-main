/*import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePokemon,getPokemons,flushPokemons } from "../redux/pokemonActions";


const Pokemon = ({name,img,classes,id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteCard = async (id) => {
        await dispatch(deletePokemon(id));
        dispatch(flushPokemons());
        dispatch(getPokemons());
        navigate("/pokemons");
        alert("Pokemon deleted");
    }
    return(
        <div className="Pokemon_card">
            <h2>{`< ${name.charAt(0).toUpperCase() + name.slice(1)} >`}</h2>
            <img src={img} alt={name.charAt(0).toUpperCase() + name.slice(1)}/>
            <div id="Pokemon_types">
                {classes.map(type => <span key={type}>{type}</span>)}
            </div>
            <Link to={`/pokemons/${id}`}>
                <p>{"< details >"}</p>
            </Link>
            {/^[0-9]*c$/.test(id) ? 
            <button id="Pokemon_delete" onClick={() => deleteCard(id)}>Delete</button> : []}
        </div>
    );
}

export default Pokemon;*/
export const pokemon : string = "pokemon";
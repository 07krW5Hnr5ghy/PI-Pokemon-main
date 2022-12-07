import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { deleteRecord } from "../redux/pokemonActions";

const Card = ({name,img,classes,id} : {name:string,img:string,classes:string[],id:string}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return(
        <div className="Pokemon_card">
            <h2>{`< ${name.charAt(0).toUpperCase()}${name.slice(1)} >`}</h2>
            <img src={img} alt={`${name.charAt(0).toUpperCase}${name.slice(1)}`} loading="lazy"/>
            <div id="Pokemon_types">
                {classes.map(type => <span key={type}>{type}</span>)}
            </div>
            <Link to={`/pokemons/${id}`}>
                <p>{"< details >"}</p>
            </Link>
            {!/^[0-9]*c$/.test(id) ? null : 
            <button id="Pokemon_delete" onClick={() => {
                dispatch(deleteRecord(id));
                navigate("/pokemons");
                alert("Pokemon deleted");
            }}>Delete</button> }
        </div>
    );
}

export default Card;

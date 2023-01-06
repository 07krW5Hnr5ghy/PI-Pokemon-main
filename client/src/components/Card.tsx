import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { deleteRecord } from "../redux/pokemonActions";

const Card = ({name,img,classes,id} : {name:string,img:string,classes:string[],id:string}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return(
        <Link to={`/pokemons/${id}`}>
            <div className="Pokemon_card">
                <img className="Image" src={img} alt={`${name.charAt(0).toUpperCase}${name.slice(1)}`} loading="lazy"/>
                <div className="Info">
                    <h2 className="Title">{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</h2>
                    <div className="Types">
                        {classes.map(type => <span className="Type" key={type}>{type}</span>)}
                    </div>
                    {!/^[0-9]*c$/.test(id) ? null : 
                    <button id="Pokemon_delete" onClick={() => {
                        dispatch(deleteRecord(id));
                        navigate("/pokemons");
                        alert("Pokemon deleted");
                    }}>Delete</button> }
                </div>
            </div>
        </Link>
    );
}

export default Card;

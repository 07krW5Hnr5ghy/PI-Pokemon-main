import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";

const Card = ({name,img,classes,id} : {name:string,img:string,classes:string[],id:string}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return(
        <Link to={`/pokemons/${id}`}>
            <div className="pokemon-card">
                <img className="image" src={img} alt={name} loading="lazy"/>
                <div className="info">
                    <h1 className="title">{name}</h1>
                    <div className="types-container">
                        {classes.map(type => <span className="type" key={type}>{type}</span>)}
                    </div>
                    {!/^[0-9]*c$/.test(id) ? null : 
                    <button id="pokemon-delete" onClick={() => {
                        //dispatch(deleteRecord(id));
                        navigate("/pokemons");
                        alert("Pokemon deleted");
                    }}>Delete</button> }
                </div>
            </div>
        </Link>
    );
}

export default Card;

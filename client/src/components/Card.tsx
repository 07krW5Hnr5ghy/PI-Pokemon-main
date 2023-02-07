import { Link } from "react-router-dom";

const Card = ({name,img,classes,id} : {name:string,img:string,classes:string[],id:string}) => {
    return(
        <Link to={`/pokemons/${id}`}>
            <div className="pokemon-card">
                <img className="image" src={img} alt={name} loading="lazy"/>
                <div className="info">
                    <h1 className="title">{name}</h1>
                    <div className="types-container">
                        {classes.map(type => <span className="type" key={type}>{type}</span>)}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Card;

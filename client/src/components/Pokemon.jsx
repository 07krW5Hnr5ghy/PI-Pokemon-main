import {Link} from "react-router-dom";


const Pokemon = ({name,img,classes,id}) => {
    let displayName = name.split("");
    displayName[0] = name[0].toUpperCase();
    displayName = displayName.join("");
    return(
        <div className="Pokemon_card">
            <h2>{`< ${displayName} >`}</h2>
            <img src={img} alt={displayName}/>
            <div className="Pokemon_types">
                {classes.map(type => <span key={type}>{type}</span>)}
            </div>
            <Link to={`/pokemons/${id}`}>
                <p>{"< details >"}</p>
            </Link>
        </div>
    );
}

export default Pokemon;
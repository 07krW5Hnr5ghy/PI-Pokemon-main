import {Link} from "react-router-dom";


const Pokemon = ({name,img,classes,id}) => {
    return(
        <div class="Pokemon_card">
            <h2><Link to={`/pokemons/${id}`}>{name}</Link></h2>
            <img src={img} alt={name}/>
            {classes.map(type => <p key={type}>{type}</p>)}
        </div>
    );
}

export default Pokemon;
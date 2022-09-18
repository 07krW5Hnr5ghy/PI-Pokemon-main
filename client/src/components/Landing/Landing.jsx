import "./Landing.css";
import {Link} from "react-router-dom";

const Landing = () => {
    return(
        <>
            <h1>Landing</h1>
            <button><Link to={'/pokemons'}>Enter</Link></button>
        </>
    );
};

export default Landing;
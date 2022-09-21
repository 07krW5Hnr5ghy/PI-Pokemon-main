//import "./Landing.module.css";
import {Link} from "react-router-dom";

const Landing = () => {
    return(
        <>
            <div id="Landing_container">
                <button id="Landing_button"><Link to={'/pokemons'}>Enter</Link></button>
            </div>
        </>
    );
};

export default Landing;
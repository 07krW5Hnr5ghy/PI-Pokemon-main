//import "./Landing.module.css";
import {Link} from "react-router-dom";

const Landing = () => {
    return(
        <>
            <div id="Landing_container">
                <Link to={'/pokemons'}><button id="Landing_button">Enter</button></Link>
            </div>
        </>
    );
};

export default Landing;
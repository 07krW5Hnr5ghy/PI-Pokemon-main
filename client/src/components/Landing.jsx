//import "./Landing.module.css";
import {Link} from "react-router-dom";

const Landing = () => {
    return(
        <>
            <div id="Landing_container">
                <Link to={'/pokemons'} id="Landing_button">
                    <button value="Enter">
                        Enter
                        </button> 
                </Link>
            </div>
        </>
    );
};

export default Landing;
//import "./Landing.module.css";
import {Link} from "react-router-dom";

const Landing = () => {
    return(
        <>
            <div className="Landing_container">
                <button className="Landing_button"><Link to={'/pokemons'}>Enter</Link></button>
            </div>
        </>
    );
};

export default Landing;
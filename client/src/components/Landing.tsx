import {Link} from "react-router-dom";
import { PlayArrow } from "@mui/icons-material";

const Landing = () => {
    return(
        <div id="landing-container">
            <div id="landing-call">
                <h3>Come and join the fun at our Pokemon cards website!</h3>
            </div>
            <div id="landing-button">
                <div id="landing-pokeball">
                    <div id="pokeball-upper"></div>
                    <div id="pokeball-center">
                        <div id="pokeball-button">
                            <div id="pokeball-innerbutton">
                                <Link to={'/pokemons'} id="pokeball-link">
                                    <PlayArrow fontSize="large"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div id="pokeball-lower"></div>
                </div>
            </div> 
        </div>
    );
};

export default Landing;
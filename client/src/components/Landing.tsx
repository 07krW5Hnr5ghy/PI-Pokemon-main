import {Link} from "react-router-dom";
import { PlayArrow } from "@mui/icons-material";

const Landing = () => {
    return(
        <div id="Landing_container">
            <div id="Landing_Call">
                <h3>Come and join the fun at our Pokemon cards website!</h3>
            </div>
            <div id="Landing_Button">
                <div id="Landing_Pokeball">
                    <div id="Pokeball_Upper"></div>
                    <div id="Pokeball_Center">
                        <div id="Pokeball_Button">
                            <div id="Pokeball_InnerButton">
                                <Link to={'/pokemons'} id="Pokeball_Link">
                                    <PlayArrow fontSize="large"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div id="Pokeball_Lower"></div>
                </div>
            </div> 
        </div>
    );
};

export default Landing;
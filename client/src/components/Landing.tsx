import {Link} from "react-router-dom";
import { PlayArrow } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAPIData,getDBPokemons,getTypes } from "../redux/pokemonActions";
import { RootState } from "../redux/store";


const Landing = () => {

    const dispatch = useDispatch();
    /* selector of pokemon,types,filters and status data in redux state */
    const {data,types} = useSelector((state:RootState) => state.pokemons);

    /* request to load remote api data */
    useEffect(() => {
        dispatch(getAPIData);

        if(!data.records.length){
            dispatch(getDBPokemons());
        }

        if(!types.length){
            dispatch(getTypes());
        }
    },[dispatch,data.records.length,types.length]);
    
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
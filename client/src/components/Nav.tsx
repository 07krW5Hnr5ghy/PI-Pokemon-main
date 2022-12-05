import {Link} from "react-router-dom";
import Search from "./Search";
import logo from "../styles/img/pokemon.svg";

const Nav = () => {
    return(
        <nav id="Nav_navbar">
            <img src={logo} alt="Pokemon logo"/>
            <ul>
                <li><Link to={'/pokemons'}>Home</Link></li>
                <li><Link to={'/create'}>New/Update</Link></li>
            </ul>
            <Search/>
        </nav>
    );
}

export default Nav;
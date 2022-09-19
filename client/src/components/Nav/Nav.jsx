import {Link} from "react-router-dom";
import Search from "../Search/Search";

const Nav = () => {
    return(
        <nav>
            <ul>
                <li><Link to={'/pokemons'}>Home</Link></li>
                <li><Link to={'/create'}>New</Link></li>
            </ul>
            <Search/>
        </nav>
    );
}

export default Nav;
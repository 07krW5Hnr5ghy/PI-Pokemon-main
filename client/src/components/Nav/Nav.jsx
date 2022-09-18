import {Link} from "react-router-dom";

const Nav = () => {
    return(
        <nav>
            <ul>
                <li><Link to={'/pokemons'}>Home</Link></li>
                <li><Link to={'/create'}>New</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;
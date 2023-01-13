import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";
import logo from "../styles/img/pokemon.svg";

const Nav = () => {
    return(
    <nav>
      <div className="navbar">
        <div className="container nav-container">
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo">
                <h1>Navbar</h1>
            </div>
            <div className="menu-items">
                <li>
                  <SearchBar/>
                </li>
                <li>
                  <Link to={"/pokemons"}>Home</Link>
                </li>
                <li>
                  <Link to={"/new"}>New</Link>
                </li>
            </div>
        </div>
      </div>
    </nav>
    );
}

export default Nav;
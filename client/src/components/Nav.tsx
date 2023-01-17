import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";
import { Home, AddCircle } from "@mui/icons-material"; 

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
                <h1>Pokeindex</h1>
            </div>
            <div className="menu-items">
                <li>
                  <SearchBar/>
                </li>
                <li className="nav-link">
                  <Link className="redirect" to={"/pokemons"}>
                    <span className="link-span">
                      <Home fontSize="medium" className="link-icon"/> 
                      <span className="link-text"> Home</span>
                    </span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link className="redirect" to={"/new"}>
                    <span className="link-span">
                      <AddCircle fontSize="medium" className="link-icon"/> 
                      <span className="link-text"> New</span>
                    </span>
                  </Link>
                </li>
            </div>
        </div>
      </div>
    </nav>
    );
}

export default Nav;
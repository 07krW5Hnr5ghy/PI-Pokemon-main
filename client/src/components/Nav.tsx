import {Link} from "react-router-dom";
import { Search } from "@mui/icons-material";
import { Home, AddCircle } from "@mui/icons-material"; 
import { useDispatch } from "react-redux";
import { updateSearch } from "../redux/pokemonActions";

const Nav = () => {
  const dispatch = useDispatch();
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearch(e.target.value));
  }
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
                <li className="nav-link">
                  <div className="search-container">
                    <button className="search-button">
                      <Search fontSize="medium"/>
                    </button>
                    <input 
                    type="text" 
                    placeholder="name" 
                    className="search-input"
                    onChange={handleSearch} />
                  </div>
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
import "./Search.css";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions/index";

const Search = () => {
    const [name,setName] = useState("");
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        setName(event.target.value);
    }

    const submitSearch = (event) => {
        dispatch(getPokemons(name));
        setName("");
    }

    return(
        <div>
            <input type="text" placeholder="name of pokemon" value={name} onChange={handleSearch}/>
            <button onClick={submitSearch}>Search</button>
        </div>
    );
};

export default Search;


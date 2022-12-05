import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../redux/actions/index";

const Search = () => {
    const [name,setName] = useState("");
    const dispatch = useDispatch();

    const handleSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const submitSearch = (event : React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        dispatch(getPokemons(name));
        setName("");
    }

    return(
        <div id="Search_container">
            <input type="text" placeholder="name of pokemon" value={name} onChange={(e) => handleSearch}/>
            <button onClick={(e) => submitSearch}>Search</button>
        </div>
    );
};

export default Search;


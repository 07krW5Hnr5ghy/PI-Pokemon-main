// import React, {useState} from "react";
// import { useDispatch } from "react-redux";
// import { getPokemons } from "../redux/pokemonActions";
// import { Search } from "@mui/icons-material";

// const SearchBar = () => {
//     const [name,setName] = useState("");
//     const dispatch = useDispatch();

//     const handleSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
//         setName(event.target.value);
//     }

//     const submitSearch = (event : React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
//         dispatch(getPokemons(name));
//         setName("");
//     }

//     return(
//         <div id="container">
//             <button onClick={(e) => submitSearch} className="search-button">
//                 <Search fontSize="medium"/>
//             </button>
//             <input 
//             type="text" 
//             placeholder="name" 
//             className="search-input" 
//             onChange={(e) => handleSearch}
//             />
//         </div>
//     );
// };
const SearchBar = () => {}

export default SearchBar;


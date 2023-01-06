import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useAppDispatch,useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { getPokemons,getTypes } from "../redux/pokemonActions";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import Loading from "./Loading";
import Nav from "./Nav";

const Home = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    // selectors 
    const {data,types} = useSelector((state:RootState) => state.pokemons);

    useEffect(() => {
        console.count("mount");
        if(name){
            dispatch(getPokemons(name));
        }

        if(!data.length){
            dispatch(getPokemons(""));
        }

        if(!types.length){
            dispatch(getTypes());
        }
    },[
        dispatch,
        name,
        data.length,
        types.length
    ]);

    return(
        <div id="Home_container">
            <Nav/>
            <div className="Info_container">
                <div className="Filter_container">
                    <div className="Filter">
                        <span className="Filter_title">Filters</span>
                        <select className="Filter_select" name="type" id="">
                            <option value="type" selected disabled>type</option>
                            <option value="normal">normal</option>
                            <option value="grass">grass</option>
                            <option value="fire">fire</option>
                            <option value="water">water</option>
                        </select>
                        <select className="Filter_select" name="origin" id="">
                            <option value="origin" selected disabled>origin</option>
                            <option value="api+">api</option>
                            <option value="custom+">custom</option>
                        </select>
                    </div>
                    <div className="Filter">
                        <span className="Filter_title">Sort</span>
                        <select className="Filter_select" name="sort" id="">
                            <option value="sort" selected disabled>Name</option>
                            <option value="asc">Name (Asc)</option>
                            <option value="desc">Name (Desc)</option>
                        </select>
                    </div>
                </div>
                <div className="Card_container">
                    {!data.length ? <Loading/> : 
                    data.map(pokemon => 
                    <Card
                    name={pokemon.name}
                    img={pokemon.img}
                    classes={pokemon.classes}
                    id={pokemon.id}
                    key={pokemon.id}
                    />)}
                </div>
            </div>
        </div>
    );
}

export default Home;

// <h1>Pokemons</h1>
//             {!data.length ? <Loading/> : data.map(pokemon => <Card 
//             name={pokemon.name}
//             img={pokemon.img}
//             classes={pokemon.classes}
//             id={pokemon.id}
//             key={pokemon.id}
//             />)}

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPokemons,getTypes,filterTypes,filterOrigin,orderName,orderAttack } from "../redux/pokemonActions";
// import { useSearchParams } from "react-router-dom";
// import Page from "./Page";
// import Loading from "./Loading";
// import Pokemon from "./Pokemon";
// import Nav from "./Nav";
// /* pokemons per page */
// let PageSize = 12;

// const Pokemons = () => {
//     const [searchParams] = useSearchParams();
//     const dispatch = useDispatch();
//     /* select pokemons getted from db */
//     let pokemons =  useSelector(state => state.reducerPokemon.pokemons);
//     /* state tracking number of page */
//     const [currentPage,setCurrentPage] = useState(1);
//     /* state checking filters */
//     const [options,setOptions] = useState({
//         filter:"all",
//         order:"name",
//         mode:"asc",
//     });
    
//     /* request pokemons from db */
//     const name = searchParams.get('name');
//     /* fetch pokemons from backend */
//     useEffect(() => {
//         if(name){
//             dispatch(getPokemons(name));
//         }
        
//         if(!pokemons.length){
//             dispatch(getPokemons());
//         }
//         dispatch(getTypes());
//     },[dispatch,name]);

//     let types = useSelector(state => state.reducerPokemon.types);
    
    
//     /* set first and last page index in the array
//     of pokemons displayed in current page
//      */
//     const firstPageIndex = (currentPage - 1) * PageSize;
//     const lastPageIndex = firstPageIndex + PageSize;
//     /* extract pokemons that should be in the current page */
//     let pageData = pokemons.slice(firstPageIndex,lastPageIndex);

//     /* execute the filters and order options */
//     const handleOptions = (event : React.MouseEvent<HTMLOptionElement,MouseEvent>,option : string) => {
//         setOptions({
//             ...options,
//             [option]:(event.target as HTMLOptionElement).value,
//         });
//     }

//     const applyFilter = () => {
//         if(types.find((type : {name:string;}) => type.name === options.filter)){
//             console.log("types");
//             dispatch(filterTypes(options.filter));
//         }

//         if(options.filter === "api+" || options.filter === "custom+"){
//             console.log("origin");
//             dispatch(filterOrigin(options.filter));
//         }

//         if(options.filter === "all"){
//             dispatch(getPokemons());
//         }
//     }

//     const order = () => {
//         if(options.order === "name")dispatch(orderName(options.mode))
//         if(options.order === "attack")dispatch(orderAttack(options.mode))
//     };

//     // render pokemons
//     return(
//         <>
//             <Nav/>
//             <div id="Pokemons_container">  
//                 {<div id="Pokemons_header">
//                     <div className="Pokemons_options">
//                         <button onClick={applyFilter} className={"Pokemons_buttons"}>filter</button>
//                         <select defaultValue={'DEFAULT'}>
//                             <option value="DEFAULT" disabled>select type</option>
//                             <option value="all" onClick={event => handleOptions(event,"filter")}>all</option>
//                             {types && Array.isArray(types) ? 
//                             types.map(type => <option key={type.id} value={type.name}
//                             onClick={event => handleOptions(event,"filter")}>{type.name}</option>):[]}
//                         </select>
//                         <select defaultValue={'DEFAULT'}>
//                             <option value="DEFAULT" disabled>select origin</option>
//                             <option value="all" onClick={event => handleOptions(event,"filter")}>all</option>
//                             <option value="api+" onClick={event => handleOptions(event,"filter")} >api</option>
//                             <option value="custom+" onClick={event => handleOptions(event,"filter")} >custom</option>
//                         </select>
//                     </div>
//                     <div className="Pokemons_options">
//                         <button onClick={order} >order</button>
//                         <select defaultValue={'DEFAULT'}>
//                             <option value="DEFAULT" disabled>select order</option>
//                             <option value="name" onClick={event => handleOptions(event,"order")}>name</option>
//                             <option value="attack" onClick={event => handleOptions(event,"order")}>attack</option>
//                         </select>
//                         <select defaultValue={'DEFAULT'}>
//                             <option value="DEFAULT" disabled>select mode</option>
//                             <option value="asc" onClick={event => handleOptions(event,"mode")}>asc</option>
//                             <option value="desc" onClick={event => handleOptions(event,"mode")}>desc</option>
//                         </select>
//                     </div>
//                 </div>}
//             {pokemons.length && Array.isArray(pokemons)?
//                 <div id="Pokemons_body">
//                     <div id="Pokemons_cards">
//                         {/* if not receive pokemons render pokemon not found message */}
//                         {pageData && Array.isArray(pageData) ? pageData.map(item => <Pokemon 
//                         name={item.name}
//                         img={item.img}
//                         classes={item.classes}
//                         id={item.id}
//                         key={item.id}
//                         />):<p id="Pokemons_NoFound">{pokemons}</p>}
//                     </div>
//                     {/* pagination component */}
//                     {!name ? <Page 
//                     currentPage={currentPage}
//                     totalCount={pokemons.length}
//                     onPageChange={(page:number) => setCurrentPage(page)}
//                     pageSize={PageSize}
//                     /> : <h3>footer</h3>}
//                 </div>: pokemons.length && typeof pokemons === "string" ? <p id="Pokemons_NoFound">{pokemons}</p> : <Loading/>
//             }   
//             </div>
//         </>
//     );
// };

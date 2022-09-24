import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons,getTypes,filterTypes,filterCustom,orderName,orderAttack } from "../redux/actions";
import { useSearchParams } from "react-router-dom";
import Page from "./Page";
import Loading from "./Loading";
import Pokemon from "./Pokemon";
import Nav from "./Nav";
/* pokemons per page */
let PageSize = 12;

const Pokemons = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    /* select pokemons getted from db */
    let pokemons =  useSelector(state => state.reducerPokemon.pokemons);
    /* state tracking number of page */
    const [currentPage,setCurrentPage] = useState(1);
    /* state checking filters */
    const [options,setOptions] = useState({
        filter:"all",
        order:"name",
        mode:"asc",
    });
    
    /* request pokemons from db */
    const name = searchParams.get('name');
    
    useEffect(() => {
        if(name){
            dispatch(getPokemons(name));
        }else{
            dispatch(getPokemons());
        }
        dispatch(getTypes());
    },[dispatch,name]);

    
    let types = useSelector(state => state.reducerPokemon.types);
    
    
    /* set first and last page index
    divide the number of pokemons per page
     */
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let pageData = pokemons.slice(firstPageIndex,lastPageIndex);

    const handleOptions = (event,option) => {
        setOptions({
            ...options,
            [option]:event.target.value,
        });
    }

    //console.log(filters);

    const applyFilter = () => {
        if(types.find(type => type.name === options.filter)){
            console.log("types");
            dispatch(filterTypes(options.filter));
        }

        if(options.filter === "api+" || options.filter === "custom+"){
            console.log("origin");
            dispatch(filterCustom(options.filter));
        }

        if(options.filter === "all"){
            dispatch(getPokemons());
        }
    }

    const order = () => {
        if(options.order === "name")dispatch(orderName(options.mode))
        if(options.order === "attack")dispatch(orderAttack(options.mode))
    };
    //console.log(pokemons);
    console.log(options);
    // render pokemons
    return(
        <>
            <Nav/>
            <div id="Pokemons_container">  
                {pokemons.length && Array.isArray(pokemons) ? <div id="Pokemons_header">
                    <div className="Pokemons_options">
                        <button onClick={applyFilter} className={"Pokemons_buttons"}>filter</button>
                        <select defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>select type</option>
                            <option value="all" onClick={event => handleOptions(event,"filter")}>all</option>
                            {types && Array.isArray(types) ? 
                            types.map(type => <option key={type.id} value={type.name}
                            onClick={event => handleOptions(event,"filter")}>{type.name}</option>):[]}
                        </select>
                        <select defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>select origin</option>
                            <option value="all" onClick={event => handleOptions(event,"filter")}>all</option>
                            <option value="api+" onClick={event => handleOptions(event,"filter")}>api</option>
                            <option value="custom+" onClick={event => handleOptions(event,"filter")}>custom</option>
                        </select>
                    </div>
                    <div className="Pokemons_options">
                        <button onClick={order}>order</button>
                        <select defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>select order</option>
                            <option value="name" onClick={event => handleOptions(event,"order")}>name</option>
                            <option value="attack" onClick={event => handleOptions(event,"order")}>attack</option>
                        </select>
                        <select defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>select mode</option>
                            <option value="asc" onClick={event => handleOptions(event,"mode")}>asc</option>
                            <option value="desc" onClick={event => handleOptions(event,"mode")}>desc</option>
                        </select>
                    </div>
                </div> : []}
            {pokemons.length && Array.isArray(pokemons)?
                <div id="Pokemons_body">
                    <div id="Pokemons_cards">
                        {/* if not receive pokemons render pokemon not found message */}
                        {pageData && Array.isArray(pageData) ? pageData.map(item => <Pokemon 
                        name={item.name}
                        img={item.img}
                        classes={item.classes}
                        id={item.id}
                        key={item.id}
                        />):<h2>{pokemons}</h2>}
                    </div>
                    {/* pagination component */}
                    {!name ? <Page 
                    currentPage={currentPage}
                    totalCount={pokemons.length}
                    onPageChange={page => setCurrentPage(page)}
                    pageSize={PageSize}
                    /> : <h3>footer</h3>}
                </div>: pokemons.length && typeof pokemons === "string" ? pokemons : <Loading/>
            }   
            </div>
        </>
    );
};

export default Pokemons;
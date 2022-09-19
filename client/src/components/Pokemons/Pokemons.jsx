import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons,getTypes,filterTypes,filterCustom,orderName,orderAttack } from "../../redux/actions";
import { useSearchParams } from "react-router-dom";
import Page from "../Page/Page";
import Loading from "../Loading/Loading";
import Pokemon from "../Pokemon/Pokemon";
import Nav from "../Nav/Nav";
import Search from "../Search/Search";
import "./Pokemons.css";
import { useLocation, useParams } from "react-router-dom";
/* pokemons per page */
let PageSize = 5;

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
    //console.log(name);
    
    useEffect(() => {
        if(name){
            dispatch(getPokemons(name));
        }else{
            dispatch(getPokemons());
        }
        dispatch(getTypes());
    },[dispatch]);

    
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
        if(types.find(type => type === options.filter)){
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
            <h1>Pokemons</h1>
            <div>
                <button onClick={applyFilter}>filter</button>
                <label>Please select a type --</label>
                <select>
                    <option key="all" value="all">all</option>
                    {types && Array.isArray(types) ? 
                    types.map(type => <option key={type.id} value={type.name}
                    onClick={event => handleOptions(event,"filter")}>{type.name}</option>):[]}
                </select>
                <label>Select to filter between filter and custom pokemons</label>
                <select>
                    <option value="all" onClick={event => handleOptions(event,"filter")}>all</option>
                    <option value="api+" onClick={event => handleOptions(event,"filter")}>api</option>
                    <option value="custom+" onClick={event => handleOptions(event,"filter")}>custom</option>
                </select>
            </div>
            <div>
                <button onClick={order}>order</button>
                <label>Select item</label>
                <select>
                    <option value="name" onClick={event => handleOptions(event,"order")}>name</option>
                    <option value="attack" onClick={event => handleOptions(event,"order")}>attack</option>
                </select>
                <label>Select mode</label>
                <select>
                    <option value="asc" onClick={event => handleOptions(event,"mode")}>asc</option>
                    <option value="desc" onClick={event => handleOptions(event,"mode")}>desc</option>
                </select>
            </div>
           {pokemons.length && Array.isArray(pokemons)?
            <>
            <div>
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
            className="page-bar" 
            currentPage={currentPage}
            totalCount={pokemons.length}
            onPageChange={page => setCurrentPage(page)}
            pageSize={PageSize}
            /> : <h3>footer</h3>}
            </>: pokemons.length && typeof pokemons === "string" ? pokemons : <Loading/>
           }   
        </>
    );
};

export default Pokemons;
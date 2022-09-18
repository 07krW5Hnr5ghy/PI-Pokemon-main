import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons,getTypes,filterType } from "../../redux/actions";
import { useSearchParams } from "react-router-dom";
import Page from "../Page/Page";
import Loading from "../Loading/Loading";
import Pokemon from "../Pokemon/Pokemon";
import Nav from "../Nav/Nav";
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
    const [filters,setFilters] = useState({
        filter:"",
        order:"",
        list:[],
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

    const handleFilters = (event) => {
        setFilters({
            ...filters,
            filter:event.target.value,
        });
    }

    //console.log(filters);

    const applyFilter = () => {
        dispatch(filterType(filters.filter));
    }
    //console.log(pokemons);

    // render pokemons
    return(
        <>  
           {pokemons.length && Array.isArray(pokemons)?
            <>
             <Nav/>
            <h1>Pokemons</h1>
            <div>
                <button onClick={applyFilter}>filter by type</button>
                <label>Please select a type --</label>
                <select>
                    {types && Array.isArray(types) ? 
                    types.map(type => <option key={type.id} value={type.name}
                    onClick={handleFilters}>{type.name}</option>):[]}
                </select>
                <label>Select to filter between filter and custom pokemons</label>
                <select>
                    <option value="false" onClick={handleFilters}>api</option>
                    <option value="true" onClick={handleFilters}>custom</option>
                </select>
            </div>
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
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import { useSearchParams } from "react-router-dom";
import Page from "../Page/Page";
import Loading from "../Loading/Loading";
import Pokemon from "../Pokemon/Pokemon";
import "./Pokemons.css";
import { useLocation, useParams } from "react-router-dom";
/* pokemons per page */
let PageSize = 2;

const Pokemons = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    /* state tracking number of page */
    const [currentPage,setCurrentPage] = useState(1);
    
    /* request pokemons from db */
    const name = searchParams.get('name');
    //console.log(name);
    
    useEffect(() => {
        if(name){
            dispatch(getPokemons(name));
        }else{
            dispatch(getPokemons());
        }
    },[dispatch]);

    /* select pokemons getted from db */
    let pokemons =  useSelector(state => state.reducerPokemon.pokemons);

    /* set first and last page index
    divide the number of pokemons per page
     */
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let pokeData = pokemons.slice(firstPageIndex,lastPageIndex);

    // render pokemons
    return(
        <>
            <h1>Pokemons</h1>
            <div>
                {/* if not receive pokemons render pokemon not found message */}
                {!pokemons.length && Array.isArray(pokemons) ? 
                <Loading/> : pokeData && Array.isArray(pokeData) ? pokeData.map(item => <Pokemon 
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
            
        </>
    );
};

export default Pokemons;
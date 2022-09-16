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
    console.log(name);
    
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

    console.log(pokemons);
    console.log(pokeData);

    // pages
    return(
        <>
            <h1>Pokemons</h1>
            <div>
                {pokemons.length ? pokeData.map(item => <Pokemon 
                name={item.name}
                img={item.img}
                classes={item.classes}
                id={item.id}
                key={item.id}
                />):<Loading/>}
            </div>
            {/* pagination component */}
            <Page 
            className="page-bar" 
            currentPage={currentPage}
            totalCount={pokemons.length}
            onPageChange={page => setCurrentPage(page)}
            pageSize={PageSize}
            />
        </>
    );
};

export default Pokemons;
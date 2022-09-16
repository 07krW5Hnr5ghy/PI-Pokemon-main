import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions"; 
import Page from "../Page/Page";
import Loading from "../Loading/Loading";
import "./Pokemons.css";
/* pokemons per page */
let PageSize = 2;

const Pokemons = () => {
    const dispatch = useDispatch();
    /* state tracking number of page */
    const [currentPage,setCurrentPage] = useState(1);
    /* select pokemons getted from db */
    let pokemons =  useSelector(state => state.reducerPokemon.pokemons);
    /* request pokemons from db */
    useEffect(() => {
        dispatch(getPokemons()).then();
    },[dispatch]);

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
                {pokemons.length ? pokeData.map(item => {
                    return(
                        <div>
                            <p>{item.id}</p>
                            <p>{item.name}</p>
                            <p>{item.classes}</p>
                        </div>
                    );
                }):<Loading/>}
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
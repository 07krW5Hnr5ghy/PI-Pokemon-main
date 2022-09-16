import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions"; 
import Page from "../Page/Page";
import "./Pokemons.css";

let PageSize = 2;

const Pokemons = () => {
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] = useState(1);

    let pokemons =  useSelector(state => state.reducerPokemon.pokemons);

    useEffect(() => {
        dispatch(getPokemons());
    },[dispatch]);

    const pokeData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return pokemons.slice(firstPageIndex,lastPageIndex);
    },[currentPage]);

    console.log(pokemons);

    // pages
    return(
        <>
            <h1>Pokemons</h1>
            <div>
                {pokeData.map(item => {
                    return(
                        <div>
                            <p>{item.id}</p>
                            <p>{item.name}</p>
                            <p>{item.classes}</p>
                        </div>
                    );
                })}
            </div>
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
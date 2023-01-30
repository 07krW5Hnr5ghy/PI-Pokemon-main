import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filters } from "../interfaces";
import { RootState } from "../redux/store";
import { getDBPokemons,getTypes,updateFilter } from "../redux/pokemonActions";
import { useSearchParams } from "react-router-dom";
import { ArrowForwardIos,ArrowBackIos } from "@mui/icons-material";
import Card from "./Card";
import Loading from "./Loading";
import Nav from "./Nav";

const Home = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    // selectors 
    const {data,types,filters} = useSelector((state:RootState) => state.pokemons);
    const [options,setoptions] = useState<Filters>(filters);
    const [begin,setBegin] = useState<number>(0);
    const [end,setEnd] = useState<number>(9);

    useEffect(() => {
        console.count("mount");

        if(!data.records.length){
            dispatch(getDBPokemons());
        }

        if(!types.length){
            dispatch(getTypes());
        }

    },[
        dispatch,
        name,
        data.records.length,
        types.length,
    ]);

    useEffect(()=>{
        if(
            filters.type ||
            filters.origin ||
            filters.sort ||
            filters.column ||
            data.currentPage
        ){
            dispatch(updateFilter(options));
            dispatch(getDBPokemons(
                filters.page,
                '',
                filters.type,
                filters.sort,
                filters.column,
                filters.origin
            ));
        }
    },[
        dispatch,
        options,
        filters.type,
        filters.origin,
        filters.sort,
        filters.column,
        filters.page,
        data.currentPage
    ]);

    const handleOptions = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setoptions({
            ...options,
            [e.target.name]: value,
        });
    }

    const handlePages = (e:React.MouseEvent<HTMLButtonElement>,page:number) => {
        setoptions({
            ...options,
            page,
        })
        if(page > data.currentPage){
            setBegin(begin + Math.abs(data.currentPage-page));
            setEnd(end + Math.abs(data.currentPage-page));
        }
        if(page >= (data.last_page-9)){
            setBegin(data.last_page-9);
            setEnd(data.last_page);
        }
    }

    const forwardPage = (e:React.MouseEvent<HTMLButtonElement>) => {
        setoptions({
            ...options,
            page:options.page+1,
        })
        setBegin(begin + 1);
        setEnd(end + 1);
        if(data.currentPage >= (data.last_page-9)){
            setBegin(data.last_page-9);
            setEnd(data.last_page);
        }
    }

    const backwardPage = (e:React.MouseEvent<HTMLButtonElement>) => {
        setoptions({
            ...options,
            page:options.page-1,
        })
        setBegin(begin - 1);
        setEnd(end - 1);
        if(data.currentPage >= (data.last_page-9)){
            setBegin(data.last_page-9);
            setEnd(data.last_page);
        }
    }

    const pages = [];

    for(let i = 1; i <= data.last_page; i++){
        pages.push(i);
    }

    console.log("options",options);

    return(
        <div id="home-container">
            <Nav/>
            <div className="info-container">
                <div className="filter-container">
                    <div className="filter">
                        <span className="filter-title">options</span>
                        <select className="filter-select" name="type" onChange={handleOptions}>
                            <option value="type" selected disabled>type</option>
                            {!types.length ? 
                            null :
                            types.map(item => <option value={item.type} key={item.id}>{item.type}</option>)
                            }
                        </select>
                        <select className="filter-select" name="origin" onChange={handleOptions}>
                            <option value="origin" selected disabled>origin</option>
                            <option value="api">api</option>
                            <option value="custom">custom</option>
                        </select>
                    </div>
                    <div className="filter">
                        <span className="filter-title">Sort</span>
                        <select className="filter-select" name="sort" onChange={handleOptions}>
                            <option value="sort" selected disabled>mode</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                        <select className="filter-select" name="column" onChange={handleOptions}>
                            <option value="column" selected disabled>sort by</option>
                            <option value="name">name</option>
                            <option value="attack">attack</option>
                            <option value="defense">defense</option>
                            <option value="specialAttack">special attack</option>
                            <option value="specialDefense">special defense</option>
                            <option value="health">health</option>
                            <option value="speed">speed</option>
                        </select>
                    </div>
                </div>
                <div className="card-container">
                    {!data.records.length ? <Loading/> : 
                    data.records.map(pokemon => 
                    <Card
                    name={pokemon.name}
                    img={pokemon.picture}
                    classes={pokemon.classes}
                    id={pokemon.id}
                    key={pokemon.id}
                    />)}
                </div>
                <div className="pagination-container">
                    {data.currentPage === 1 ? null : <button type="button" onClick={backwardPage}><ArrowBackIos/></button>}
                    {pages.slice(begin,end).map(item => <button type="button" className="page" onClick={(e) => handlePages(e,item)}>{item}</button>)}
                    {data.currentPage !== data.last_page ? <button type="button" onClick={forwardPage}><ArrowForwardIos/></button> : null }
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
//     /* state checking options */
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

//     /* execute the options and order options */
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

/* libraries */
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft,KeyboardDoubleArrowRight } from "@mui/icons-material";
/* functions and defintions */
import { Filters } from "../tools/interfaces";
import { RootState } from "../redux/store";
import { getDBPokemons,getTypes,updateFilter,resetDetail} from "../redux/pokemonActions";
/* components */
import Card from "./Card";
import Loading from "./Loading";
import Nav from "./Nav";

const Home = () => {

    const dispatch = useDispatch(); 
    /* selector of pokemon,types,filters and status data in redux state */
    const {data,types,filters,status} = useSelector((state:RootState) => state.pokemons);
    /* filters, sorting and pagination local state */
    const [options,setOptions] = useState<Filters>(filters);

    /* request pokemon and types data for redux state */
    useEffect(() => {

        dispatch(resetDetail());

        if(!data.records){
            dispatch(getDBPokemons());
        }

        if(!types.length){
            dispatch(getTypes());
        }

    },[
        dispatch,
        data.records,
        types.length,
    ]);

    useEffect(()=>{
        /* update filter,sorting and pagination parameters to
        request backend data for redux state with local state
        data */
        if(
            filters.type ||
            filters.origin ||
            filters.sort ||
            filters.column ||
            data.currentPage
        ){
            dispatch(updateFilter({
                type:options.type,
                origin:options.origin,
                sort:options.sort,
                column:options.column,
                page:options.page,
                paginationStart:options.paginationStart,
                paginationEnd:options.paginationEnd,
            }));
            dispatch(getDBPokemons(
                filters.page,
                filters.search,
                filters.type,
                filters.sort,
                filters.column,
                filters.origin
            ));
        }

        /* manage pagination index in
        redux state when exist less than
        9 pages */
        if(data.last_page < 9){
            dispatch(updateFilter({
                paginationStart:0,
                paginationEnd:data.last_page,
            }))
        }

    },[
        dispatch,
        options,
        filters.search,
        filters.type,
        filters.origin,
        filters.sort,
        filters.column,
        filters.page,
        data.currentPage,
        data.last_page,
        data.total
    ]);

    /* update filter,sorting and pagination state in local state */
    const handleOptions = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if(pages.length < 9){
             setOptions({
                ...options,
                [e.target.name]: value,
                page:1,
                pageIndex:0,
                paginationEnd:pages.length,
             })
        }else{
             setOptions({
                ...options,
                [e.target.name]:value,
                page:1,
                pageIndex:0,
                paginationEnd:9,
             })
        }
    }

    /* update redux state when using the pages buttons of pagination
    bar */
    const handlePages = (e:React.MouseEvent<HTMLButtonElement>,page:number) => {
        if(options.pageIndex < (pages.length-9)){
            setOptions({
                ...options,
                page,
                pageIndex:page-1,
                paginationStart:page-1,
                paginationEnd:page+8,
            })
        }
        
        if(page >= (pages.length-9)){
            setOptions({
                ...options,
                page,
                pageIndex:page-1,
                paginationStart:pages.length-9,
                paginationEnd:pages.length,
            })
        }

        if(pages.length < 9){
            setOptions({
                ...options,
                page,
                pageIndex:page-1,
                paginationStart:0,
                paginationEnd:pages.length,
            })
        }
    }

    /* update redux state to switch the next page */
    const forwardPage = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(options.pageIndex < (pages.length-9)){
            setOptions({
                ...options,
                page:options.page+1,
                pageIndex:options.pageIndex+1,
                paginationStart:options.pageIndex+1,
                paginationEnd:options.pageIndex+10,
            })
        }else{
            setOptions({
                ...options,
                page:options.page+1,
                pageIndex:options.pageIndex+1,
                paginationStart:pages.length-9,
                paginationEnd:pages.length,
            })
        }
    }

    /* update redux state to swicth the previous page */
    const backwardPage = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(options.pageIndex <= (pages.length-9)){
            setOptions({
                ...options,
                page:options.page-1,
                pageIndex:options.pageIndex-1,
                paginationStart:options.pageIndex-1,
                paginationEnd:options.paginationEnd-1,
            })
        }else{
            setOptions({
                ...options,
                page:options.page-1,
                pageIndex:options.pageIndex-1,
                paginationStart:pages.length-9,
                paginationEnd:pages.length,
            })
        }
    }

    /* update redux state to skip to last page */
    const forwardSkip = (e:React.MouseEvent<HTMLButtonElement>) => {
        setOptions({
            ...options,
            page:data.last_page,
            pageIndex:pages.length,
            paginationStart:pages.length-9,
            paginationEnd:pages.length,
        })
    }

    /* update redux state to skip to first page */
    const backwardSkip = (e:React.MouseEvent<HTMLButtonElement>) => {
        setOptions({
            ...options,
            page:1,
            pageIndex:0,
            paginationStart:0,
            paginationEnd:9,
        })
    }

    /* store the page numbers of pagination bar */
    const pages = [];

    /* fill the page numbers for pagination bar */
    for(let i = 1; i <= data.last_page; i++){
        pages.push(i);
    }

    return(
        <div id="home-container">
            <Nav/>
            <div className="info-container">
                <div className="filter-container">
                    <div className="filter">
                        <span className="filter-title">Filters</span>
                        <select className="filter-select" name="type" onChange={handleOptions}>
                            <option value="type" selected disabled>type</option>
                            <option value="">all</option>
                            {!types.length ? 
                            null :
                            types.map(item => <option value={item.type} key={item.id}>{item.type}</option>)
                            }
                        </select>
                        <select className="filter-select" name="origin" onChange={handleOptions}>
                            <option value="origin" selected disabled>origin</option>
                            <option value="">all</option>
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
                            <option value="">unsort</option>
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
                    {/* check if exist records to be displayed in home page */}
                    {status === "failed" ? <h2 className="home-not-found">Pokemons were not found with this filters</h2> 
                    : !data.records ? <Loading/> : 
                    data.records.map(pokemon => 
                    <Card
                    name={pokemon.name}
                    img={pokemon.picture}
                    classes={pokemon.classes}
                    id={pokemon.id}
                    key={pokemon.id}
                    />)}
                </div>
                {/* pagination bar */}
                <div className="pagination-container">
                    {data.currentPage === 1 
                    ? null 
                    : <button 
                    type="button" 
                    onClick={backwardSkip} 
                    className="left-arrow double-left">
                        <KeyboardDoubleArrowLeft fontSize="large"/>
                    </button>}
                    {data.currentPage === 1 
                    ? null 
                    : <button 
                    type="button" 
                    onClick={backwardPage} 
                    className="left-arrow">
                        <KeyboardArrowLeft fontSize="large"/>
                    </button>}
                    {(pages.slice(filters.paginationStart,filters.paginationEnd)).map(item => 
                        <button 
                        type="button" 
                        className={item !== data.currentPage ? "page" : "page selected"} 
                        onClick={(e) => handlePages(e,item)}>
                            {item}
                        </button>)}
                    {data.currentPage !== data.last_page 
                    ? <button 
                    type="button" 
                    onClick={forwardPage} 
                    className="right-arrow">
                        <KeyboardArrowRight fontSize="large"/>
                    </button> 
                    : null }
                    {data.currentPage !== data.last_page 
                    ? <button 
                    type="button" 
                    onClick={forwardSkip} 
                    className="right-arrow double-right">
                        <KeyboardDoubleArrowRight fontSize="large"/>
                    </button> 
                    : null }
                </div>
            </div>
        </div>
    );
}

export default Home;
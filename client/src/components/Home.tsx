import React, { useEffect,useState,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filters } from "../interfaces";
import { RootState } from "../redux/store";
import { getDBPokemons,getTypes,updateFilter} from "../redux/pokemonActions";
import { useSearchParams } from "react-router-dom";
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft,KeyboardDoubleArrowRight } from "@mui/icons-material";
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
            page:1,
            pageIndex:0,
        });
    }

    const handlePages = (e:React.MouseEvent<HTMLButtonElement>,page:number) => {
        if(options.pageIndex < (pages.length-8)){
            setoptions({
                ...options,
                page,
                pageIndex:page-1,
                paginationStart:page-1,
                paginationEnd:page+8,
            })
        }
        
        if(page >= (pages.length-9)){
            setoptions({
                ...options,
                page,
                pageIndex:page-1,
                paginationStart:pages.length-9,
                paginationEnd:pages.length,
            })
        }
    }

    const forwardPage = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(options.pageIndex < (pages.length-8)){
            setoptions({
                ...options,
                page:options.page+1,
                pageIndex:options.pageIndex+1,
                paginationStart:options.paginationStart+1,
                paginationEnd:options.paginationEnd+1,
            })
        }else{
            setoptions({
                ...options,
                page:options.page+1,
                pageIndex:options.pageIndex+1,
                paginationStart:pages.length-9,
                paginationEnd:pages.length,
            })
        }
    }

    const backwardPage = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(options.pageIndex < (pages.length-8)){
            setoptions({
                ...options,
                page:options.page-1,
                pageIndex:options.pageIndex-1,
                paginationStart:options.paginationStart-1,
                paginationEnd:options.paginationEnd-1,
            })
        }else{
            setoptions({
                ...options,
                page:options.page-1,
                pageIndex:options.pageIndex-1,
                paginationStart:pages.length-9,
                paginationEnd:pages.length,
            })
        }
    }

    const forwardSkip = (e:React.MouseEvent<HTMLButtonElement>) => {
        setoptions({
            ...options,
            page:data.last_page,
            pageIndex:pages.length,
            paginationStart:pages.length-9,
            paginationEnd:pages.length,
        })
    }

    const backwardSkip = (e:React.MouseEvent<HTMLButtonElement>) => {
        setoptions({
            ...options,
            page:1,
            pageIndex:0,
            paginationStart:0,
            paginationEnd:9,
        })
    }

    const pages = [];

    for(let i = 1; i <= data.last_page; i++){
        pages.push(i);
    }

    console.log("options",options);
    console.log("pages",pages);

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
                    {(data.last_page <= 9 
                        ? pages.slice(0,pages.length)
                        :pages.slice(filters.paginationStart,filters.paginationEnd)).map(item => 
                        <button 
                        type="button" 
                        className="page" 
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
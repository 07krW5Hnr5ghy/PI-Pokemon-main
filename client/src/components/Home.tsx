import React, { useEffect,useState } from "react";
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
    const {data,types,filters,status} = useSelector((state:RootState) => state.pokemons);
    const [options,setOptions] = useState<Filters>(filters);

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
        data.last_page
    ]);

    const handleOptions = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        // setOptions({
        //     ...options,
        //     [e.target.name]: value,
        //     page:1,
        //     pageIndex:0,
        //     paginationStart:0,
        // });
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

    const forwardSkip = (e:React.MouseEvent<HTMLButtonElement>) => {
        setOptions({
            ...options,
            page:data.last_page,
            pageIndex:pages.length,
            paginationStart:pages.length-9,
            paginationEnd:pages.length,
        })
    }

    const backwardSkip = (e:React.MouseEvent<HTMLButtonElement>) => {
        setOptions({
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

    //onsole.log("options",options);
    //console.log("pages",pages);

    return(
        <div id="home-container">
            <Nav/>
            <div className="info-container">
                <div className="filter-container">
                    <div className="filter">
                        <span className="filter-title">options</span>
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
                    {status === "failed" ? <h1>no</h1> : !data.records.length ? <Loading/> : 
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